import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/History.css';
import { fetchSearchHistory } from '../services/weatherApi';

function History() {
  const [history, setHistory] = useState([]); // Local state for history
  const token = localStorage.getItem('token'); // Retrieve token

  useEffect(() => {
    const loadHistory = async () => {
      if (!token) {
        console.error('No token found, user must be logged in.');
        return;
      }
      
      try {
        const historyData = await fetchSearchHistory(token);
        setHistory(historyData || []); // Ensure historyData is an array to avoid undefined
      } catch (error) {
        console.error('Error fetching search history:', error);
      }
    };

    loadHistory();
  }, [token]); // Runs once when the component mounts

  return (
    <div className='history-page'>
      <h1>Search History</h1>
      {history.length > 0 ? (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <Link to={`/weather/${entry.city_name}`}>{entry.city_name}</Link> - {new Date(entry.searched_at).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your recent searches will show here!</p>
      )}
    </div>
  );
}

export default History;