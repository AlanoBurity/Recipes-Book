import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import beefMeals from '../../cypress/mocks/beefMeals';
import renderWithRouter from './helper/renderWithRouter';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

describe('recipes component', () => {
  test('food page recipes', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));

    renderWithRouter(<App />, ['/foods']);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonSubmit = screen.getByTestId('login-submit-btn');
    const emailTest = 'email@test.com';
    const passwordTest = '1231231';

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(buttonSubmit);

    const all = await screen.findByTestId('All-category-filter');
    const allbtn = await screen.findAllByRole('button');

    userEvent.click(allbtn[4]);

    userEvent.click(all);

    global.fetch.mockRestore();
  });
});

describe('recipes drinks page', () => {
  test('drink page', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(cocktailDrinks),
    }));

    renderWithRouter(<App />);

    const drinksPage = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksPage);

    const all = await screen.findByTestId('All-category-filter');
    const allbtn = await screen.findAllByRole('button');

    userEvent.click(allbtn[4]);

    userEvent.click(all);

    userEvent.click(allbtn[9]);

    global.fetch.mockRestore();
  });
});
