import MealItem from "./MealItems/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import useHttp from '../../Hooks/use-http';
import { fetchMeals } from '../../api/api';
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const AvailableMeals = () => {
const {sendRequest, status, data:loadedAvailableMeals, error} = useHttp(fetchMeals, true);

useEffect(()=>{
  sendRequest()
}, [sendRequest])

if (status === 'pending'){
  return<section className = {classes.mealsIsLoading}>
 <LoadingSpinner/>
  </section>
 
}
if(error){
  return<section className = {classes.mealsError}>
  <p className>{error}</p>
   </section>
}

if (status === 'completed' && (!loadedAvailableMeals || loadedAvailableMeals.length === 0)){
  return<section className = {classes.mealsIsLoading}>
  <p className>Found No Meals</p>
   </section>
}


  const meals =loadedAvailableMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
