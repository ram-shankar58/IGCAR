import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Analytics = () => {
  return (
    <Layout>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Analytics
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Website Traffic Analysis
            </Typography>
            <Typography variant="body1" gutterBottom>
              Track your website's traffic metrics including visitors, page views, and bounce rate.
            </Typography>
            <Typography variant="body2">
              Analyze trends over time and make data-driven decisions to optimize user engagement.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Layout>
  );
};

export default Analytics;
