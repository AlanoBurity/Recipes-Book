import React, { useContext, useState, useEffect } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import context from '../../context/Context';
import StartRecipeBTN from '../../components/StartRecipeBTN';
import '../../App.css';
import fetchCocktailApi from '../../services/fetchCocktailApi';

function FoodRecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const { recipeDetailsData: data, apiCocktailData: recData,
    setApiCocktailData } = useContext(context);
  useEffect(() => {
    setIsLoading(true);
    const getDrinks = async () => {
      const drinksResponse = await fetchCocktailApi('', 's');
      setApiCocktailData(drinksResponse);
      setIsLoading(false);
    };
    getDrinks();
  }, []);
  const LIMIT = 6;

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
        <iframe width="560" height="315" src={ `https://www.youtube.com/embed/${urlId}` } title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen data-testid="video" />
      </div>
      <h2>Recommended</h2>
      <div className="scroll-horizontal">
        {isLoading ? 'carregando'
          : recData.drinks.slice(0, LIMIT).map((drink, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ `${drink.strDrink}${index}` }
            >
              <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
              <h2>{drink.strDrink}</h2>
              <h1>{drink.strCategory}</h1>
            </div>
          ))}
      </div>
      <StartRecipeBTN />
    </div>
  );
}

export default FoodRecipeDetails;
