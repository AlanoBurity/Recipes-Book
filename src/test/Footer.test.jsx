import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Footer from '../components/Footer';
import App from '../App';

describe('Testing Profile Page', () => {
  test('I am your test', () => {
    renderWithRouter(<Footer />);

    const footerComponent = screen.getByTestId('footer');
    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    const buttonFoods = screen.getByTestId('food-bottom-btn');
    expect(footerComponent).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonFoods).toBeInTheDocument();

    userEvent.click(buttonFoods);
  });

  test('I am your test', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
  });
});
