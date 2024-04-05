"use client";
import React, { useState } from "react";
import Trash from "./../icons/Trash";
import UP from "./../icons/Up";
import Down from "./../icons/Down";
import Up from "./../icons/Up";
const MenuItemsPriceProps = ({ name, addLabel, props, setProps }) => {
    const [isOpen,setIsOpen]=useState(false)
  function addSize() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }
  function editSize(e, index, prop) {
    const newValue = e.target.value;
    setProps((prevState) => {
      const newSizes = [...prevState];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeSize(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-400 text-white p-3 text-center my-4 rounded-lg">
      <div>
        <div className="flex gap-2 justify-center items-center">
          <button className="flex gap-2 justify-center items-center" type="button" onClick={()=>setIsOpen((prev) =>!prev)}>
            <span>{name}</span> 
            <span>({props.length})</span>
            {isOpen && (
                <Up/>
            )}
            {!isOpen && (
            <Down />
            )}
          </button>
        </div>
        <div className={isOpen ? "block" : "hidden"}>
        {props.length > 0 &&
          props.map((e, index) => (
            <div className="text-black flex gap-2 items-end">
              <div>
                <label className="text-black">Enter Size</label>
                <input
                  type="text"
                  placeholder="Enter Size"
                  value={e.name}
                  className="rounded-lg mt-2 w-[120px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                  onChange={(e) => editSize(e, index, "name")}
                />
              </div>
              <div>
                <label className="text-black">Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={e.price}
                  className="rounded-lg mt-2 w-[120px] border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 p-3"
                  onChange={(e) => editSize(e, index, "price")}
                />
              </div>
              <div>
                <button
                  className=" text-[10px] rounded-lg mb-2"
                  type="button"
                  onClick={() => removeSize(index)}
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          className="border p-[4px] rounded-md mt-2"
          type="button"
          onClick={addSize}
        >
          {addLabel}
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default MenuItemsPriceProps;
