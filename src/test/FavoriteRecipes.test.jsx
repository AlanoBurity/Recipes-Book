// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import React from 'react';
// import App from '../App';
// import renderWithRouter from './helper/renderWithRouter';

// const test2 = async () => {
//   await waitFor(() => expect(screen.getByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument());
// };

// const enterPage = async () => {
//   const { history } = renderWithRouter(<App />);
//   history.push('/favorite-recipes');
//   await test2();
//   return { history };
// };

// describe('favotieRecipes screen', () => {
//   test('filter buttons', async () => {
//     await enterPage();
//     const all = screen.getByRole('button', { name: /all/i });
//     const food = screen.getByRole('button', { name: /food/i });
//     const drinks = screen.getByRole('button', { name: /drinks/i });

//     userEvent.click(food);
//     userEvent.click(drinks);
//     userEvent.click(all);
//   });
// });
