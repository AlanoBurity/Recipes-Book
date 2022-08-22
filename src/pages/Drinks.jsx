import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesCard from '../components/RecipesCard';
import context from '../context/Context';

function Drinks(props) {
  const { location: { pathname } } = props;
  const { history } = props;
  const { apiCocktailData, searchBtn } = useContext(context);

  return (
    <>
      <Header titulo="Drinks" searchInput />
      { searchBtn && <SearchBar pathname={ pathname } history={ history } /> }
      <p>drinks</p>
      {apiCocktailData.drinks ? <RecipesCard /> : null}
      <Footer />
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
