import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";
import CartContext from "../../store/cart-context";
import { Fragment, useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeCartItem(id);
  };

  const addCartItemHandler = (item) => {
    cartCtx.addCartItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (usereData) => {
    setIsSubmitting(true);
    await fetch("https://meals-a9b26-default-rtdb.firebaseio.com/order.json", {
      method: "POST",
      body: JSON.stringify({
        user: usereData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          amount={item.amount}
          name={item.name}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckOut && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <section className={classes.mealsIsLoading}>
      <LoadingSpinner />
    </section>
  );

  const didSubmitModalContent = (
    <Fragment>
      <p className={classes.mealssuccess}>Successfully send the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
