import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();
  const { location } = history;
  const { pathname } = location;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let endPoint = '';
    if (pathname.includes('drinks')) endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    else if (pathname.includes('foods')) endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    const fetchById = async (url) => {
      const info = await fetch(url).then((response) => response.json());
      setData(info);
      setIsLoading(false);
    };
    fetchById(endPoint);
  }, []);
  return (
    <section>
      {
        isLoading ? 'carregando' : JSON.stringify(data.meals[0])
      }
    </section>
  );
}

export default RecipeDetails;
