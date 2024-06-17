import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const Reports = () => {
  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Reports Page</Typography>
        <Typography variant="body1">This is the reports page.</Typography>
      </Box>
    </>
  );
};

export default Reports;
