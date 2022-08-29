import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../../App.css';

function FoodInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const { location } = history;
  const { pathname } = location;
  const [checked, setChecked] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [isFood, setIsFood] = useState('');
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
      console.log(isFood);
    }

    const fetchById = async (url) => {
      const data = await fetch(url).then((response) => response.json());
      setRecipeProgress(data);
      console.log(data);
      setIsLoading(false);
    };
    fetchById(endPoint);
  }, []);

  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
    const ingredientsLength = document.querySelector('#form');
    if (typeof ingredientsLength === 'object') {
      setIngredientsIndex(ingredientsLength.length);
    }
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
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
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
    if (checkedValues.filter((item) => item === true).length !== ingredientsIndex) {
      return true;
    }
  };

  const finishRecipe = () => {
    const arrayDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const correctDate = () => {
      const date = new Date();
      const maxMounth = 9;
      if (date.getMonth() > maxMounth) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      }
      return `${date.getDate()}/0${date.getMonth()}/${date.getFullYear()}`;
    };
    const firstDoneRecipe = [{
      id,
      type: 'food',
      nationality: recipeProgress.meals[0].strArea,
      category: recipeProgress.meals[0].strCategory,
      alcoholicOrNot: '',
      name: recipeProgress.meals[0].strMeal,
      image: recipeProgress.meals[0].strMealThumb,
      doneDate: correctDate(),
      tags: recipeProgress.meals[0].strTags,
    }];

    if (arrayDoneRecipes !== null) {
      const doneRecipes = [...arrayDoneRecipes,
        {
          id,
          type: 'food',
          nationality: recipeProgress.meals[0].strArea,
          category: recipeProgress.meals[0].strCategory,
          alcoholicOrNot: '',
          name: recipeProgress.meals[0].strMeal,
          image: recipeProgress.meals[0].strMealThumb,
          doneDate: correctDate(),
          tags: recipeProgress.meals[0].strTags,
        }];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      history.push('/done-recipes');
      return;
    }
    localStorage.setItem('doneRecipes', JSON.stringify(firstDoneRecipe));
    history.push('/done-recipes');
  };

  const renderMeal = () => {
    if (isLoading === false) {
      return (
        <div>
          <main key={ recipeProgress.meals[0].strMeal }>
            <img
              data-testid="recipe-photo"
              src={ recipeProgress.meals[0].strMealThumb }
              alt="Cocktail"
            />
            <h3 data-testid="recipe-title">
              {recipeProgress.meals[0].strMeal}
            </h3>
            <p data-testid="recipe-category">{recipeProgress.meals[0].strCategory}</p>
            <form id="form">
              {renderIngredientsList()}
            </form>
            <button type="button" data-testid="share-btn">Share</button>
            <button type="button" data-testid="favorite-btn">Favorite</button>
            <p data-testid="instructions">{recipeProgress.meals[0].strInstructions}</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ finishRecipeValidation() }
              onClick={ () => finishRecipe() }
            >
              Finish Recipe
            </button>
          </main>
        </div>);
    }
    return (<div>Carregando...</div>);
  };

  return (
    <div>
      {renderMeal()}

    </div>
  );
}

FoodInProgress.propTypes = {
};

export default FoodInProgress;
