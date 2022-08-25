import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../context/Provider';

const renderWithRouter = (component, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return ({
    ...render(
      <Provider>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
  });
};
export default renderWithRouter;
