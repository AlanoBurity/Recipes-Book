import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../pages/FavoriteRecipes.css';

function HorizontalCard(props) {
  const { pathname } = props;
  const {
    favoriteRecipes,
    setFavoriteRecipes,
    doneRec,
  } = useContext(context);

  const [favLinkCopyed, setFavLinkCopyed] = useState(false);
  const history = useHistory();

  const handleCopy = async (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
    setFavLinkCopyed(true);
  }; // referencia https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText

  const handleDesFavPage = ({ target: { name } }) => {
    const removeFav = favoriteRecipes.filter(({ id }) => id !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFav));
    setFavoriteRecipes(removeFav);
  };

  const handleShareFavPage = ({ target: { name } }) => {
    setFavLinkCopyed(true);
    const { host } = window.location;
    const { protocol } = window.location;
    copy(`${protocol}//${host}/${name}`);
  };

  return (
    <div>
      {pathname === '/done-recipes' && doneRec
        .map((elem, index = 0) => (elem.type === 'food' ? (
          <div key={ index } className="favoriteRecipeCard">
            <button
              type="button"
              onClick={ () => history.push(`/foods/${elem.id}`) }
              className="bttnDoneRecipes"
            >
              <img
                src={ elem.image }
                alt={ elem.name }
                data-testid={ `${index}-horizontal-image` }
                className="favoriteRecipesImg"
              />
            </button>
            <div className="details">
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${elem.nationality} - ${elem.category}` }
              </p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/foods/${elem.id}`) }
                className="favoriteRecipesBtn2"
              >
                {elem.name}
              </button>
              <p data-testid={ `${index}-horizontal-done-date` }>{elem.doneDate}</p>
              <button
                value={ elem.id }
                src={ shareIcon }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleCopy(elem.id) }
                className="favoriteRecipesBtn"
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
              { favLinkCopyed && <p>Link copied!</p>}
              {/*       <p
                data-testid={ `${index}-${elem.tags[0]}-horizontal-tag` }
              >
                { elem.tags[0] }
              </p> */}
              {/*         <p
                data-testid={ `${index}-${elem.tags[1]}-horizontal-tag` }
              >
                { elem.tags[1] }
              </p> */}
            </div>
          </div>
        ) : (
          <div key={ index } className="favoriteRecipeCard">
            <button
              type="button"
              className="bttnDoneRecipes"
              onClick={ () => history.push(`/drinks/${elem.id}`) }
            >
              <img
                src={ elem.image }
                alt={ elem.name }
                data-testid={ `${index}-horizontal-image` }
                className="favoriteRecipesImg"
              />
            </button>
            <div className="details">
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${elem.alcoholicOrNot} - ${elem.category}` }
              </p>
              <button
                type="button"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/drinks/${elem.id}`) }
                className="favoriteRecipesBtn"
              >
                {elem.name}
              </button>
              <p data-testid={ `${index}-horizontal-done-date` }>{elem.doneDate}</p>
              <button
                value={ elem.id }
                src={ shareIcon }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleCopy(elem.id) }
                className="favoriteRecipesBtn"
              >
                <img src={ shareIcon } alt="shareIcon" />
              </button>
            </div>
          </div>
        )))}

      { /* logica do favoriteRecipes */}
      {pathname === '/favorite-recipes' && favoriteRecipes && (
        <div>
          {favoriteRecipes.map((recipe, index) => (
            <div key={ recipe.id } className="favoriteRecipeCard">
              <Link to={ `${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                  className="favoriteRecipesImg"
                />
              </Link>
              <div className="details">
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot
                    ? recipe.alcoholicOrNot
                    : `${recipe.nationality} - ${recipe.category}`}
                </p>
                <Link to={ `${recipe.type}s/${recipe.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                { favLinkCopyed && <p>Link copied!</p>}
                <input
                  type="image"
                  onClick={ handleShareFavPage }
                  data-testid={ `${index}-horizontal-share-btn` }
                  name={ `${recipe.type}s/${recipe.id}` }
                  src={ shareIcon }
                  alt="shareIcon"
                />
                <input
                  name={ recipe.id }
                  type="image"
                  onClick={ handleDesFavPage }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="blackHeartIcon"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

HorizontalCard.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default HorizontalCard;
