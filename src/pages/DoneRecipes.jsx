import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function DoneRecipes(props) {
  const { location: { pathname } } = props;
  return (
    <div>
      <Header titulo="Done Recipes" searchInput={ false } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        {/* map do arquivo de receitas prontas requisito anterior */}
        <div>
          <HorizontalCard pathname={ pathname } />
        </div>
      </section>
    </div>
  );
}

DoneRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default DoneRecipes;
