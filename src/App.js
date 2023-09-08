import { useState, useEffect } from 'react';
import { getFoodCarList, searchFoodCar } from './service/api'

import carIcon from './car.png'
import './App.css';

const options = ['Address', 'Applicant', 'FoodItems'];

function App() {

  const [current, setCurrent] = useState(0); // 
  const [type, setType] = useState(options[0]); // 

  const [hasMore, setHasMore] = useState(0);
  const [dataList, setDataList] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);


  async function getData(params) {
    const data = await getFoodCarList(params);
    setDataList(dataList.concat(data.dataList));
    setHasMore(data.hasMore);
  }


  useEffect(() => {
    getData({ current });
  }, [current]);


  const handleSearch = async (event) => {
    event.preventDefault();
    const searchText = event.target.search.value;
    const data = await searchFoodCar({ type, searchText });

    setDataList(data.dataList);
    setHasMore(false);

  };

  const openCarDetails = (card) => {
    setSelectedCard(card);
  };

  const closeCarDetails = () => {
    setSelectedCard(null);
  };

  return (
    <div className="app">
      <div className='search-bar'>

        <h1>Welcome to Food Car</h1>
        <form onSubmit={handleSearch}>
          <input type="text" name="search" autoComplete='off' placeholder={`type '${type}' to get result`} />

          <select onChange={(e) => {
            setType(e.target.value)
          }}>
            {options.map(item => (<option key={item} value={item}>{item}</option>))}
          </select>
          <button type="submit">Find Food Car</button>
        </form>
      </div>
      <div className='search-bar-hold'></div>


      <div className="card-container">
        {dataList.map((card, index) => (
          <div className="card" key={index} >
            <img className='card-icon' src={card.icon || carIcon} alt={card.Applicant} />
            <h3>{card.Applicant}</h3>
            <p>Facility Id: {card.locationid}</p>
            <p>{card.LocationDescription}</p>
            <button onClick={() => openCarDetails(card)}>view more</button>
          </div>
        ))}
      </div>

      {hasMore ? <div className='load-more' onClick={() => setCurrent(current + 1)}>
        load more data
      </div> : <div>--- no more data ---</div>}


      {selectedCard && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeCarDetails}>
              &times;
            </button>
            <img className='card-icon' src={selectedCard.icon || carIcon} alt={selectedCard.Applicant} />
            <p>FoodItems: {selectedCard.FoodItems}</p>
            <p>Applicant: {selectedCard.Applicant}</p>
            <p>Locationid: {selectedCard.locationid}</p>
            <p>LocationDescription: {selectedCard.LocationDescription}</p>
            <p>Approved: {selectedCard.Approved}</p>
            <p><a href={selectedCard.Schedule}>Schedule </a></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
