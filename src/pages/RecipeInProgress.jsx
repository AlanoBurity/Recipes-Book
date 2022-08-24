import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import FavPageButtons from '../components/FavPageButtons';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { location } = history;
  const { pathname } = location;
  const [checked, setChecked] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [setIsFood] = useState('');
  const [recipeProgress, setRecipeProgress] = useState('');
  const [ingredientsIndex, setIngredientsIndex] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let endPoint = '';
    if (pathname.includes('drinks')) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      setIsFood(false);
    } else if (pathname.includes('foods')) {
      endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setIsFood(true);
    }

    const fetchById = async (url) => {
      const data = await fetch(url).then((response) => response.json());
      setRecipeProgress(data);
      console.log(data);
      setIsLoading(false);
    };
    fetchById(endPoint);
  }, []);

  const mock = [{
    idMeal: '52771',
    strMeal: 'Spicy Arrabiata Penne',
    strDrinkAlternate: null,
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    strInstructions: `Bring a large pot of water to a boil. 
    Add kosher salt to the boiling water, then add the pasta. 
    Cook according to the package instructions, about 9 minutes.
    \r\nIn a large skillet over medium-high heat, 
    add the olive oil and heat until the oil starts to shimmer. 
    Add the garlic and cook, stirring, until fragrant, 
    1 to 2 minutes. Add the chopped tomatoes, red chile flakes, 
    Italian seasoning and salt and pepper to taste. 
    Bring to a boil and cook for 5 minutes. Remove 
    from the heat and add the chopped basil.
    \r\nDrain the pasta and add it to the sauce. 
    Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.`,
    strMealThumb: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    strTags: 'Pasta,Curry',
    strYoutube: 'https://www.youtube.com/watch?v=1IszT_guI08',
    strIngredient1: 'penne rigate',
    strIngredient2: 'olive oil',
    strIngredient3: 'garlic',
    strIngredient4: 'chopped tomatoes',
    strIngredient5: 'red chile flakes',
    strIngredient6: 'italian seasoning',
    strIngredient7: 'basil',
    strIngredient8: 'Parmigiano-Reggiano',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: null,
    strIngredient17: null,
    strIngredient18: null,
    strIngredient19: null,
    strIngredient20: null,
    strMeasure1: '1 pound',
    strMeasure2: '1/4 cup',
    strMeasure3: '3 cloves',
    strMeasure4: '1 tin ',
    strMeasure5: '1/2 teaspoon',
    strMeasure6: '1/2 teaspoon',
    strMeasure7: '6 leaves',
    strMeasure8: 'spinkling',
    strMeasure9: '',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: null,
    strMeasure17: null,
    strMeasure18: null,
    strMeasure19: null,
    strMeasure20: null,
    strSource: null,
    strImageSource: null,
    strCreativeCommonsConfirmed: null,
    dateModified: null,
  }];

  useEffect(() => {
    const ingredientsLength = document.querySelector('#form');
    if (typeof ingredientsLength === 'object') {
      setIngredientsIndex(ingredientsLength.length);
    }
  }, []);

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const renderIngredientsList = () => {
    if (isLoading === false) {
      const regexForIngredients = /strIngredient\d/gi;
      const regexForMeasure = /strMeasure\d/gi;
      const propriedades = Object.keys(recipeProgress.meals[0]);
      const ingredientes = propriedades.filter((propriedade) => (
        propriedade.match(regexForIngredients)));
      const medidas = propriedades.filter((propriedade) => (
        propriedade.match(regexForMeasure)));
      return ingredientes.map((ingrediente, index) => {
        let retorno;
        if (recipeProgress.meals[0][ingrediente] !== null
        && recipeProgress.meals[0][ingrediente].length > 0) {
          retorno = (
            <div key={ index }>
              <input
                name={ index }
                value={ checked[index] }
                onChange={ handleChange }
                type="checkbox"
                id={ index }
              />
              <label
                htmlFor={ index }
                className={ checked[index] ? 'done' : '' }
              >
                {`${recipeProgress.meals[0][ingrediente]} - 
              ${recipeProgress.meals[0][medidas[index]]}`}
              </label>
            </div>

          );
        }
        return retorno;
      });
    }
  };

  const finishRecipeValidation = () => {
    const checkedValues = Object.values(checked);
    console.log(ingredientsIndex);
    if (checkedValues.map((item) => item === true).length === ingredientsIndex) {
      return true;
    }
  };

  return (
    <div>
      { mock.map((item) => (
        <main key={ item.strMeal }>
          <img data-testid="recipe-photo" src={ item.strMealThumb } alt="Cocktail" />
          <h3 data-testid="recipe-title">
            { item.strMeal}
          </h3>
          <p data-testid="recipe-category">{item.strCategory}</p>
          <form id="form">
            { renderIngredientsList()}
          </form>
          <button type="button" data-testid="share-btn">Share</button>
          <FavPageButtons />
          <p data-testid="instructions">{item.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ finishRecipeValidation() }
            onClick={ () => history.push('/done-recipes') }
          >
            Finish Recipe
          </button>
        </main>
      ))}

    </div>
  );
}

RecipeInProgress.propTypes = {
};

export default RecipeInProgress;
