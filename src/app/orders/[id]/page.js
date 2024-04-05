"use client";
import { CartContext, cartItemPrice } from "@/app/components/AppProvider";
import SectionHeader from "@/app/components/layout/SectionHeader";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import AddressInput from '@/app/components/layout/AddressInput'
import CartProduct from "@/app/components/menu/CartProduct";

const page = () => {
  const { id } = useParams();
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      fetch("/api/orders?_id=" + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
        });
      });
    }
  }, [id]);
  let subtotal =0;
  if(order?.cartItems){
    for (const item of order?.cartItems){
      subtotal += cartItemPrice(item)
    }
  }
  let total = subtotal + 5;
  return (
    <section className="max-w-2xl mx-auto mt-2">
      <SectionHeader mainHeader={"Your Order"} />
      <div className="text-center">
        <p>Thank you for your order</p>
        <p>We will call you when your order is ready.</p>
      </div>
      <div className="mt-4">
      {order && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 lg:gap-12 xl:gap-16 place-items-center">
          <div>
              {order.cartItems.map(item =>(
                <CartProduct item={item} />
                ))}
                <div className="flex justify-end items-center text-right pr-10 py-3">
            <div className="text-gray-500 text-md">
              Subtotal :
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="text-md font-bold">
              ${subtotal}
              <br />
              $5
              <br />${total}
            </div>
          </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 ">
          <AddressInput addressProps={order} disabled={true}/>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default page;
