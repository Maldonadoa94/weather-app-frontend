import React, { useState, useEffect } from 'react';
import '../styles/Errors.css';

function Errors({ children }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const errorHandler = (event) => {
      setHasError(true);
      setErrorMessage(event.reason?.message || 'An unexpected error occurred.');
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, []);

  const handleReload = () => {
    setHasError(false);
    setErrorMessage('');
    window.location.reload();
  };

  if (hasError) {
    return (
      <div className="error-container">
        <h2>Something went wrong...</h2>
        <p>{errorMessage}</p>
        <button onClick={handleReload} className="reload-btn">
          Try Again
        </button>
      </div>
    );
  }

  return children;
}

export default Errors;
