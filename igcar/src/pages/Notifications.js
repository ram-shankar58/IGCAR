import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Notifications = () => {
  return (
    <Layout>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1" gutterBottom>
          Stay informed with real-time updates about your account activities and important events.
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="New message received" secondary="Received a new message from a client." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Project deadline approaching" secondary="Reminder: Project XYZ deadline is approaching." />
          </ListItem>
          <ListItem>
            <ListItemText primary="System maintenance schedule" secondary="Scheduled maintenance on July 15th, 2024, at 10:00 PM." />
          </ListItem>
        </List>
      </Box>
      <Footer />
    </Layout>
  );
};

export default Notifications;
