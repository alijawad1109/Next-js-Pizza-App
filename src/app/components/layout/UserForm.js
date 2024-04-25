"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {UserProfile} from "../UserProfile";
import AddressInput from "@/app/components/layout/AddressInput";
const UserForm = ({ user, onSave }) => {
  // Helper function to load state from sessionStorage or fallback to initial user data
  const loadState = (key, initialState) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialState;
  };

  const [userName, setUserName] = useState(user?.name || "");
  const [city, setCity] = useState(user?.city || "");
  const [email, setEmail] = useState(user?.email); // Assuming email doesn't change as it's disabled
  const [country, setCountry] = useState(user?.country)
  const [phone, setPhone] = useState(user?.phone || "");
  const [image, setImage] = useState(user?.image || '');

  const [code, setCode] = useState(user?.code || "");
  const [address, setAddress] = useState(user?.address || "")
  
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [admin, setAdmin] = useState(() =>
    loadState("admin", user?.admin || false)
  );

  const session = useSession();
  const { status } = session;
  const { data: loggedInUser } = UserProfile();
  // const userImage = session.data?.user?.image;
  // console.log(userImage , 'userIMage')

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     setUserName(session.data.user.name);
  //   }
  // }, [user, session.data, status]);

  // Save to sessionStorage when values change
  useEffect(() => {
    sessionStorage.setItem("city", JSON.stringify(city));
    sessionStorage.setItem("country", JSON.stringify(country));
    sessionStorage.setItem("phone", JSON.stringify(phone));
    sessionStorage.setItem("code", JSON.stringify(code));
    sessionStorage.setItem("address", JSON.stringify(address));
    sessionStorage.setItem("userName", JSON.stringify(userName));
    sessionStorage.setItem("admin", JSON.stringify(admin));
  }, [city, country, phone, code, address, userName, admin]);
  function handleAddresChange(propName, value) {
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
    if (propName === "address") setAddress(value);
    if (propName === "code") setCode(value);
    if (propName === "phone") setPhone(value);
  }
  return (
    <div>
      <div className="max-w-xs mx-auto ">
        {saved && (
          <h2 className=" p-1 border m-2 rounded-lg bg-green-200 text-xl text-center tracking-[1px]">
            Profile Updated!
          </h2>
        )}
        {isSaving && (
          <h2 className=" p-1 border m-2 rounded-lg bg-blue-200 text-xl text-center tracking-[1px]">
            Saving....
          </h2>
        )}
        <div className="flex gap-2">
          <div className="flex">
            <img src={image} className="w-[100px] h-[60px] rounded-full" />
          </div>
          <form
            className="flex flex-col gap-1"
            onSubmit={(e) =>
              onSave(e, {
                name: userName,
                Image: image,
                 city,
                country,
                phone,
                address,
                 code,
                 admin,
                email,
              })
            }
          >
            <label>First and Last Name</label>
            <input
              type="text"
              className="rounded-[15px] w-[250px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 text-black"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email Address</label>
            <input
              type="email"
              className="rounded-[15px] w-[250px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3 bg-slate-300 cursor-not-allowed"
              placeholder="email"
              value={user?.email}
              disabled={true}
            />
            <AddressInput
              addressProps={{ address, country, code, phone ,city}}
              setAddressProps={handleAddresChange}
            />
            {loggedInUser && (
              <div className="gap-2 items-center inline-flex">
                <input
                  type="checkbox"
                  id="AdminCb"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.checked)}
                />
                <label htmlFor="AdminCb">Admin</label>
              </div>
            )}
            <button className="btn mt-2">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
