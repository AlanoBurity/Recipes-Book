import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function HorizontalCard(props) {
  const { pathname } = props;
  const {
    copyText,
    setCopyText,
    favoriteRecipes,
    setFavoriteRecipes,
  } = useContext(context);
  const history = useHistory();
  const handleCopyUrl = () => {
    setCopyText(history.location.pathname);
    copy(copyText);
    global.alert(`You have copied "${copyText}"`);
  };

  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null) setFavoriteRecipes(localFavs);
  }, []);

  // mock favoriteRecipes
  // const mockFav = [
  //   {
  //     id: '52771',
  //     type: 'food',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];
  // fim mock

  return (
    <div>
      {/* implementar logica do doneRecipes */}
      {pathname === '/done-recipes' && (
        <div>
          <button type="button" onClick={ () => history.push('/detailsrecipes') }>
            <img
              src="ims"
              alt="asd"
              data-testid="horizontal-image0-horizontal-image"
            />
          </button>
          <p data-testid="horizontal-top-text">categorieText</p>
          <button
            type="button"
            data-testid="horizontal-name"
            onClick={ () => history.push('/detailsrecipes') }
          >
            recipeName
          </button>
          <p data-testid="horizontal-done-date">recipeDate</p>
          <button
            type="button"
            data-testid="horizontal-share-btn"
            onClick={ () => handleCopyUrl() }
          >
            <img src={ shareIcon } alt="shareIcon" />
          </button>
          <span data-testid="horizontal-tag">tag</span>
        </div>
      )}

      {/* logica do favoriteRecipes */}
      {pathname === '/favorite-recipes' && favoriteRecipes && (
        <div>
          {favoriteRecipes.map((recipe, index) => (
            <div key={ recipe.id }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <div>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.alcoholicOrNot
                    ? recipe.alcoholicOrNot
                    : `${recipe.nationality} - ${recipe.category}`}

                </p>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                <button
                  type="button"
                  onClick={ () => {} }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="shareIcon"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => {} }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="blackHeartIcon"
                  />
                </button>
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
