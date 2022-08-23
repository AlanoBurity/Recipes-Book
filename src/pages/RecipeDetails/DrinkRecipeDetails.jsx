import React, { useContext } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

function DrinkRecipeDetails() {
  const { recipeDetailsData: data } = useContext();
  const { strMeal, strMealThumb, strCategory } = data.meals[0];
  console.log(data.meals[0]);
  const regex = /strIngredient\d/gi;
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
          Object.keys(data.meals[0])
            .filter((key) => key.match(regex))
            .map((ingrediente) => {
              let retorno;
              if (data.meals[0][ingrediente] !== null
                && data.meals[0][ingrediente].length > 0) {
                retorno = <li>{data.meals[0][ingrediente]}</li>;
              }
              return retorno;
            })
        }
      </ul>
    </div>
  );
}

export default DrinkRecipeDetails;
