import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

//GET api weather and forecast data
export const fetchWeather = async (city, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather/${city}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return await response.data;

  } catch (error) {
    console.error('Error fetching weather data: ', error.response?.data || error.message);
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

//Get search history data
export const fetchSearchHistory = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    //return search history
    return response.data;

  } catch (error) {
    console.error('Error fetching search history:', error.response?.data || error.message);
    return [];
  }
};

/*
 * Backend calls to fetch, add, and remove favorite searches
 */
export const fetchFavorites = async (token) => {
  try {
      const response = await axios.get(`${BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return response.data;
  } catch (error) {
      console.error('Error fetching favorites:', error.response?.data || error.message);
      return [];
  }
};

export const addFavorite = async (city, token) => {
  try {
      const response = await axios.post(`${BASE_URL}/favorites`, { city }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
  } catch (error) {
      console.error('Error adding favorite:', error.response?.data || error.message);
      throw new Error('Failed to add favorite.');
  }
};

export const removeFavorite = async (city, token) => {
  try {
      const response = await axios.delete(`${BASE_URL}/favorites/${city}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
  } catch (error) {
      console.error('Error removing favorite:', error.response?.data || error.message);
      throw new Error('Failed to remove favorite.');
  }
};
