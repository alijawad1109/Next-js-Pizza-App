"use client";
import React, { useEffect, useState } from "react";
import UserTabs from "../components/layout/UserTabs";
import { UserProfile } from "../components/UserProfile";
import Edit from '@/app/components/icons/Edit'
import Link from "next/link";
const page = () => {
  const [users, setUsers] = useState([]);
  const {loading,data} = UserProfile();
  useEffect(() => {
    fetch("/api/users").then((res) =>
      res.json().then((users) =>{
        setUsers(users)
        console.log(users)
      } )
    );
  }, []);
  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }
  return (
    <div>
      <UserTabs isAdmin={true} />
      <section className="max-w-xl mx-auto">
        {users.length > 0 &&
          users.map((user) => (
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex justify-between bg-gray-300 p-2 rounded-lg">
                <span>
                  <span className="text-gray-500">Name:</span>{" "}
                  {user.name ? user.name : "User name is not defined"}
                </span>
                <span>Email:{user.email}</span>
                <Link href={'/users/' +user._id}>
                <button><Edit/></button>
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default page;
