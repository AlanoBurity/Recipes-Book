import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import context from '../context/Context';
import fetchCocktailApi from '../services/fetchCocktailApi';
import fetchDrinksCategorys from '../services/fetchDrinksCategorys';

function Drinks(props) {
  const { location: { pathname } } = props;
  const { history } = props;
  const { apiCocktailData, setApiCocktailData, setDrinksCategorys } = useContext(context);

  useEffect(() => {
    const getDrinks = async () => {
      const drinksResponse = await fetchCocktailApi('', 's');
      setApiCocktailData(drinksResponse);
      const drinksCategorys = await fetchDrinksCategorys();
      setDrinksCategorys(drinksCategorys);
    };
    getDrinks();
  }, []);

  return (
    <>
      <SearchBar pathname={ pathname } history={ history } />
      <p>drinks</p>
      { apiCocktailData.drinks && <Recipes pathname={ pathname } history={ history } />}
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
