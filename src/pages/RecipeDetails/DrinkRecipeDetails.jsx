import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Swiper, SwiperSlide } from 'swiper/react';
import context from '../../context/Context';
import 'swiper/swiper-bundle.css';
import StartRecipeButton from '../../components/StartRecipeButton';
import './RecipeDetail.css';
import fetchMealApi from '../../services/fetchMealApi';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitRecomendation, setLimitRecomendation] = useState([]);
  const [favLinkCopyed, setFavLinkCopyed] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  // contexto global
  const { recipeDetailsData: data,
    setApiMealData, buttonRecipeDone, setButtonRecipeDone } = useContext(context);

  // request das recomendações
  useEffect(() => {
    setIsLoading(true);
    const getMeal = async () => {
      const LIMIT = 6;
      const mealsResponse = await fetchMealApi('', 's');
      // reduz pra 6 recomendações
      const filtered = mealsResponse.meals.slice(0, LIMIT);
      setLimitRecomendation(filtered);
      setApiMealData(mealsResponse);
      setIsLoading(false);
    };
    getMeal();
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
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions,
    strGlass, strCategory } = data.drinks[0];

  const favObj = {
    id,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  // func pra gerar a lista de ingredientes/medidas
  const renderIngredientsList = () => {
    const regexForIngredients = /strIngredient\d/gi;
    const regexForMeasure = /strMeasure\d/gi;

    // pega todas as chaves do objeto da receita
    const propriedades = Object.keys(data.drinks[0]);

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
      <Swiper slidesPerView={ 1 }>
        {isLoading ? 'carregando'
          : limitRecomendation
            .map((meal, index) => (
              <SwiperSlide key={ `${meal.strMeal}${index}` }>
                <div
                  data-testid={ `${index}-recomendation-card` }
                  key={ `${meal.strMeal}${index}` }
                  className="imagem"
                >
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    className="imagem2"
                  />
                  <p data-testid={ `${index}-recomendation-title` }>
                    {meal.strMeal}

                  </p>
                  <h1>{meal.strCategory}</h1>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
      {!buttonRecipeDone && <StartRecipeButton /> }
    </div>
  );
}

export default DrinkRecipeDetails;
