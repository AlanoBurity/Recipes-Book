import React, { useContext } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import context from '../../context/Context';
import StartRecipeBTN from '../../components/StartRecipeBTN';

function FoodRecipeDetails() {
  const { recipeDetailsData: data } = useContext(context);
  const { strMeal, strMealThumb, strCategory, strInstructions } = data.meals[0];
  console.log(data.meals[0]);
  // "https://www.youtube.com/watch?v=Ds1Jb8H5Sg8"
  // "https://www.youtube.com/embed/Ds1Jb8H5Sg8"
  const renderIngredientsList = () => {
    const regexForIngredients = /strIngredient\d/gi;
    const regexForMeasure = /strMeasure\d/gi;
    const propriedades = Object.keys(data.meals[0]);
    const ingredientes = propriedades.filter((propriedade) => (
      propriedade.match(regexForIngredients)));
    const medidas = propriedades.filter((propriedade) => (
      propriedade.match(regexForMeasure)));
    return ingredientes.map((ingrediente, index) => {
      let retorno;
      if (data.meals[0][ingrediente] !== null
        && data.meals[0][ingrediente].length > 0) {
        retorno = (
          <li>
            {`${data.meals[0][ingrediente]} - ${data.meals[0][medidas[index]]}`}
          </li>
        );
      }
      return retorno;
    });
  };
  return (
    <div>
      <Image
        src={ strMealThumb }
        alt={ strMeal }
        roundedCircle
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
      <h2>Videos</h2>
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Ds1Jb8H5Sg8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen data-testid="video" />
      </div>
      <StartRecipeBTN />
    </div>
  );
}

export default FoodRecipeDetails;
