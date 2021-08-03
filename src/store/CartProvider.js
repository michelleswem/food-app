import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exisitingCartItem = state.items[exisitingCartItemIndex];

    let updatedItems;
    if (exisitingCartItem) {
      const updatedItem = {
        ...exisitingCartItem,
        amount: exisitingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const exisitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exisitingItem = state.items[exisitingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
    if (exisitingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exisitingItem,
        amount: exisitingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      
    };
  }

  if (action.type === 'CLEAR'){
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type:'CLEAR'})
  }



  const contextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addCartItem: addItemToCartHandler,
    removeCartItem: removeItemFromCartHandler,
    clearCart:clearCartHandler
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
