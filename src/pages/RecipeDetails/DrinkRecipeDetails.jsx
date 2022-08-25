import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import copy from 'clipboard-copy';
import context from '../../context/Context';
import StartRecipeButton from '../../components/StartRecipeButton';
import fetchMealApi from '../../services/fetchMealApi';
import './RecipeDetail.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitRecomendation, setLimitRecomendation] = useState([]);
  const { recipeDetailsData: data,
    setApiMealData, buttonRecipeDone, setButtonRecipeDone } = useContext(context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favLinkCopyed, setFavLinkCopyed] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const { id } = useParams();

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
    setButtonRecipeDone(false);
  }, []);

  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null) {
      const hasFav = localFavs.some((e) => e.id === id);
      setIsFav(hasFav);
    }
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

  const handleShareFavPage = () => {
    setFavLinkCopyed(true);
    const { host } = window.location;
    const { protocol } = window.location;
    console.log(pathname);
    copy(`${protocol}//${host}${pathname}`);
  };

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strDrink}</h1>

      <input
        type="image"
        onClick={ handleShareFavPage }
        data-testid="share-btn"
        // name={ `${recipe.type}s/${recipe.id}` }
        src={ shareIcon }
        alt="shareIcon"
      />
      { favLinkCopyed && <p>Link copied!</p>}

      <input
        // name={ recipe.id }
        type="image"
        onClick={ () => {} }
        data-testid="favorite-btn"
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />

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
          : (limitRecomendation
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
            )))}
      </div>
      {!buttonRecipeDone && <StartRecipeButton /> }
    </div>
  );
}

export default DrinkRecipeDetails;
