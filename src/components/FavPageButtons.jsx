import React, { useState, useContext, useEffect } from 'react';
import context from '../context/Context';

function FavPageButtons() {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(context);
  const [origalFavs, setOriginalFavs] = useState([]);

  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (localFavs !== null) setFavoriteRecipes(localFavs);
    setOriginalFavs(localFavs);
    // eslint-disable-next-line
  }, []);

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
    </div>
  );
}

export default FavPageButtons;
