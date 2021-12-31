import classes from './Checkout.module.css'

const Checkout = (props) => {
    const onConfirmHandler = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={onConfirmHandler}>
            <div className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' />
            </div>
            <div className={classes.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' />
            </div><div className={classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' />
            </div>
            <div className={classes.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' />
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Cancel</button>
                <button type='submit'>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout ;