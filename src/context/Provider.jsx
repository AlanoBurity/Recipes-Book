import PropTypes from 'prop-types';
import React, { useState } from 'react';
import context from './Context';

const Provider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchBtn, setSearchBtn] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [radioSearch, setRadioSearch] = useState('');
  const [apiMealData, setApiMealData] = useState({});
  const [apiCocktailData, setApiCocktailData] = useState({});
  const [copyText, setCopyText] = useState('');
  const [mealsCategorys, setMealscategorys] = useState({});
  const [drinksCategorys, setDrinksCategorys] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
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
    copyText,
    setCopyText,
    mealsCategorys,
    setMealscategorys,
    drinksCategorys,
    setDrinksCategorys,
    favoriteRecipes,
    setFavoriteRecipes,
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
