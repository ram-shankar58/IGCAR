import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const Profile = () => {
  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Profile Page</Typography>
        <Typography variant="body1">This is the profile page.</Typography>
      </Box>
    </>
  );
};

export default Profile;
