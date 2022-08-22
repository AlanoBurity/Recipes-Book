import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
