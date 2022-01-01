import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() ==='';
const isFiveChar = value =>value.trim().length===6;

const Checkout = (props) => {
  const nameInputRef = useRef('');
  const streetInputRef = useRef('');
  const postalCodeInputRef = useRef('');
  const cityInputRef = useRef('');
  const [formInputValidity,setFormInputValidity] = useState({
      name : true,
      street : true,
      postalCode : true,
      city : true
  })
 

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsVAlid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChar(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
        name : enteredNameIsValid,
        street : enteredStreetIsVAlid,
        city : enteredCityIsValid,
        postalCode : enteredPostalCodeIsValid
    })

    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsVAlid;
    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name : enteredName,
        city : enteredCity,
        street : enteredStreet,
        pinCode : enteredPostalCode
    })

  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '': classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? '': classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode ? '': classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? '': classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p className='error-text'>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p className='error-text'>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Pin Code</label>
        <input type='number' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p className='error-text'>Please enter a valid pin code (6 character long)!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p className='error-text'>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;