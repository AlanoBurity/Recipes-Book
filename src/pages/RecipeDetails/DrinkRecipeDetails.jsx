import React, { useContext, useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import context from '../../context/Context';
import StartRecipeBTN from '../../components/StartRecipeBTN';
import fetchMealApi from '../../services/fetchMealApi';

function DrinkRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const { recipeDetailsData: data, apiMealData: recData,
    setApiMealData } = useContext(context);
  useEffect(() => {
    setIsLoading(true);
    const getMeal = async () => {
      const mealsResponse = await fetchMealApi('', 's');
      setApiMealData(mealsResponse);
      setIsLoading(false);
    };
    getMeal();
  }, []);
  const LIMIT = 6;
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions,
    strGlass } = data.drinks[0];

  const renderIngredientsList = () => {
    const regexForIngredients = /strIngredient\d/gi;
    const regexForMeasure = /strMeasure\d/gi;
    const propriedades = Object.keys(data.drinks[0]);
    const ingredientes = propriedades.filter((propriedade) => (
      propriedade.match(regexForIngredients)));
    const medidas = propriedades.filter((propriedade) => (
      propriedade.match(regexForMeasure)));
    return ingredientes.map((ingrediente, index) => {
      let retorno;
      if (data.drinks[0][ingrediente] !== null
        && data.drinks[0][ingrediente].length > 0) {
        retorno = (
          <li
            key={ `${index}${data.drinks[0][ingrediente]}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${data.drinks[0][ingrediente]} - ${data.drinks[0][medidas[index]]}`}
          </li>
        );
      }
      return retorno;
    });
  };
  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h2 data-testid="recipe-category">{strAlcoholic}</h2>
      <h2>Ingredients</h2>
      <ul>
        {
          renderIngredientsList()
        }
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{strInstructions}</p>
      <p>{strGlass}</p>
      <h2>Recommended</h2>
      <div className="scroll-horizontal">
        {isLoading ? 'carregando'
          : recData.meals.slice(0, LIMIT).map((meal, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ `${meal.strMeal}${index}` }
            >
              <img src={ meal.strMealThumb } alt={ meal.strMeal } />
              <h2>{meal.strMeal}</h2>
              <h1>{meal.strCategory}</h1>
            </div>
          ))}
      </div>
      <StartRecipeBTN />
    </div>
  );
}

export default DrinkRecipeDetails;
