import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import copy from 'clipboard-copy';
import context from '../../context/Context';
import StartRecipeButton from '../../components/StartRecipeButton';
import './RecipeDetail.css';
import fetchCocktailApi from '../../services/fetchCocktailApi';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitRecomendation, setLimitRecomendation] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;
  const [favLinkCopyed, setFavLinkCopyed] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const { id } = useParams();

  const { recipeDetailsData: data,
    setApiCocktailData, buttonRecipeDone, setButtonRecipeDone } = useContext(context);
  useEffect(() => {
    setIsLoading(true);
    const getDrinks = async () => {
      const LIMIT = 6;
      const drinksResponse = await fetchCocktailApi('', 's');
      const filtered = drinksResponse.drinks.slice(0, LIMIT);
      setLimitRecomendation(filtered);
      setApiCocktailData(drinksResponse);
      setIsLoading(false);
    };
    getDrinks();
    setButtonRecipeDone(false);
  }, []);

  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null) {
      const hasFav = localFavs.some((e) => {
        console.log(e.id);
        console.log(id);
        return Number(e.id) === Number(id);
      });
      console.log(hasFav);
      setIsFav(hasFav);
    }
  }, []);

  // desustruturando o obj { meals: [{}] }
  const { strMeal, strMealThumb, strCategory, strInstructions,
    strYoutube, strArea } = data.meals[0];

  const favObj = {
    id,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
  // capturando o final da url de video
  // https://stackoverflow.com/questions/4758103/last-segment-of-url-with-javascript
  const url = strYoutube;
  const urlId = url.substring(url.lastIndexOf('=') + 1);

  // func pra gerar a lista de ingredientes/medidas
  const renderIngredientsList = () => {
    const regexForIngredients = /strIngredient\d/gi;
    const regexForMeasure = /strMeasure\d/gi;

    // pega todas as chaves do objeto da receita
    const propriedades = Object.keys(data.meals[0]);

    // filtra todos os ingredientes
    const ingredientes = propriedades.filter((propriedade) => (
      propriedade.match(regexForIngredients)));

    // filtra todos as medidas
    const medidas = propriedades.filter((propriedade) => (
      propriedade.match(regexForMeasure)));

    // faz um map no array que vai gerar a lista de ingredientes/medidas
    // e salva em uma variavel 'retorno'
    return ingredientes.map((ingrediente, index) => {
      let retorno;
      if (data.meals[0][ingrediente] !== null
        && data.meals[0][ingrediente].length > 0) {
        retorno = (
          <li
            key={ `${index}${data.meals[0][ingrediente]}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${data.meals[0][ingrediente]} - ${data.meals[0][medidas[index]]}`}
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

  const hadleSetFav = () => {
    console.log(isFav);
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null && !isFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...localFavs, favObj]));
      setIsFav(true);
      return;
    }
    if (localFavs === null && !isFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
      setIsFav(true);
      return;
    }
    if (localFavs !== null && isFav) {
      const removeFav = localFavs.filter((fav) => fav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
      setIsFav(false);
    }
  };

  return (
    <div>

      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />

      <h1 data-testid="recipe-title">{strMeal}</h1>

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
        onClick={ hadleSetFav }
        data-testid="favorite-btn"
        src={ isFav ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
      />

      <h2 data-testid="recipe-category">{strCategory}</h2>

      <h2>Ingredients</h2>
      <ul>
        {
          renderIngredientsList()
        }
      </ul>

      <h2>Instructions</h2>
      <p data-testid="instructions">{strInstructions}</p>

      <h2>Video</h2>
      <div>
        <iframe width="300" height="300" src={ `https://www.youtube.com/embed/${urlId}` } title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen data-testid="video" />
      </div>
      <h2>Recommended</h2>
      <div className="horizontal-scroll">
        {isLoading ? 'carregando'
          : (limitRecomendation
            .map((drink, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ `${drink.strDrink}${index}` }
                className="card"
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  className="card-img"
                />
                <h2
                  data-testid={ `${index}-recomendation-title` }
                  className="card-title"
                >
                  {drink.strDrink}
                </h2>
                <h1
                  className="card-category"
                >
                  {drink.strCategory}
                </h1>
              </div>
            )))}
      </div>
      {!buttonRecipeDone && <StartRecipeButton /> }

    </div>
  );
}

export default FoodRecipeDetails;
