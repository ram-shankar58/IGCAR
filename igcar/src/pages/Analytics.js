import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const Analytics = () => {
  return (
    <>
      <Header />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Analytics
        </Typography>
        <Typography variant="body1">
          This is the analytics page. Here you will see various analytics data.
        </Typography>
      </Box>
    </>
  );
};

export default Analytics;
