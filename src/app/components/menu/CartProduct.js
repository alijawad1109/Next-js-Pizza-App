import React from "react";
import Trash from "../icons/Trash";
import { cartItemPrice } from "../AppProvider";

const CartProduct = ({item,onRemove,index}) => {
  return (
    <div>
      <div key={item.id} className="border-b p-2 ">
        <div className="flex justify-between items-center">
          <div className="flex-grow flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-[150px] h-[100px] object-cover"
            />
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="flex items-start flex-col">
                <div className="font-bold">${cartItemPrice(item)}</div>
                {item.size && <div>Size: {item.size.name}</div>}
              </div>
              {item?.extras.length > 0 && (
                <div>
                  Extras:
                  {item.extras.map((extra, index) => (
                    <div key={index}>
                      {extra.name} ${extra.price}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {!!onRemove && (
          <button type="button" onClick={() => onRemove(index)}>
            <Trash />
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
