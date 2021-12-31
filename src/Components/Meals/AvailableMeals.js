import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealsItem from './MealsItem/MealsItem';


const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

useEffect(()=>{
  const fetchMeals = async()=>{
    const response = await fetch('https://food-order-app-8a8b2-default-rtdb.firebaseio.com/meals.json');
    
    if(!response.ok){
      throw new Error("Something went Wrong");
    }
    const responseData = await response.json();

    const loadedData = [];
    console.log("done");
    for(const key in responseData){
      loadedData.push({
        id : key,
        name : responseData[key].name,
        description : responseData[key].description,
        price : responseData[key].price
      });
    }
  setMeals(loadedData);
  setIsLoading(false);
  }

  fetchMeals().catch((error)=>{
    setHttpError(error.message);
    setIsLoading(false);
  });

},[]);

  if(isLoading){
    return (
      <section className={classes.mealsloading}>
        <h2>Loading....</h2>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.error}>
        <h2>{httpError}</h2>
      </section>
    )
  }
  const mealsItem  = meals.map((meal)=> <MealsItem 
        id={meal.id}
        name={meal.name}
        price = {meal.price}
        key={meal.id}
        description={meal.description}
        />)
    return(
        <section className={classes.meals}>
          <Card>
            <ul>
              {mealsItem}
            </ul>
          </Card>
        </section>
    )
}

export default AvailableMeals;