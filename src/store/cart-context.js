import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {},
  clearCart:()=> {}
});




export default CartContext;
