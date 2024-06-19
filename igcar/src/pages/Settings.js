// src/pages/Settings.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../components/Layout';

const Settings = () => {
  return (
    <Layout>
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Account Settings
        </Typography>
        {/* Add content and functionality for settings here */}
      </Box>
    </Layout>
  );
};

export default Settings;
