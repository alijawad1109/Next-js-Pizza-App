'use client'
import React, { createContext, useEffect, useState } from 'react'
import {SessionProvider} from 'next-auth/react'
import toast from 'react-hot-toast';
export const CartContext = createContext();


export const cartItemPrice = (cartItem) => {
  let price= cartItem.price;
  if(cartItem.size){
    price = cartItem.size.price
  }
  if(cartItem.extras?.length > 0){
    for (const extra of cartItem.extras){
      price += extra.price
    }
  }
  return price;
}
const AppProvider = ({children}) => {
  const [cartItems,setCartItems]=useState([])
  const ls=typeof window !== 'undefined' ? window.localStorage : null;
  useEffect(() => {
    if(ls && ls.getItem('cart')){
      setCartItems( JSON.parse(ls.getItem('cart')) )
    }
  }, [])
  function clearCart(){
    setCartItems([])
    saveCartItemsToLocalStorage([])
  }
  function removeCartProducts(indexTo){
    setCartItems(prevItems => {
      const newCartProducts = prevItems.filter((v,index)=> index !== indexTo);
      saveCartItemsToLocalStorage(newCartProducts)
      return newCartProducts
    })
    toast.success("Product removed")
  }
  function saveCartItemsToLocalStorage(cartItems){
    if(ls){
      ls.setItem('cart', JSON.stringify(cartItems))
    }
  }
  function addToCart(product,size=null,extras=[]){
    setCartItems(prevProducts=>{
      const cartProduct= {...product,size,extras};
      const newProducts=[...prevProducts, cartProduct]
      saveCartItemsToLocalStorage(newProducts)
      return newProducts
    })
  }

  
  return (
    <>
     <SessionProvider>
     <CartContext.Provider value={{
      cartItems,setCartItems,addToCart,removeCartProducts,clearCart
     }}>
     {children}
     </CartContext.Provider>
     </SessionProvider> 
    </>
  )
}
export default AppProvider

