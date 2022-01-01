import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const [onCheckout, setOnCheckout] = useState(false);
    const [isSubmitting ,setIsSubmitting] = useState(false);
    const [didSubmit , setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const showOrder = totalAmount>0;


    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({
            ...item,
            amount : 1
        })
    }
    const onOrderHandler = () => {
        setOnCheckout(true);
    }

    const submitOrderHandler = async(userData)=> {
        setIsSubmitting(true);
        await fetch('https://food-order-app-8a8b2-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body : JSON.stringify({
                users : userData,
                orderItems : cartCtx.items
            })
        })
        // if(!response.ok){
        //     throw new Error ('Something went wrong');
        // }
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    
    const cartItem = <ul className={classes['cart-items']}>
            {cartCtx.items.map(item=> 
            <li>
                <CartItem
                    key = {item.id}
                    name={item.name}
                    amount = {item.amount}
                    price = {item.price}
                    onRemove = {cartItemRemoveHandler.bind(null,item.id)}
                    onAdd = {cartItemAddHandler.bind(null,item)}
                />
            </li>)}
        </ul>

        const modalAction = (
            <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {showOrder && <button onClick={onOrderHandler} className={classes.button}>Order</button>}
            </div>);

        const cartModalContent = <React.Fragment>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {onCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!onCheckout && modalAction}
        </React.Fragment>

        const isSubmittingModalContent = <p>Sending order data...</p>

        const didSubmitModalContent = <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    return(
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
            
        </Modal>
    )
}

export default Cart;