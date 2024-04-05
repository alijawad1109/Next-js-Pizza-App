"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "@/app/components/AppProvider"; // This path might be different for you
import toast from "react-hot-toast";
import FlyingButton from "react-flying-item";

import MenuItemTile from "@/app/components/menu/MenuItemTile";
const MenuItems = (menuItem) => {
  const [popup, setPopup] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const {
    name,
    price,
    image,
    sizes,
    description,
    extraIngredientsPrices,
    category,
  } = menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  // const truncatedDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;
  const { addToCart } = useContext(CartContext);
  async function handleAddToCartButtonClick() {
    console.log("add to cart");
    const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0;
    if (hasOptions && !popup) {
      setPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("hiding popup");
    setPopup(false);
    toast.success("Added to cart!", {
      position: "top-right",
    });
  }
  function handelExtraClick(ev, extra) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  }
  let selectedPrice = price;
  if (selectedSize) {
    selectedPrice = selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extras of selectedExtras) {
      selectedPrice += extras.price;
    }
  }
  return (
    <>
      {popup && (
        <div
          onClick={() => setPopup(false)}
          className="fixed top-0 right-0 left-0 bottom-0 bg-black/80 z-50 flex justify-center items-center"
        >
          <div className="overflow-y-auto hide-scrollbar h-screen">
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 rounded-lg max-w-md"
            >
              <img
                src={image}
                alt={name}
                className="w-[150px] h-[100px] mx-auto"
              />
              <h2 className="font-bold text-center">{name}</h2>
              <p className="text-sm text-gray-500 text-center">{description}</p>
              {sizes?.length > 0 && (
                <div>
                  <h3 className="bg-gray-200 text-md p-2 rounded-lg">
                    Pick your size
                  </h3>
                  {sizes.map((size) => (
                    <label className=" py-2 my-2 flex items-center p-2 gap-2 rounded-lg  border">
                      <input
                        type="radio"
                        className="flex items-center p-1"
                        onClick={() => setSelectedSize(size)}
                        name="size"
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${size.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientsPrices?.length > 0 && (
                <div>
                  <h3 className="bg-gray-200 text-md p-2 rounded-lg">
                    Any Extras ?
                  </h3>
                  {extraIngredientsPrices.map((extra) => (
                    <label className=" py-2 my-2 flex items-center p-2 gap-2 rounded-lg  border">
                      <input
                        type="checkbox"
                        onClick={(ev) => handelExtraClick(ev, extra)}
                        className="flex items-center p-1"
                        name={extra.name}
                      />
                      {extra.name} +${extra.price}
                    </label>
                  ))}
                </div>
              )}
              <div className="flex justify-center items-center gap-4">
                <div className="btn" onClick={handleAddToCartButtonClick}>
                  <FlyingButton targetTop="5%" targetLeft="95%" src={image}>
                    Add to cart $ ${selectedPrice}
                  </FlyingButton>
                </div>
                <button
                  onClick={() => setPopup(false)}
                  className="border p-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItems;
