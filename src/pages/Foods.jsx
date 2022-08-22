import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
  }),
  pathname: PropTypes.string,
  location: PropTypes.string,
}.isRequired;

export default Foods;
