const fetchCocktailApi = async (search, radio) => {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${radio}=${search}`;
  if (radio === 'i') url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;

  try {
    const responseMeal = await fetch(url);
    const mealApi = await responseMeal.json();
    return mealApi;
  } catch (error) {
    console.log('erro', error);
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export default fetchCocktailApi;
