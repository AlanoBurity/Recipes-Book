const fetchMealsCategorys = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default fetchMealsCategorys;
