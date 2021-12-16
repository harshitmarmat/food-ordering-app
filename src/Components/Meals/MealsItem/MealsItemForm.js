import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealsItemForm.module.css'

const MealsItemForm = props => {
    const [amountIsValid , setAmountIsValid] = useState(true);
    const amountRef = useRef();

    const formSubmitHandler = event => {
        event.preventDefault();
        // console.log(amountRef.current.value);
        const enteredAmount = amountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        console.log("reach");
        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            console.log("wrond");
            return;
        }
        props.onAddToCart(+amountRef.current.value);
    }
    const selectHandler = () => {
        setAmountIsValid(true);
    }
    return (
        <form className={classes.form} onSubmit={formSubmitHandler}>
            <Input label="Amount" 
                onSelect={selectHandler}
                ref={amountRef}
                input = {{
                    id:'amount_'+props.id,
                    type:'number',
                    // min:'1',
                    // max:'5',
                    step:'1',
                    defaultValue:'1'
                }}
            />
            <button >+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount(1-5)</p>}
        </form>
    )
}

export default MealsItemForm;