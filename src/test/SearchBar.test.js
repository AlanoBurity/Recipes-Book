import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';
import oneMeal from '../../cypress/mocks/oneMeal';

describe('SearchBar component', () => {
  test('food page', async () => {
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

    const search = screen.getByRole('img', { name: /search/i });
    userEvent.click(search);

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

  test('food page empty response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(emptyMeals),
    }));

    await act(async () => {
      renderWithRouter(<App />);
    });
    const search = screen.getByRole('img', { name: /search/i });
    userEvent.click(search);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    global.fetch.mockRestore();
  });

  test('food page one response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    }));

    await act(async () => {
      renderWithRouter(<App />);
    });
    const search = screen.getByRole('img', { name: /search/i });
    userEvent.click(search);

    const searchInput = screen.getByRole('textbox');
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    global.fetch.mockRestore();
  });

  test('drink page', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(cocktailDrinks),
    }));

    await act(async () => {
      renderWithRouter(<App />);
    });
    const drinksPage = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksPage);

    const search = screen.getByRole('img', { name: /search/i });
    userEvent.click(search);

    const searchInput = screen.getByRole('textbox');
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(screen.getByText(/drinks/i)).toBeInTheDocument();
    global.fetch.mockRestore();
  });

  test('drink page empyt response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: null }),
    }));

    await act(async () => {
      renderWithRouter(<App />);
    });

    const search = screen.getByRole('img', { name: /search/i });
    userEvent.click(search);

    const searchInput = screen.getByRole('textbox');
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'xablau');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);

    global.fetch.mockRestore();
  });
});
