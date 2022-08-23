import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';
import context from '../context/Context';

function FavoriteRecipes(props) {
  const { location: { pathname } } = props;
  const { favoriteRecipes, setFavoriteRecipes } = useContext(context);
  const [origalFavs, setOriginalFavs] = useState([]);

  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null) setFavoriteRecipes(localFavs);
    setOriginalFavs(localFavs);
  }, []);

  console.log(origalFavs);

  const handleAllFavFilter = () => setFavoriteRecipes(origalFavs);

  const hanfleFoodFavs = () => {
    const foods = favoriteRecipes.filter(({ type }) => type === 'food');
    setFavoriteRecipes(foods);
  };

  const handleDrinksFacs = () => {
    const drinks = favoriteRecipes.filter(({ type }) => type === 'drink');
    setFavoriteRecipes(drinks);
  };
  return (
    <>
      <Header titulo="Favorite Recipes" searchInput={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleAllFavFilter }
        >
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ hanfleFoodFavs }
        >
          Food
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleDrinksFacs }
        >
          Drinks
        </button>

        <HorizontalCard pathname={ pathname } />
      </div>
    </>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipes;
