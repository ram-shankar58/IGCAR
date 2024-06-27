import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkBackendConnection } from '../../utils/APIRequest';

const ConnectionSnapped = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const retryConnection = async () => {
    setLoading(true);
    const connected = await checkBackendConnection();
    setLoading(false);
    if (connected) {
      navigate('/login');
    }
  };

  useEffect(() => {
    const interval = setInterval(retryConnection, 120000); // 2 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Connection Snapped
      </Typography>
      <br />
      <br />
      <Box sx={{ mb: 3 }}>
        <img src={require("../../static/serverconn.jpg")} alt="Server Connection Lost" style={{ width: '50%', maxWidth: '400px' }} />
      </Box>
      <Typography variant="body1">
        It seems we are having trouble connecting to the server. Please{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); retryConnection(); }}>try again later</a>.
      </Typography>
      {loading && (
        <Box sx={{ mt: 2 }}>
          <CircularProgress />
          <Typography variant="body2">Attempting to reconnect...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default ConnectionSnapped;
