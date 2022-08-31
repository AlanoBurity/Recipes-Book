import React from 'react';
import { useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import context from '../context/Context';
import drinkIcon from '../images/drinkIcon.svg';
import FoodIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="drink icon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        src={ FoodIcon }
        onClick={ () => history.push('/foods') }
      >
        <img src={ FoodIcon } alt="drink icon" />
      </button>
    </footer>);
}

export default Footer;
