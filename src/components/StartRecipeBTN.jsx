import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../App.css';
import context from '../context/Context';

function StartRecipeBTN() {
  const history = useHistory();
  const { id } = useParams();
  const { pathname } = history.location;
  const { setButtonRecipeDone } = useContext(context);
  const [inProgressRecipes, setInProgressRecipes] = useState();
  console.log(id);
  useEffect(() => {
    const doneRecipesArray = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipeArray = JSON.parse(localStorage.getItem('inProgressRecipe'));
    console.log(doneRecipesArray, inProgressRecipeArray);
    if (doneRecipesArray !== null) {
      setButtonRecipeDone(doneRecipesArray.includes(id));
    }

    if (inProgressRecipeArray !== null) {
      setInProgressRecipes(inProgressRecipeArray.includes(parseInt(id, 10)));
    }
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`${pathname}/in-progress`) }
        style={ { position: 'fixed', bottom: 0 } }
      >
        {inProgressRecipes ? 'Continue Recipe' : 'Start Recipe' }

      </button>
    </div>
  );
}

export default StartRecipeBTN;
