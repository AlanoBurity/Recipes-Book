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
  const [mealsCategorys, setMealscategorys] = useState({});
  const [drinksCategorys, setDrinksCategorys] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selected, setSelected] = useState('');
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
    mealsCategorys,
    setMealscategorys,
    drinksCategorys,
    setDrinksCategorys,
    favoriteRecipes,
    setFavoriteRecipes,
    selected,
    setSelected,
    doneRec,
    setDoneRec,
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
