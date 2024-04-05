import React from "react";
import FlyingButton from "react-flying-item";
const AddToCart = ({ hasExtrasAndSizes, price, onClick, image }) => {
  if (!hasExtrasAndSizes) {
    return (
      <div className="btn" onClick={onClick}>
        <FlyingButton targetTop="5%" targetLeft="95%" src={image}>
          Add to cart $ {price}
        </FlyingButton>
      </div>
    );
  }
  return (
    <div>
      <button className="btn" onClick={onClick}>
        <span>Add to cart (from ${price})</span>
      </button>
    </div>
  );
};

export default AddToCart;
