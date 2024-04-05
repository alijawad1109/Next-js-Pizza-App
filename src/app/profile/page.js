"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import UserTabs from "./../components/layout/UserTabs";
import UserForm from "./../components/layout/UserForm";
import toast from "react-hot-toast";
const page = () => {
  const session = useSession();
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [user, setUser] = useState(null);
  const { status } = session;

  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setUser(data);
        setIsAdmin(data.admin);
        setProfileFetched(true);
      });
    });
  }, [session, status]);
  if (status === "loading" || !profileFetched) {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return window.location.replace('/login');
  }
  const userImage = session.data?.user?.image;
  const handleProfileUpdate = async (e, data) => {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res)
      if (res.ok) {
        setSaved(true);
        setIsSaving(false);
        toast.success("Profile Updated!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <div className="">
        <UserTabs isAdmin={isAdmin} />
        <h1 className="primary text-4xl text-center tracking-[1px] py-2 mt-4">
          Profile
        </h1>
        <UserForm user={user} onSave={handleProfileUpdate} />
      </div> 
    </>
  );
};

export default page;
