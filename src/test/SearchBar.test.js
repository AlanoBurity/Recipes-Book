import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';

describe('SearchBar component', () => {
  test('I am your test', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mealsByIngredient),
    }));
    await act(async () => {
      renderWithRouter(<App />);
    });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonSubmit = screen.getByTestId('login-submit-btn');
    const emailTest = 'email@test.com';
    const passwordTest = '1231231';

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(buttonSubmit);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const firstRadio = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    userEvent.click(firstRadio);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(searchBtn);

    global.fetch.mockRestore();
  });
});
