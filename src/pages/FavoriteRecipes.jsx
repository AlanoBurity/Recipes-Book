import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import HorizontalCard from '../components/HorizontalCard';
import FavPageButtons from '../components/FavPageButtons';
import './FavoriteRecipes.css';

function FavoriteRecipes(props) {
  const { location: { pathname } } = props;

  return (
    <>
      <Header searchInput={ false } className="heade" />
      <FavPageButtons />
      <h1 className="titlePage">Favorite Recipes</h1>
      <HorizontalCard pathname={ pathname } />
    </>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipes;
