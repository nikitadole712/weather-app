import React, { useState } from 'react';
import '../src/App.css';
import wea from '../src/assets/wea.jpg';
import { UilCloudSun,UilLocationPoint } from '@iconscout/react-unicons'


const App = () => {
  const apiKey = '2c83063d5044f6182361fbe6323d77e9';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState('');
  const getWeather = (event) => {
    if (event.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        });
    }
  };
  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${wea})` }}
    >
      <div className="container">
        <input
          className="input"
          placeholder="Enter City..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        />
        <UilLocationPoint size={25} 
        className="location"/>

        {typeof weatherData.main === 'undefined' ? (
          <div>
            <p>
              Welcome to Weather App!Enter a city to get weather of.
            </p>
          </div>
              ) : (
          <div className="weather-data">
            <p className="city">{weatherData.name}</p>
            <UilCloudSun className="icon"/>
            <p className="temp">
              {Math.round(weatherData.main.temp)}°C
            </p>
            <p className="weather">{weatherData.weather[0].main}</p>
            <table>
              <tr>
                <td>Min/Max<p>{Math.round(weatherData.main.temp_min)}°C/{Math.round(weatherData.main.temp_max)}°C</p></td>
                <td>feels like<p>{Math.round(weatherData.main.feels_like)}°C</p></td>
                <td>Humidity<p>{Math.round(weatherData.main.humidity)}</p></td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
