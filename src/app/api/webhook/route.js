import {Order} from "../../models/Order"

const stripe = require('stripe')('sk_test_51OAtz3AedhfNeMfpBfjINZkft0PyJ85JOsywcdDpFXsHFoKtshIJ7EJFp05F0H7RQYzojMeH8fCpm8JRH2qmDHhq00eNpBBpL7');

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const reqBuffer = await req.text();
    const signSecret = 'whsec_c5dacd36ace668cb6369fc458c96c40b39b3074c8e0694940bfd433c5cd5ccf9';
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (e) {
    console.error('stripe error');
    console.log(e);
    return Response.json(e, {status: 400});
  }

  if (event.type === 'checkout.session.completed') {
    console.log(event,"this is my event");
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === 'paid';
    if (isPaid) {
      await Order.updateOne({_id:orderId}, {paid:true});
    }
  }

  return Response.json('ok', {status: 200});
}