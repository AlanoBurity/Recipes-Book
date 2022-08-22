import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Provider from './context/Provider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profiles';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route path="/foods" exact component={ Foods } />
          <Route path="/drinks" exact component={ Drinks } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/done-recipes" exact component={ DoneRecipes } />
          <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
          <Route path="/foods/:id" exact />
          <Route path="/drinks/:id" exact />
          <Route path="/foods/:id/in-progress" exact />
          <Route path="/drinks/:id/in-progress" exact />
          <Route path="/" exact component={ Login } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
