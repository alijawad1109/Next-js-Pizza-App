import { authOptions } from "../auth/[...nextauth]/route";
import { MenuItems } from "../../models/MenuItems";
import { Order } from "../../models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const stripe = require("stripe")(process.env.STRIPE_SK);
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { adress, cartItems } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...adress,
    cartItems,
    paid: false,
  });

  const stripeLineItems = [];
  for (const item of cartItems) {
    const productInfo = await MenuItems.findById(item._id);
    let productPrice = productInfo.price;
    if (item.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === item.size._id.toString()
      );
      productPrice = size.price;
    }
    if (item.extras?.length > 0) {
      for (const cartItemExtraThing of item.extras) {
        const extraThingInfo = productInfo.extraIngredientsPrices.find(
          (extra) => extra._id.toString() === cartItemExtraThing._id.toString()
        );
        productPrice += extraThingInfo.price;
      }
    }
    const productName = item.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      "orders/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });
  return Response.json(stripeSession.url);
}
