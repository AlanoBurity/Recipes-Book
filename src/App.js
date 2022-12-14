import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Provider from './context/Provider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress/RecipeInProgress';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/foods" exact component={ Foods } />
          <Route path="/drinks" exact component={ Drinks } />
          <Route path="/foods/:id" exact component={ RecipeDetails } />
          <Route path="/drinks/:id" exact component={ RecipeDetails } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/done-recipes" exact component={ DoneRecipes } />
          <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
          <Route path="/foods/:id/in-progress" component={ RecipeInProgress } exact />
          <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } exact />
          <Route path="/*" exact component={ NotFound } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
