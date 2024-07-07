import React from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../layouts/Layout';
import DataTable from '../../components/DataTable'; // Import the DataTable component

const Notifications = () => {
  // Define the header array
  const headers = [
    {
      title: 'Notification',
      type: 'string',
      filter: true, // Enable filtering for this column
    },
    {
      title: 'Details',
      type: 'string',
      filter: false, // No filtering for this column
    },
  ];

  // Define the data array
  const data = [
    {
      Notification: 'New message received',
      Details: 'Received a new message from a client.',
    },
    {
      Notification: 'Project deadline approaching',
      Details: 'Reminder: Project XYZ deadline is approaching.',
    },
    {
      Notification: 'System maintenance schedule',
      Details: 'Scheduled maintenance on July 15th, 2024, at 10:00 PM.',
    },
  ];

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Notifications
        </Typography>
        <Typography variant="body1" gutterBottom>
          Stay informed with real-time updates about your account activities and important events in IGCAR.
        </Typography>
        <DataTable headers={headers} data={data} /> {/* Use the DataTable component */}
      </Box>
    </Layout>
  );
};

export default Notifications;
