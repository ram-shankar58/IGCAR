import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const Notifications = () => {
  return (
    <>
      <Header />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1">
          This is the notifications page. Here you will see all your notifications.
        </Typography>
      </Box>
    </>
  );
};

export default Notifications;
