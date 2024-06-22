import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Layout from '../../layouts/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Analytics = () => {
  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Analytics
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Research Analysis
            </Typography>
            <Typography variant="body1" gutterBottom>
              Analysis of all Research publications, and plant reports
            </Typography>
            <Typography variant="body2">
              Analyze the historical data using in built search to get relevent publications and repor5ts.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Layout>
  );
};

export default Analytics;
