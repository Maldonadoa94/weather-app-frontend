import React from 'react';
import '../styles/WeatherCard.css';

// Displays fetched weather and forecast data, gives user option to add card to favorite cities
function WeatherCard({ weatherData, onFavoriteToggle, isFavorite }) {
  if (!weatherData) return null;

  const { current, forecast } = weatherData;  // Extract current and forecast data

  
  const getDayForecast = () => {
    // Get forecast for the next 6 hours or less
    const forecastData = forecast.slice(0, 6).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: item.main.temp,
      description: item.weather[0].description,
    }));

    return forecastData;
  };

  return (
    <div className="weather-card">
      <h2>{current.name}, {current.sys.country}</h2>
      <p>{current.weather[0].description}</p>
      <div className="weather-info">
        <p><strong>Temperature:</strong> {current.main.temp}°C</p>
        <p><strong>Humidity:</strong> {current.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {current.wind.speed} m/s</p>

        {/* Forecast for the rest of the day */}
        <div className="forecast">
          <h3>Forecast for the rest of the day</h3>
          {getDayForecast().map((hour, index) => (
            <p key={index}>
              <strong>{hour.time}</strong>: {hour.temp}°C, {hour.description}
            </p>
          ))}
        </div>
      </div>
      <button onClick={onFavoriteToggle}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default WeatherCard;