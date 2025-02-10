import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  console.log('Home component rendered'); //debugging for unnecessary state updates
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError('Please enter a city name.');
      return;
    }
    
    if (isLoading) return;  //Debugging, this should stop the duplicate calls
    console.log(`handleSearch triggered for: ${query}`); //Debugging duplicate calls

    setError('');
    setIsLoading(true);  // Start loading

    try {
      navigate(`/weather/${query.trim()}`);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  return (
    <div>
      <h1>Welcome to the Weather App!</h1>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="city-input">Enter city name:</label>
          <input
            id="city-input"
            type="text"
            placeholder="e.g. New York"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby="city-help-text"
            autoComplete='off'
          />
        </div>
        <button type="submit" disabled={isLoading}>Search</button>
      </form>
      {isLoading && <div className="spinner"></div>}  {/* Show loading state */}
      {error && <div className="error">{error}</div>}  {/* Display error if exists */}
    </div>
  );
}

export default Home;