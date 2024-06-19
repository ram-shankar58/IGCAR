import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <Layout>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Avatar sx={{ width: 120, height: 120, mx: 'auto' }}>U</Avatar>
              <Typography variant="h6" align="center" gutterBottom>
                John Doe
              </Typography>
              <Typography variant="body1" align="center">
                Software Developer
              </Typography>
              <Typography variant="body2" align="center">
                Joined: January 2023
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: john.doe@example.com
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: +1 (123) 456-7890
              </Typography>
              <Typography variant="body1">
                Address: 123 Main St, Cityville, State, Country
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Layout>
  );
};

export default Profile;
