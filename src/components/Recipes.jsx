import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import context from '../context/Context';
import fetchCocktailApi from '../services/fetchCocktailApi';
import fetchDrinksFilterCategory from '../services/fetchDrinksFilterCategory';
import fetchMealApi from '../services/fetchMealApi';
import fetchMealsFilterCategory from '../services/fetchMealsFilterCategory';

const numberRenderItems = 12;
const numberMaxCategorys = 5;

function Recipes(props) {
  const { pathname } = props;
  const {
    apiMealData: { meals },
    apiCocktailData: { drinks },
    mealsCategorys,
    drinksCategorys,
    setApiMealData,
    setApiCocktailData,
  } = useContext(context);

  const handleMealsFilterByCategory = async ({ target: { name } }) => {
    const filteredMeals = await fetchMealsFilterCategory(name);
    setApiMealData(filteredMeals);
  };

  const handleDrinksFilterByCategory = async ({ target: { name } }) => {
    const filteredDrinks = await fetchDrinksFilterCategory(name);
    setApiCocktailData(filteredDrinks);
  };

  const handleAllDrinks = async () => {
    const drinksResponse = await fetchCocktailApi('', 's');
    setApiCocktailData(drinksResponse);
  };

  const handleAllMeals = async () => {
    const mealsResponse = await fetchMealApi('', 's');
    setApiMealData(mealsResponse);
  };

  return (
    <div>
      {pathname === '/drinks' && drinksCategorys.drinks && (
        <div>
          <div>
            <button
              data-testid="All-category-filter"
              type="button"
              onClick={ handleAllDrinks }
            >
              All
            </button>
            {drinksCategorys.drinks.slice(0, numberMaxCategorys).map((e) => (
              <button
                key={ e.strCategory }
                data-testid={ `${e.strCategory}-category-filter` }
                type="button"
                name={ e.strCategory }
                onClick={ handleDrinksFilterByCategory }
              >
                {e.strCategory}
              </button>
            ))}
          </div>
          {drinks.slice(0, numberRenderItems).map((drink, index) => (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          ))}
        </div>
      )}

      {pathname === '/foods' && mealsCategorys.meals && (
        <div>
          <div>
            <button
              data-testid="All-category-filter"
              type="button"
              onClick={ handleAllMeals }
            >
              All
            </button>
            {mealsCategorys.meals
              .slice(0, numberMaxCategorys)
              .map(({ strCategory }) => (
                <button
                  key={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  type="button"
                  name={ strCategory }
                  onClick={ handleMealsFilterByCategory }
                >
                  {strCategory}
                </button>
              ))}
          </div>
          {meals.slice(0, numberRenderItems).map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.idMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Recipes.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Recipes;
