const fetchMealsFilterCategory = async (filter) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default fetchMealsFilterCategory;
