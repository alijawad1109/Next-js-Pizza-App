"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "./../../components/layout/UserTabs";
import { useParams } from "next/navigation";
import UserForm from "@/app/components/layout/UserForm";
import toast from "react-hot-toast";
// import { userProfile } from "./../../components/UserProfile";
const page = () => {
    const {id} = useParams();
    const [user,setUser]= useState(null);
    useEffect(()=>{
        fetch('/api/profile?_id='+id).then( user =>{
           setUser(user)
        })
    },[])
    const handleSave = async (e, data) => {
        e.preventDefault();
        const toastId = toast.loading('Saving user...');
    
        try {
            const response = await fetch('/api/profile', {
                method: "PUT",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ ...data, _id: id })
            });
    
            if (response.ok) {
                toast.success('User saved successfully!', { id: toastId });
            } else {
                throw new Error('Failed to save user');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, { id: toastId });
        }
    };
    
  return (
    <div>
      <UserTabs isAdmin={true}/>
      <section className="max-w-xl mx-auto">
      <div className="text-center mt-4 primary text-2xl">User Info Form</div>
      <UserForm user={user} onSave={handleSave}/>
      </section>
    </div>
  );
};

export default page;
