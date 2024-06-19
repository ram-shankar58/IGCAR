import React from 'react';
import { Box, Typography, Card, CardContent, Switch, FormGroup, FormControlLabel } from '@mui/material';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Settings = () => {
  const handleChange = (event) => {
    // Handle switch toggle logic
  };

  return (
    <Layout>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Account Settings
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Preferences
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={true} onChange={handleChange} />}
                label="Receive email notifications"
              />
              <FormControlLabel
                control={<Switch checked={false} onChange={handleChange} />}
                label="Enable two-factor authentication"
              />
            </FormGroup>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Layout>
  );
};

export default Settings;
