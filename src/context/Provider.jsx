import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './Context';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipeDetailsData, setRecipeDetailsData] = useState({});
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [radioSearch, setRadioSearch] = useState('');
  const [apiMealData, setApiMealData] = useState({});
  const [apiCocktailData, setApiCocktailData] = useState({});
  const [mealsCategorys, setMealscategorys] = useState({});
  const [drinksCategorys, setDrinksCategorys] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [doneRec, setDoneRec] = useState([{
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [] }]);
  const [buttonRecipeDone, setButtonRecipeDone] = useState(true);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    recipeDetailsData,
    setRecipeDetailsData,
    searchBtn,
    setSearchBtn,
    searchName,
    setSearchName,
    radioSearch,
    setRadioSearch,
    setApiMealData,
    apiMealData,
    apiCocktailData,
    setApiCocktailData,
    mealsCategorys,
    setMealscategorys,
    drinksCategorys,
    setDrinksCategorys,
    favoriteRecipes,
    setFavoriteRecipes,
    doneRec,
    setDoneRec,
    buttonRecipeDone,
    setButtonRecipeDone,
  };
  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>);
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
