const express = require('express');
const cors = require('cors');

const app = express();

const dataSource = require('./mockData.json');
const maxLength = dataSource.length - 1;

app.use(cors({ origin: '*' }));


//
app.get('/api/data', (req, res) => {

  const query = req.query;
  const { current = 0, pageSize = 10, searchText = '', searchType = '' } = query;

  console.log({ query });

  if (!searchText) {
    const cur = parseInt(current, 10);
    const size = parseInt(pageSize, 10);


    const data = dataSource.slice(parseInt(cur * size, 10), parseInt(cur * size + size, 10));

    console.log(dataSource.length, data.length);

    res.json({
      data: data,
      hasMore: cur * 10 + 10 < maxLength
    })

  } else {
    res.json(searchFoodCar({ searchText, searchType }, res));
  }

});

searchFoodCar = (args, res) => {
  const { searchType, searchText } = args;

  console.log({ searchType, searchText })


  const data = dataSource.filter(item => {

    const value = (item[searchType] || '').toLocaleLowerCase();

    return value.indexOf(searchText.toLocaleLowerCase()) > -1;
  })


  res.json({
    data,
    hasMore: false
  });
}


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
