import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = props => {
    const [onCheckout, setOnCheckout] = useState(false);
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
    return(
        <Modal onClose={props.onClose}>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>${totalAmount}</span>
            </div>
            {onCheckout && <Checkout onCancel={props.onClose}/>}
            {!onCheckout && modalAction}
            
        </Modal>
    )
}

export default Cart;