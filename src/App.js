import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Provider from './context/Provider';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/foods" />
          <Route path="/drinks" />
          <Route path="foods/id:" />
          <Route path="drinks/id:" />
          <Route path="foods/id:/in-progress" />
          <Route path="drinks/id:/in-progress" />
          <Route path="profile" />
          <Route path="done-recipes" />
          <Route path="favorite-recipes" />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
