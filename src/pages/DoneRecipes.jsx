import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';
import context from '../context/Context';
import './DoneRecipes.css';

function DoneRecipes(props) {
  const { location: { pathname } } = props;
  const { doneRec, setDoneRec } = useContext(context);

  useEffect(() => {
    const recipeslocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipeslocal !== null) setDoneRec(recipeslocal);
    // eslint-disable-next-line
  }, []);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleAllFilter = () => setDoneRec(doneRecipes);
  const hanfleFoodFilter = () => {
    const foods = doneRec.filter(({ type }) => type === 'food');
    setDoneRec(foods);
  };
  const handleDrinksFilter = () => {
    const drinks = doneRec.filter(({ type }) => type === 'drink');
    setDoneRec(drinks);
  };

  return (
    <div>
      <Header searchInput={ false } />
      <section>
        <div className="buttnsDoneRecipes">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ handleAllFilter }
            className="olar"
          >
            All
          </button>
          <button
            onClick={ hanfleFoodFilter }
            type="button"
            data-testid="filter-by-food-btn"
            className="olar"
          >
            Food
          </button>
          <button
            onClick={ handleDrinksFilter }
            type="button"
            className="olar"
          >
            Drinks
          </button>
        </div>
        <h1 className="doneRecipesTitle">Done Recipes</h1>

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
