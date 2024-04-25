"use client";
import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeader";
import { CartContext, cartItemPrice } from "./../components/AppProvider";
import AddressInput from "../components/layout/AddressInput";
import {UserProfile} from "../components/UserProfile";
import toast from "react-hot-toast";
import SectionHeader from "../components/layout/SectionHeader";
import CartProduct from "@/app/components/menu/CartProduct";
const Page = () => {
  const { cartItems, removeCartProducts } = useContext(CartContext);
  const [adress, setAdress] = useState({});
  const { data: profileData } = UserProfile();
  useEffect(() => {
    console.log(profileData); // Check if profileData is being fetched correctly.
    if (profileData?.city) {
      const { phone, address, city, code, country } = profileData;
      const addressFromProfile = { phone, address, city, code, country };
      setAdress(addressFromProfile);
    }
  }, [profileData]);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.href.includes("canceled=1")
    ) {
      toast.error("Payment Failed 😓");
    }
  }, []);

  let total = 0;
  for (const p of cartItems) {
    total += Math.round(cartItemPrice(p) * 1);
  }
  function handleAddressChange(propName, value) {
    setAdress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  function isFormValid() {
    return Object.values(adress).every(value => value.trim() !== '');
  }
  async function proceedToPay(e) {
    try {
      e.preventDefault();
      // Show loading toast
      const loadingToast = toast.loading("Processing checkout...");

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adress, // Make sure it's "address" not "adress"
          cartItems,
        }),
      });
      const link = await res.json();

      // Dismiss the loading toast
      toast.dismiss(loadingToast);

      if (res.ok) {
        // Show success toast
        toast.success("Checkout successful! Redirecting to payment...");
        // Redirect user
        window.location = link;
      } else {
        // Since the fetch promise won't reject on HTTP error statuses, handle them here
        throw new Error(
          "The server responded with an unsuccessful status code."
        );
      }
    } catch (error) {
      toast.error("Checkout failed. Please try again later.");
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="mt-2 text-center">
        <SectionHeader mainHeader={"Cart"} />
        <p>Your cart is still empty 😓</p>
      </section>
    );
  }
  return (
    <>
      <div className="text-center">
        <SectionHeaders mainHeader={"Cart"} />
      </div>
      <div className="mt-4 flex justify-center flex-wrap gap-8">
        <div>
          {cartItems?.length === 0 && <div>No items in your cart</div>}
          {cartItems?.length > 0 &&
            cartItems.map((item, index) => (
              <CartProduct
                item={item}
                index={index}
                key={index}
                onRemove={removeCartProducts}
              />
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
              ${total}
              <br />
              $5
              <br />${total + 5}
            </div>
          </div>
        </div>

        <form onSubmit={proceedToPay} className="bg-gray-300 rounded-lg p-3">
          <h2>CheckOut</h2>
          <AddressInput
            addressProps={adress}
            setAddressProps={handleAddressChange}
            disabled={false}
          />
          <div className="w-full">
            <button className="btn w-[100%] mt-2" type="submit" disabled={!isFormValid()}>
              Pay ${total + 5}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
