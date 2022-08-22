import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import context from '../context/Context';

const numberRenderItems = 12;

function Recipes(props) {
  const { pathname } = props;
  const {
    apiMealData: { meals },
    apiCocktailData: { drinks },
  } = useContext(context);

  return (
    <div>
      {pathname === '/drinks'
        ? drinks.slice(0, numberRenderItems).map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))
        : meals.slice(0, numberRenderItems).map((meal, index) => (
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
  );
}

Recipes.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Recipes;
