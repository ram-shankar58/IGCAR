import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const Settings = () => {
  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Settings Page</Typography>
        <Typography variant="body1">This is the settings page.</Typography>
      </Box>
    </>
  );
};

export default Settings;
