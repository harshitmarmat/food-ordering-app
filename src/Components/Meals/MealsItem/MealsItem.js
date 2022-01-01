import { useContext } from "react";
import classes from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';
import CartContext from '../../../store/cart-context';

const MealsItem = (props) => {
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (amountInput) => {
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amountInput,
            price:props.price
        })
    }
    const price = `Rs. ${props.price.toFixed(2)}`;
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealsItemForm onAddToCart={addToCartHandler} id={props.id} />
            </div>
        </li>
    )
}

export default MealsItem;