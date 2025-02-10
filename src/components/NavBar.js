import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect user to login page
  };

  return (
    <nav>
      <div className="logo">
        <h1>WeatherApp</h1>
      </div>
      <div className="menu">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          {isAuthenticated && (
            <>
              <li><NavLink to="/history">Search History</NavLink></li>
              <li><NavLink to="/favorites">Favorites</NavLink></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li><NavLink to="/signup">Signup</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

