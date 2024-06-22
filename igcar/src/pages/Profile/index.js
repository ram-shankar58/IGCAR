import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
import Layout from '../../layouts/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Profile = () => {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Profile
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Avatar sx={{ width: 120, height: 120, mx: 'auto' }}>U</Avatar>
              <Typography variant="h6" align="center" gutterBottom>
                Ram Shankar
              </Typography>
              <Typography variant="body1" align="center">
                Software Intern
              </Typography>
              <Typography variant="body2" align="center">
                Joined: June 2024
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Personal Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: ramshankar@ramshankar.com
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: +99 1234567890
              </Typography>
              <Typography variant="body1">
                Address: 4, Central Ave, Kalpakkam
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
