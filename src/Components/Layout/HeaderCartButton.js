import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] =  useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const numberOfItems = items.reduce((currNum , item)=> {
        return currNum + item.amount;
    },0);


    const btnClass = `${classes.button} ${ btnIsHighlighted ? classes.bump : '' }`;

    useEffect(() => {
        if(items.length===0){
            return;
        }
        setBtnIsHighlighted(true);
        
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false);
        },300);

        return () => {
            clearTimeout(timer);
        }

    },[items])

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>    
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;