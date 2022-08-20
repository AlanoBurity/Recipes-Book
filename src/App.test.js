import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Farewell, front-end', () => {
  render(<App />);
  const emailInput = screen.getByTestId('email-input');
  expect(emailInput).toBeInTheDocument();
});
