import React from "react";
import AddToCart from "@/app/components/menu/AddToCart";
const MenuItemTile = ({ onAddToCart, ...item }) => {
  const { image, name, description, price, sizes, extraIngredientsPrices } =
    item;
  const hasExtrasAndSizes = sizes?.length > 0 && extraIngredientsPrices?.length;
  return (
    <div className="">
      <div className="relative">
        <div className=" bg-gray-100 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/75 transition-all cursor-pointer ">
          <div className="flex justify-center items-center">
            <img src={image} alt="" className="w-[200px] h-[200px]" />
          </div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-gray-500 my-2 line-clamp-3">
            {description}
          </p>
          <AddToCart
            hasExtrasAndSizes={hasExtrasAndSizes}
            price={price}
            onClick={onAddToCart}
            image={image}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItemTile;
