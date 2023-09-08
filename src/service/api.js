import mockData from '../module/mockData';

const maxLength = mockData.length - 1;

// mock feeds list

export function getFoodCarList(args) {

  const params = Object.assign({
    current: 0,
    pageSize: 10,
  }, args);


  const { current, pageSize } = params;


  const dataList = mockData.slice(current * pageSize, current * pageSize + pageSize);

  return Promise.resolve({
    dataList,
    hasMore: current * 10 + 10 < maxLength
  });
}

// 查询 模拟
export function searchFoodCar(args) {

  const { type, searchText } = args;

  const dataList = mockData.filter(item => {

    const value = (item[type] || '').toLocaleLowerCase();

    return value.indexOf(searchText.toLocaleLowerCase()) > -1;
  })


  return Promise.resolve({
    dataList,
    hasMore: false
  });

}