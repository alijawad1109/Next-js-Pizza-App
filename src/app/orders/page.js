"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import {UserProfile} from "../components/UserProfile";
import dateTime from '@/app/libs/dateTime'
import Link from "next/link";
const page = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders,setLoadingOrders]=useState(true)
  const { loading, data: profile } = UserProfile();
  useEffect(() => {
    fetchOrders()
  }, []);
    function fetchOrders(){
      setLoadingOrders(true)
      fetch("/api/orders").then((res) =>
      res.json().then((orders) =>{
        setOrders(orders.reverse())
        setLoadingOrders(false)
      })

    );
  }
  return (
    <div>
      <UserTabs isAdmin={profile?.admin} />{" "}
      <div className="mt-4">
      {loadingOrders && (
        <div>Loading Orders..... </div>
      )}
        {orders.length > 0 &&
          orders.map((order) => 
          <div className="bg-gray-200 p-4 mb-2 rounded-lg flex flex-wrap  gap-4 items-center justify-between">
            <div className="flex flex-col">
             {order.cartItems?.map(p => p.name).join(', ')}
            <span>{order.userEmail}</span>
            </div>
            <div className={(order.paid ? " bg-green-500 p-1 text-white  rounded-lg" : "bg-red-500  text-white p-1 rounded-lg")}>{order.paid ? 'Paid' : 'Un-Paid'}</div>
            <div className="flex gap-3 items-center">{dateTime(order.createdAt)} <Link href={"/orders/"+order._id} className="btn">Show Order</Link> </div>
          </div>
          )}
      </div>
    </div>
  );
};

export default page;
