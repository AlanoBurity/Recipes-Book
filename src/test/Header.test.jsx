import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import beefMeals from '../../cypress/mocks/beefMeals';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('recipes component', () => {
  test('food page recipes', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonSubmit = screen.getByTestId('login-submit-btn');
    const emailTest = 'email@test.com';
    const passwordTest = '1231231';

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(buttonSubmit);

    const profileBtn = screen.getByTestId('profile');

    userEvent.click(profileBtn);

    global.fetch.mockRestore();
  });
});
