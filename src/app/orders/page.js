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
  function formatDateTime(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    
    // Convert 24-hour format to 12-hour format without leading zeros
    let hours = d.getHours();
    const isPM = hours >= 12;
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
  
    // Optionally append 'AM' or 'PM' if you want to show this
    const ampm = isPM ? 'PM' : 'AM';
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  
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
    <div className="max-w-5xl mx-auto">
      <UserTabs isAdmin={profile?.admin} />{" "}
      <div className="mt-4 ">
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
            <div className="flex gap-4 items-center">{formatDateTime(order.createdAt)} <Link href={"/orders/"+order._id} className="btn">Show Order</Link> 
            <div className={(order.paid ? "bg-green-500 p-1 text-white  rounded-lg" : "bg-red-500  text-white p-1 rounded-lg")}>{order.paid ? 'Paid' : 'Un-Paid'}</div>
            </div>

          </div>
          )}
      </div>
    </div>
  );
};

export default page;
