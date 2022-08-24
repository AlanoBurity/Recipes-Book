import React, { useContext, useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import context from '../../context/Context';
import StartRecipeBTN from '../../components/StartRecipeBTN';
import fetchMealApi from '../../services/fetchMealApi';
import './RecipeDetail.css';

function DrinkRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitRecomendation, setLimitRecomendation] = useState([]);
  const { recipeDetailsData: data,
    setApiMealData } = useContext(context);
  useEffect(() => {
    setIsLoading(true);
    const getMeal = async () => {
      const LIMIT = 6;
      const mealsResponse = await fetchMealApi('', 's');
      const filtered = mealsResponse.meals.slice(0, LIMIT);
      console.log(filtered);
      setLimitRecomendation(filtered);
      setApiMealData(mealsResponse);
      setIsLoading(false);
    };
    getMeal();
  }, []);
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      <div className="scroll-horizontal2">
        {isLoading ? 'carregando'
          : (
            <Slider { ...settings }>
              { limitRecomendation
                .map((meal, index) => (
                  <div
                    data-testid={ `${index}-recomendation-card` }
                    key={ `${meal.strMeal}${index}` }
                    className="imagem"
                  >
                    <img
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                    />
                    <h2 data-testid={ `${index}-recomendation-title` }>
                      {meal.strMeal}

                    </h2>
                    <h1>{meal.strCategory}</h1>
                  </div>
                ))}

            </Slider>)}
      </div>
      <StartRecipeBTN />
    </div>
  );
}

export default DrinkRecipeDetails;
