import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Swiper, SwiperSlide } from 'swiper/react';
import context from '../../context/Context';
import 'swiper/swiper-bundle.css';
import StartRecipeButton from '../../components/StartRecipeButton';
import './RecipeDetail.css';
import fetchCocktailApi from '../../services/fetchCocktailApi';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitRecomendation, setLimitRecomendation] = useState([]);
  const [favLinkCopyed, setFavLinkCopyed] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  // contexto global
  const { recipeDetailsData: data, setApiCocktailData, buttonRecipeDone,
    setButtonRecipeDone } = useContext(context);

  // request das recomendações
  useEffect(() => {
    setIsLoading(true);
    const getDrinks = async () => {
      const LIMIT = 6;
      const drinksResponse = await fetchCocktailApi('', 's');
      // reduz pra 6 recomendações
      const filtered = drinksResponse.drinks.slice(0, LIMIT);
      setLimitRecomendation(filtered);
      setApiCocktailData(drinksResponse);
      setIsLoading(false);
    };
    getDrinks();
    setButtonRecipeDone(false);
    // eslint-disable-next-line
  }, []);

  // verifica se já é favoritado
  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null) {
      const hasFav = localFavs.some((e) => Number(e.id) === Number(id));
      setIsFav(hasFav);
    }
    // eslint-disable-next-line
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
  // capturando o final da url de video para o embed
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

  // função que copia o url quando clica em compartilhar
  const handleShareFavPage = () => {
    setFavLinkCopyed(true);
    const { host } = window.location;
    const { protocol } = window.location;
    console.log(pathname);
    copy(`${protocol}//${host}${pathname}`);
  };

  // lida com o click no coração de favoritar
  const hadleSetFav = () => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));

    // quando não é favoritado e ja tem favoriteRecipes no local storage
    if (localFavs !== null && !isFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...localFavs, favObj]));
      setIsFav(true);
      return;
    }

    // quando não é favoritado e ja NÃO tem favoriteRecipes no local storage
    if (localFavs === null && !isFav) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favObj]));
      setIsFav(true);
      return;
    }

    // quando quer desfavoritar
    if (localFavs !== null && isFav) {
      const removeFav = localFavs.filter((fav) => fav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
      setIsFav(false);
    }
  };

  return (
    <div className="allRecipe">

      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        className="recipe-photo"
      />

      <h1 data-testid="recipe-title">{strMeal}</h1>
      <div className="buttonsFoodRecipes">
        <input
          type="image"
          onClick={ handleShareFavPage }
          data-testid="share-btn"
          src={ shareIcon }
          alt="shareIcon"
        />
        { favLinkCopyed && <p>Link copied!</p>}

        <input
          type="image"
          onClick={ hadleSetFav }
          data-testid="favorite-btn"
          src={ isFav ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          className="favBtn"
        />
      </div>

      <h2 data-testid="recipe-category">{strCategory}</h2>
      <div className="ingredientes">
        <h2>Ingredients</h2>
        <ul>
          {
            renderIngredientsList()
          }
        </ul>
      </div>
      <div className="instructions">
        <h2>Instructions</h2>
        <p data-testid="instructions" className="instructions">{strInstructions}</p>
      </div>
      <h2>Video</h2>
      <div>
        <iframe width="300" height="300" src={ `https://www.youtube.com/embed/${urlId}` } title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen data-testid="video" />
      </div>
      <h2>Recommended</h2>
      <Swiper slidesPerView={ 1 } className="carousel">
        {isLoading ? 'carregando'
          : (limitRecomendation
            .map((drink, index) => (
              <SwiperSlide key={ `${drink.strDrink}${index}` }>
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ `${drink.strDrink}${index}` }
                  className="imagem"
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    className="imagem2"
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
              </SwiperSlide>
            )))}
      </Swiper>
      {!buttonRecipeDone && <StartRecipeButton /> }
    </div>
  );
}

export default FoodRecipeDetails;
