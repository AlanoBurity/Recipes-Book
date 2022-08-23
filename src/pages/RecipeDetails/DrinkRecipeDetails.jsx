import React, { useContext } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import StartRecipeBTN from '../../components/StartRecipeBTN';

function DrinkRecipeDetails() {
  const { recipeDetailsData: data } = useContext(context);
  const { strDrink, strDrinkThumb, strAlcoholic, strInstructions,
    strGlass } = data.meals[0];

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
        src={ strDrinkThumb }
        alt={ strDrink }
        roundedCircle
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
      <StartRecipeBTN />
    </div>
  );
}

export default DrinkRecipeDetails;
