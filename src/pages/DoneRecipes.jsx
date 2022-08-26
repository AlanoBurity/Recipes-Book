import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';
import context from '../context/Context';

function DoneRecipes(props) {
  const { location: { pathname } } = props;
  const { doneRec, setDoneRec } = useContext(context);

  const doneRecipesMock = [{
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
  ];
  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock)); // retirar quando der merge
    const recipeslocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipeslocal !== null) setDoneRec(recipeslocal);
  }, []);

  const handleAllFilter = () => setDoneRec(doneRecipesMock);
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
      <Header titulo="Done Recipes" searchInput={ false } />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleAllFilter }
        >
          All
        </button>
        <button
          onClick={ hanfleFoodFilter }
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          onClick={ handleDrinksFilter }
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
