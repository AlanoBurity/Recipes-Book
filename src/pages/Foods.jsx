import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import context from '../context/Context';
import fetchMealApi from '../services/fetchMealApi';
import fetchMealsCategorys from '../services/fetchMealsCategorys';

function Foods(props) {
  const {
    location: { pathname },
  } = props;
  const { history } = props;
  const { apiMealData, setApiMealData, setMealscategorys } = useContext(context);

  useEffect(() => {
    const getMeal = async () => {
      const mealsResponse = await fetchMealApi('', 's');
      setApiMealData(mealsResponse);
      const mealsCategorys = await fetchMealsCategorys();
      setMealscategorys(mealsCategorys);
    };
    getMeal();
  }, []);

  return (
    <>
      <SearchBar pathname={ pathname } history={ history } />
      <p>foods</p>
      { apiMealData.meals && <Recipes pathname={ pathname } history={ history } />}

      {/* retirar botao usado no teste do SearchBar */}
      <button
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        type="button"
      >
        Drinks Page
      </button>
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Foods;
