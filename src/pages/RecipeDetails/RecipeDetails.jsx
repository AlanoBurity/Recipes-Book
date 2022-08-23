import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const { location } = history;
  const { pathname } = location;
  const [data, setData] = useState();
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
      const info = await fetch(url).then((response) => response.json());
      setData(info);
      setIsLoading(false);
    };
    fetchById(endPoint);
  }, []);

  const rederFoodDetails = () => {
    const { strMeal, strMealThumb, strCategory } = data.meals[0];
    console.log(data.meals[0]);
    const regex = /strIngredient\d/gi;
    return (
      <div>
        <Image
          src={ strMealThumb }
          alt={ strMeal }
          roundedCircle
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
        <h2>Ingredients</h2>
        <ul>
          {
            Object.keys(data.meals[0])
              .filter((key) => key.match(regex))
              .map((ingrediente) => {
                let retorno;
                if (data.meals[0][ingrediente] !== null
                  && data.meals[0][ingrediente].length > 0) {
                  retorno = <li>{data.meals[0][ingrediente]}</li>;
                }
                return retorno;
              })
          }
        </ul>
      </div>
    );
  };
  const renderDrinkDetails = () => {

  };

  const rederRecipeDetails = () => {
    if (isFood) return rederFoodDetails();
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
