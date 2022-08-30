import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import context from '../context/Context';

function StartRecipeButton() {
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = history.location;
  const { setButtonRecipeDone } = useContext(context);
  const [inProgressRecipe, setInProgressRecipe] = useState();

  useEffect(() => {
    const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipeObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setButtonRecipeDone(false);
    if (doneRecipesArray !== null) {
      const hasId = doneRecipesArray.some((e) => e.id === id);
      setButtonRecipeDone(hasId);
    }

    if (inProgressRecipeObj !== null) {
      if (pathname.includes('drinks')) {
        const arrayOfKeys1 = Object.keys(inProgressRecipeObj.cocktails);
        const hasId2 = arrayOfKeys1.some((e) => e === id);
        setInProgressRecipe(hasId2);
      } else if (pathname.includes('foods')) {
        const arrayOfKeys2 = Object.keys(inProgressRecipeObj.meals);
        const hasId3 = arrayOfKeys2.some((e) => e === id);
        setInProgressRecipe(hasId3);
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${pathname}/in-progress`) }
        style={ { position: 'fixed', bottom: 0 } }
      >
        {inProgressRecipe ? 'Continue Recipe' : 'Start Recipe' }

      </button>
    </div>
  );
}

export default StartRecipeButton;
