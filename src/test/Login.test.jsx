import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

test('I am your test', () => {
  renderWithRouter(<App />);

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const buttonSubmit = screen.getByTestId('login-submit-btn');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(buttonSubmit).toBeInTheDocument();

  const emailTest = 'email@test.com';
  const passwordTest = '1231231';

  userEvent.type(emailInput, emailTest);
  userEvent.type(passwordInput, passwordTest);

  userEvent.click(buttonSubmit);
});
