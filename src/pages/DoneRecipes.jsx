import React from 'react';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';

function DoneRecipes() {
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
          <HorizontalCard />
        </div>
      </section>
    </div>
  );
}

export default DoneRecipes;
