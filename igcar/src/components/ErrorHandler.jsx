import React, { useEffect, useState } from 'react';
import { fetchErrorData } from '../utils/APIRequest';

const ErrorHandler = ({ errorCode }) => {
  const [errorData, setErrorData] = useState(null);

  useEffect(() => {
    const getErrorData = async () => {
      try {
        const errors = await fetchErrorData();
        const error = errors.find(error => error.errorCode === errorCode);
        setErrorData(error);
      } catch (error) {
        console.error('Error handling error:', error);
        // Handle error fetching error data or other conditions
      }
    };

    getErrorData();
  }, [errorCode]);

  if (!errorData) {
    return null; // Optionally render a loading state or fallback
  }

  return (
    <div>
      <h1>{errorData.errorMessage}</h1>
      <p>{/* Additional error details or instructions */}</p>
    </div>
  );
};

export default ErrorHandler;
