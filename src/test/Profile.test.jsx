import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helper/renderWithRouter';

describe('Testing Profile Page', () => {
  it('test buttons on page', () => {
    render(<Profile />);

    const emailRender = screen.getByRole('heading');
    const bttnLogout = screen.getByRole('button', { name: /logout/i });
    const bttnFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    const bttnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });

    expect(bttnDoneRecipes).toBeInTheDocument();
    expect(bttnFavoriteRecipes).toBeInTheDocument();
    expect(bttnLogout).toBeInTheDocument();
    expect(emailRender).toBeInTheDocument();
  });
  it('test logout btn redirect do login page', () => {
    const { history } = renderWithRouter(<Profile />);
    const bttnLogout = screen.getByRole('button', { name: /logout/i });

    userEvent.click(bttnLogout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('test favorite recipes btn redirecto to favorite recipes ', () => {
    const { history } = renderWithRouter(<Profile />);
    const bttnFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });

    userEvent.click(bttnFavoriteRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('test done recipes btn redirect to done recipesS', () => {
    const { history } = renderWithRouter(<Profile />);
    const bttnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });

    userEvent.click(bttnDoneRecipes);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('test done recipes btn', () => {
  });
});
