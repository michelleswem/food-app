
const FIREBASE_DOMAIN =  "https://meals-a9b26-default-rtdb.firebaseio.com/"

export async function fetchMeals() {
  const response = await fetch(`${FIREBASE_DOMAIN}/meals.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error( data.message ||"Could Not Fetch Meals.");
  }
  const loadedMeals = [];
  for (const key in data) {
    const mealObj = {
      id: key,
      ...data[key],
    };
    loadedMeals.push(mealObj);
  }
  return loadedMeals;
}

