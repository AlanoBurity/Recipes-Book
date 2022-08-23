import React, { useState } from 'react';
import '../App.css';

function RecipeInProgress() {
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
  // const { location: { pathname } } = props;
  // const { history } = props;
  // const { apiCocktailData, searchBtn } = useContext(context);
  const initialChecked = {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
  };
  const [checked, setChecked] = useState(initialChecked);
  const disableFinish = {
    checkbox1: checked.checkbox1,
  };
  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const renderIngredientsList = () => {
    const regexForIngredients = /strIngredient\d/gi;
    const regexForMeasure = /strMeasure\d/gi;
    const propriedades = Object.keys(mock[0]);
    const ingredientes = propriedades.filter((propriedade) => (
      propriedade.match(regexForIngredients)));
    const medidas = propriedades.filter((propriedade) => (
      propriedade.match(regexForMeasure)));
    return ingredientes.map((ingrediente, index) => {
      let retorno;
      if (mock[0][ingrediente] !== null
        && mock[0][ingrediente].length > 0) {
        retorno = (
          <form>
            <input
              name="checkbox1"
              value={ checked.checkbox1 }
              onChange={ handleChange }
              type="checkbox"
              id="ingredient1"
              data-testid="0-ingredient-step"
            />
            <label
              htmlFor="ingredient1"
              className={ checked.checkbox1 ? 'done' : '' }
            >
              {`${mock[0][ingrediente]} - ${mock[0][medidas[index]]}`}
            </label>
          </form>

        );
      }
      return retorno;
    });
  };

  return (
    <div>
      {console.log(checked)}
      { mock.map((item) => (
        <main key={ item.strMeal }>
          <img data-testid="recipe-photo" src={ item.strMealThumb } alt="Cocktail" />
          <h3 data-testid="recipe-title">
            { item.strMeal}
          </h3>
          <p data-testid="recipe-category">{item.strCategory}</p>
          {renderIngredientsList()}
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <p data-testid="instructions">{item.strInstructions}</p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
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
