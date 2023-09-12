
const baseUrl = 'http://localhost:3000/api/data';

export function getFoodCarList(args) {

  const params = Object.assign({
    current: 0,
    pageSize: 10,
  }, args);


  const { current, pageSize } = params;

  const apiUrl = `${baseUrl}?current=${current}&pageSize=${pageSize}`

  return window.fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));

}

// 查询
export function searchFoodCar(args) {

  const { type, searchText } = args;

  const apiUrl = `${baseUrl}?searchText=${searchText}&searchType=${type}`

  return window.fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}