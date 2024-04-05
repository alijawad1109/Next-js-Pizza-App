import React, { useContext } from 'react';
import { CartContext } from './../AppProvider'; // Adjust the import path as necessary

const ClearCartButton = () => {
  const { clearCart } = useContext(CartContext);

  return (
    <button onClick={clearCart} className="-ml-0 md:-ml-[25px]">Clear&nbsp;Cart</button>
  );
};

export default ClearCartButton;
