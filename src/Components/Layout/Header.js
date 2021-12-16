import { Fragment } from "react";
import classes from "./Header.module.css"
import mealImage from "../.././assets/meal.jpg"
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>
                    ReactMeals
                </h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealImage} alt="delicious food"/>
            </div>
        </Fragment>
    )
}

export default Header;