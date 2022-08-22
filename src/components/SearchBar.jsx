import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../context/Context';
import fetchCocktailApi from '../services/fetchCocktailApi';
import fetchMealApi from '../services/fetchMealApi';

function SearchBar(props) {
  const {
    searchName,
    radioSearch,
    setSearchName,
    setRadioSearch,
    setApiMealData,
    setApiCocktailData,
  } = useContext(context);

  const handleSearchName = ({ target: { value } }) => setSearchName(value);

  const handleRadio = ({ target: { value } }) => setRadioSearch(value);

  const notFound = () => {
    setSearchName('');
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  };

  const foodPage = async () => {
    const { pathname } = props;
    const { history } = props;
    if (pathname === '/foods') {
      const meals = await fetchMealApi(searchName, radioSearch);
      if (meals === undefined || meals.meals === null) {
        notFound();
        return;
      }
      if (meals === undefined) return;
      setApiMealData(meals);
      setSearchName('');
      const { idMeal } = meals.meals[0];
      const path = `/foods/${idMeal}`;
      if (meals.meals.length === 1) history.push(path);
    }
  };

  const drinkPage = async () => {
    const { pathname } = props;
    const { history } = props;
    if (pathname === '/drinks') {
      const cocktails = await fetchCocktailApi(searchName, radioSearch);
      if (cocktails === undefined || cocktails.drinks === null) {
        notFound();
        return;
      }
      setApiCocktailData(cocktails);
      setSearchName('');
      const { idDrink } = cocktails.drinks[0];
      const path = `/drinks/${idDrink}`;
      if (cocktails.drinks.length === 1) history.push(path);
    }
  };

  const handleSearch = () => {
    if (radioSearch === 'f' && searchName.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    foodPage();
    drinkPage();
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        value={ searchName }
        onChange={ handleSearchName }
      />

      <label htmlFor="ingredient">
        Ingredient
        <input
          id="ingredient"
          name="search-type"
          data-testid="ingredient-search-radio"
          type="radio"
          value="i"
          onChange={ handleRadio }
        />
      </label>

      <label htmlFor="name">
        Name
        <input
          id="name"
          name="search-type"
          data-testid="name-search-radio"
          type="radio"
          value="s"
          onChange={ handleRadio }
        />
      </label>

      <label htmlFor="first-letter">
        First Letter
        <input
          id="first-letter"
          name="search-type"
          data-testid="first-letter-search-radio"
          type="radio"
          value="f"
          onChange={ handleRadio }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search Filter
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default SearchBar;
