import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WeatherPage from './components/WeatherPage';
import Errors from './components/Errors';
import Navbar from './components/NavBar';
import History from './components/History';
import Favorites from './components/Favorites';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Errors>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/weather/:city" element={<ProtectedRoute element={<WeatherPage />} />} />
            <Route path="/history" element={<ProtectedRoute element={<History />} />} />
            <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} />
          </Routes>
        </Errors>
      </div>
    </Router>
  );
}

export default App;
