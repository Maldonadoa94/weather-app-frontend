import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Favorites.css';
import { fetchFavorites, removeFavorite } from '../services/weatherApi';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');  //retreive jwt token

  useEffect(() => {
    const loadFavorites = async () => {
      if (!token) return; //prevent API call if no token

      try {
        const data = await fetchFavorites(token);
        setFavorites(data);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, [token]);

  const handleRemoveFavorite = async (city) => {
    if (!token) return; //prevent API call if no token

    try {
      await removeFavorite(city, token);
      setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.city_name !== city));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="favorites-page">
      <h1>Your Favorite Cities</h1>
      {favorites.length === 0 ? (
        <p>Your favorites will be added here!</p>
      ) : (
        <ul>
          {favorites.map((fav, index) => (
            <li key={index}>
              <Link to={`/weather/${fav.city_name}`}>{fav.city_name}</Link>
              <button onClick={() => handleRemoveFavorite(fav.city_name)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;