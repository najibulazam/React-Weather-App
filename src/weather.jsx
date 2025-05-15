import { useState, useRef, useEffect } from 'react';
import search_icon from './assets/search.svg';
import humidy_icon from './assets/humidity.svg';
import wind_icon from './assets/wind.svg';
import './weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef(null);

  const getWeatherData = async (city) => {
    if (city.trim() === '') {
      setWeatherData(null);
      alert('Please enter a city');
      return;
    }

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        location: data.location.name,
        country: data.location.country,
        condition: data.current.condition.text,
        condition_icon: data.current.condition.icon,
        temperature: data.current.temp_c,
        feels_like: data.current.feelslike_c,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data.");
    }
  };

  useEffect(() => {
    getWeatherData('Dhaka');
  }, []);

  return (
    <div className="weather">
      {/* Search Box */}
      <div className="search-bar">
        <input type="text" placeholder="Search a city name" ref={inputRef} />
        <img
          src={search_icon}
          alt="search icon"
          onClick={() => getWeatherData(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img
            src={weatherData.condition_icon}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">
            {weatherData.location}, {weatherData.country}
          </p>
          <p className="condition">{weatherData.condition}</p>
          <p className="feels-like">Feels like {weatherData.feels_like} °C</p>

          <div className="weather-data">
            {/* Humidity */}
            <div className="col">
              <img src={humidy_icon} alt="humidity" width="37px" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            {/* Wind */}
            <div className="col">
              <img src={wind_icon} alt="wind" width="36px" />
              <div>
                <p>{weatherData.wind} KM/H</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="info-msg">Enter a city to get the weather</p>
      )}
    </div>
  );
};

export default Weather;
