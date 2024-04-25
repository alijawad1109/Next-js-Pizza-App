"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/app/components/AppProvider";
import Cart from "../icons/Cart";
import MenuIcon from "@/app/components/icons/Menu"; // Assuming Menu is an icon component
import SectionHeader from "./SectionHeader";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || "Name";
  const { cartItems ,clearCart} = useContext(CartContext);

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
   // Modify the logout button's onClick handler
   const handleLogout = async () => {
    await clearCart(); // Clear the cart first
    signOut(); // Then sign out
  };

  return (
    <div className="bg-white max-w-5xl mx-auto">
      <header className="flex gap-2 justify-between items-center p-4 md:flex-row flex-col">
        <div className="flex justify-between items-center w-[100%]">
          <Link
            href={"/"}
            className="text-2xl font-semibold primary transition duration-200 ease-in-out"
          >
            Aj&nbsp;Pizza
          </Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 focus:outline-none  ">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex lg:flex flex-col md:flex-row lg:flex-row gap-6 items-center  top-full left-0 w-full md:w-auto lg:w-auto bg-white shadow-md md:shadow-none lg:shadow-none z-10  pb-[20px] md:pb-0`}
        >
          <Link
            href={"/"}
            className="hover:text-red-600 active:text-bold transition duration-150 ease-in-out "
          >
            Home
          </Link>
          <Link
            href={"/menu"}
            className="hover:text-indigo-500 transition duration-150 ease-in-out"
          >
            Menu
          </Link>
          <Link
            href={"/#about"}
            className="hover:text-indigo-500 scroll-smooth transition duration-150 ease-in-out"
          >
            About
          </Link>
          <Link
            href={"/our-story"}
            className="hover:text-indigo-500 scroll-smooth transition duration-150  ease-in-out"
          >
            Our&nbsp;Story
          </Link>
          {status === "authenticated" && (
            <>
              <Link
                href={"/profile"}
                className="  transition duration-150 ease-in-out"
              >
                {userName}
              </Link>
              <button
                className="btn transition duration-150 ease-in-out"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link
                href={"/login"}
                className=" transition duration-150 ease-in-out"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="btn transition duration-150 ease-in-out "
              >
                Register
              </Link>
            </>
          )}
          <div className="hidden md:flex items-center gap-1">
            <div className="relative">
              <Link href={"/cart"}>
                <Cart className="h-6 w-6 text-gray-700 transition duration-150 ease-in-out" />
                {cartItems?.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 text-xs bg-red-500 text-white rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="relative">
                <Link href={"/cart"}>
                  <Cart />
                  {cartItems?.length > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 text-xs bg-red-500 text-white rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}

          {/* <div className="ml-0 md:ml-[25px]">
       <ClearCartButton/>
      </div> */}
        </nav>
      </header>


    </div>
  );
};

export default Header;
