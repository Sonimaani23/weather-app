import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [lastThreeCities, setLastThreeCities] = useState([]);
  const [para,setPara]=useState(" ")

  const handleInputChange = (event) => {
    setCity(event.target.value);
    setPara("")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const apiKey = '410bf721539fde59af6e32e023b857fc';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        setLastThreeCities(prevCities => [...prevCities.slice(-2), data.name]);
        if(!data.name)
        {
          //alert(" enter valied city name")

          setPara("Enter Valied City Name")
          
        }
        
        setCity('');
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={city} required onChange={handleInputChange} placeholder="Enter city name" />
        
        <button type="submit">Search</button>
<h1 id='warn'>{para}</h1>
      </form>
      {weatherData.name && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Sea Level: {weatherData.main.sea_level} hPa</p>
          <p>Ground Level: {weatherData.main.grnd_level} hPa</p>
        </div>
      )}
      {lastThreeCities.length > 0 && (
        <div>
          <h3>Last 3 cities searched:</h3>
          <ul>
            {lastThreeCities.map(city => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
