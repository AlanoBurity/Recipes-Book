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
      <Header titulo="Favorite Recipes" searchInput={ false } className="heade" />
      <FavPageButtons />
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
