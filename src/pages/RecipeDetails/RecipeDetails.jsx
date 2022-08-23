import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import context from '../../context/Context';
import FoodRecipeDetails from './FoodRecipeDetails';

function RecipeDetails() {
  const { setRecipeDetailsData } = useContext(context);
  const history = useHistory();
  const { id } = useParams();
  const { location } = history;
  const { pathname } = location;
  const [isFood, setIsFood] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let endPoint = '';
    if (pathname.includes('drinks')) {
      endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      setIsFood(false);
    } else if (pathname.includes('foods')) {
      endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      setIsFood(true);
    }

    const fetchById = async (url) => {
      const data = await fetch(url).then((response) => response.json());
      setRecipeDetailsData(data);
      setIsLoading(false);
    };
    fetchById(endPoint);
  }, []);

  const rederRecipeDetails = () => {
    if (isFood) return <FoodRecipeDetails />;
    return renderDrinkDetails();
  };

  return (
    <section>
      {
        isLoading ? 'carregando' : rederRecipeDetails()
      }
    </section>
  );
}

export default RecipeDetails;
