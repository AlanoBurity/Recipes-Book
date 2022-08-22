import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesCard from '../components/RecipesCard';
import context from '../context/Context';

function Foods(props) {
  const {
    location: { pathname },
  } = props;
  const { history } = props;
  const { apiMealData, searchBtn } = useContext(context);
  return (
    <>
      <Header titulo="Foods" searchInput />
      { searchBtn && <SearchBar pathname={ pathname } history={ history } /> }
      <p>foods</p>
      {apiMealData.meals ? <RecipesCard /> : null}
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
