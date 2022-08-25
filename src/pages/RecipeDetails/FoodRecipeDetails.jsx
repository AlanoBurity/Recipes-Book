import React, { useContext, useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import context from '../../context/Context';
import StartRecipeBTN from '../../components/StartRecipeBTN';
import './RecipeDetail.css';
import fetchCocktailApi from '../../services/fetchCocktailApi';

function FoodRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitRecomendation, setLimitRecomendation] = useState([]);
  const { recipeDetailsData: data,
    setApiCocktailData, buttonRecipeDone } = useContext(context);
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
  }, []);

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  // desustruturando o obj { meals: [{}] }
  const { strMeal, strMealThumb, strCategory, strInstructions,
    strYoutube } = data.meals[0];

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
  return (
    <div>

      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
      />

      <h1 data-testid="recipe-title">{strMeal}</h1>

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
      {isLoading ? 'carregando'
        : limitRecomendation
          .map((drink, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ `${drink.strDrink}${index}` }
              className="imagem"
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h2 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h2>
              <h1>{drink.strCategory}</h1>
            </div>
          ))}

      {buttonRecipeDone && <StartRecipeBTN /> }

    </div>
  );
}

export default FoodRecipeDetails;
