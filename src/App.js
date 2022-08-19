import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Provider from './context/Provider';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" />
          <Route exact path="/drinks" />
          <Route exact path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />
          <Route exact path="/foods/:id/in-progress" />
          <Route exact path="/drinks/:id/in-progress" />
          <Route exact path="/profile" />
          <Route exact path="/done-recipes" />
          <Route exact path="/favorite-recipes" />
          <Route path="/*" component={ NotFound } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
