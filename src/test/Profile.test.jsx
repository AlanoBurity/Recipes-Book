import React from 'react';
import { screen, render } from '@testing-library/react';
import Profile from '../pages/Profile';
/* import renderWithRouter from './helper/renderWithRouter'; */

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
});
