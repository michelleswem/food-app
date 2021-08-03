import { useRef, useState } from "react";
import classes from "./Checkout.module.css";


const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
    const [formInputsValidity, setFormInputValidity] = useState({
        name:true,
        postalCode:true,
        street:true,
        city:true,
    })
  const nameInputRef = useRef();
  const postaCodeInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postaCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
        name:enteredNameIsValid,
        postalCode:enteredPostalCodeIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid    
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

if(!formIsValid) {
return;
      }
      props.onConfirm({
        name:enteredName,
        postalCode:enteredPostalCode,
        street:enteredStreet,
        city:enteredCity
      })
  };
const   nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
const   postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
const   streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
const   cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter Your Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter Your Street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postaCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please Enter Your Postal Code Number with Five Characters</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter Your City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
