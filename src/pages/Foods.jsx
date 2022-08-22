import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import RecipesCard from '../components/RecipesCard';
import context from '../context/Context';

function Foods(props) {
  const {
    location: { pathname },
  } = props;
  const { history } = props;
  const { apiMealData } = useContext(context);
  return (
    <>
      <SearchBar pathname={ pathname } history={ history } />
      <p>foods</p>
      {apiMealData.meals ? <RecipesCard /> : null}
      <Footer />
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
