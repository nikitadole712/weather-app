import React, { useState } from 'react';
import '../src/App.css';
import image from '../src/assets/image.svg';

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
      className="app text-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="d-flex justify-content-center">
        <input
          className="form-control m-5 f-s w-25 shadow"
          placeholder="Enter City..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
        />
      </div>
      {typeof weatherData.main !== 'undefined' && (
        <div
          className="card rounded mx-auto w-50 h-50 shadow bg-opacity-10"
          style={{ backgroundColor: 'rgba(250, 250, 250, 0.1)' }}
        >
          <div className="card-body">
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                class="img-fluid"
                alt="..."
              />
              <h5 className="card-title">
                {weatherData.weather[0].main}
              </h5>
            </div>
            <div>
              {weatherData.name}, {weatherData.sys.country}
            </div>
            <div className="mt-4">
              <h1>{Math.round(weatherData.main.temp)}°C</h1>
            </div>

            <div className="d-flex justify-content-around">
              <div className="p-2">
                <h6>Min/Max</h6>
                <div>
                  {Math.round(weatherData.main.temp_min)}°C/
                  {Math.round(weatherData.main.temp_max)}°C
                </div>
              </div>

              <div className="p-2">
                <h6>Pressure</h6>
                <div>{Math.round(weatherData.main.pressure)}</div>
              </div>

              <div className="p-2">
                <h6>Humidity</h6>
                <div>{Math.round(weatherData.main.humidity)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
