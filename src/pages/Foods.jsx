import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
  const {
    apiMealData,
    setApiMealData,
    setMealscategorys,
    searchBtn,
  } = useContext(context);

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
      <Header titulo="Foods" searchInput />
      {searchBtn && <SearchBar pathname={ pathname } history={ history } />}
      <p>foods</p>
      {apiMealData.meals && <Recipes pathname={ pathname } history={ history } />}
      <Footer />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  pathname: PropTypes.string,
  location: PropTypes.string,
}.isRequired;

export default Foods;
