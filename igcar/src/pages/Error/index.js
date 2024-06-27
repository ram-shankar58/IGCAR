import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const ErrorPage = () => {
  const { code } = useParams();

  const errorMessages = {
    '404': 'Page not found!',
    '500': 'Internal Server Error',
    '503': 'Connection with server lost',
    'connection-lost': 'Connection with the server is lost. Please check your internet connection.',
  };

  const errorMessage = errorMessages[code] || 'An unexpected error occurred.';

  return (
    <Container maxWidth="sm" style={{ marginTop: '5rem' }}>
      <Typography variant="h4" gutterBottom>
        Error {code}
      </Typography>
      <Typography variant="body1">
        {errorMessage}
      </Typography>
    </Container>
  );
};

export default ErrorPage;
