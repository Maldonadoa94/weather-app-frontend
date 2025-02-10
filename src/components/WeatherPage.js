import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { fetchWeather, fetchFavorites, addFavorite, removeFavorite } from '../services/weatherApi';
import WeatherCard from './WeatherCard';

function WeatherPage() {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the JWT token
    if (!token) {
      setError('You must be logged in to view weather details.');
      setLoading(false);
      return;
    }
    
    const fetchWeatherData = async () => {
      try {
        const data = await fetchWeather(city, token);
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data.');
        setLoading(false);
      }
    };

    // load favorites in database from backend
    const loadFavorites = async () => {
      try {
        const data = await fetchFavorites(token);
        setFavorites(data.map(fav => fav.city_name)); // Extract city names from API response
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    fetchWeatherData();
    loadFavorites();
  }, [city]);

  // add and remove favorites based on button click
  const handleFavoriteToggle = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to modify favorites.');
      return;
    }
    
    try {
      if (favorites.includes(city)) {
        await removeFavorite(city, token);
        setFavorites((prev) => prev.filter(fav => fav !== city));
      } else {
        await addFavorite(city, token);
        setFavorites((prev) => [...prev, city]);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="weather-page">
      <h1>Weather in {city}</h1>
      <WeatherCard
        weatherData={weatherData}
        isFavorite={favorites.includes(city)}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </div>
  );
}

export default WeatherPage;