import React, { useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import './Home.css'; // Import custom CSS for additional styling

const data = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 2210, amt: 2290 },
  { name: 'Mar', uv: 200, pv: 2290, amt: 2000 },
  { name: 'Apr', uv: 278, pv: 2000, amt: 2181 },
  { name: 'May', uv: 189, pv: 2181, amt: 2500 },
  { name: 'Jun', uv: 239, pv: 2500, amt: 2100 },
  { name: 'Jul', uv: 349, pv: 2100, amt: 2100 },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      const confirmResubmission = window.confirm("Confirm resubmission of data?");
      if (confirmResubmission) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    let timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem('user');
        navigate('/login');
      }, 10 * 60 * 1000); // 10 minutes
    };

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimeout(); // Initialize the timeout

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [navigate]);

  return (
    <>
      <Header />
      <Box className="home-background" sx={{ padding: '2rem' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="colorful-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Sales Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="colorful-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  User Statistics
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="colorful-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Quick Links
                </Typography>
                <MuiLink component={Link} to="/profile" className="quick-link">
                  Go to Profile
                </MuiLink>
                <MuiLink component={Link} to="/settings" className="quick-link">
                  Account Settings
                </MuiLink>
                <MuiLink component={Link} to="/reports" className="quick-link">
                  View Reports
                </MuiLink>
                <MuiLink component={Link} to="/notifications" className="quick-link">
                  Notifications
                </MuiLink>
                <MuiLink component={Link} to="/analytics" className="quick-link">
                  Analytics
                </MuiLink>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="colorful-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Recent Activities
                </Typography>
                <Typography variant="body2" component="p">
                  - User JohnDoe signed up
                </Typography>
                <Typography variant="body2" component="p">
                  - New order received
                </Typography>
                <Typography variant="body2" component="p">
                  - System update completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="colorful-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Notifications
                </Typography>
                <Typography variant="body2" component="p">
                  - You have 3 new messages
                </Typography>
                <Typography variant="body2" component="p">
                  - Server downtime scheduled at 3:00 AM
                </Typography>
                <Typography variant="body2" component="p">
                  - Your password will expire in 5 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
