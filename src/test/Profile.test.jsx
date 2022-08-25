import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import render from './helper/renderWithRouter';
import App from '../App';
import Profile from '../pages/Profile';

describe('Testing Profile Page', () => {
  it('test buttons on page', () => {
    render(<App />);

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

    const btnProfile = screen.getByRole('img', { name: /profile/i });

    userEvent.click(btnProfile);
    const emailRender = screen.getByTestId('profile-email');
    const bttnLogout = screen.getByRole('button', { name: /logout/i });
    const bttnFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    const bttnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    const bttnDrinks = screen.getByTestId('drinks-bottom-btn');
    const bttnFoods = screen.getByTestId('food-bottom-btn');

    expect(bttnDoneRecipes).toBeInTheDocument();
    expect(bttnFavoriteRecipes).toBeInTheDocument();
    expect(bttnLogout).toBeInTheDocument();
    expect(emailRender).toBeInTheDocument();
    expect(bttnDrinks).toBeInTheDocument();
    expect(bttnFoods).toBeInTheDocument();

    userEvent.click(bttnDoneRecipes);
  });

  it('test buttonss ons page', () => {
    render(<App />);

    const btnProfile = screen.getByRole('img', { name: /profile/i });

    userEvent.click(btnProfile);
    const bttnFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });

    expect(bttnFavoriteRecipes).toBeInTheDocument();

    userEvent.click(bttnFavoriteRecipes);
  });
  it('test buttons ons page', () => {
    render(<App />);

    const btnProfile = screen.getByRole('img', { name: /profile/i });

    userEvent.click(btnProfile);

    const bttnDrinks = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(bttnDrinks);
  });
  it('test buttons onsasdasdad page', () => {
    render(<App />);

    const btnProfile = screen.getByRole('img', { name: /profile/i });

    userEvent.click(btnProfile);

    const bttnLogout = screen.getByRole('button', { name: /logout/i });

    expect(bttnLogout).toBeInTheDocument();

    userEvent.click(bttnLogout);
  });
  it('test buttons onsdasdas page', () => {
    const { history } = render(<Profile />);

    expect(history.location.pathname).toBe('/');
  });
});
