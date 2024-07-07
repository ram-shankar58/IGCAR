import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Link as MuiLink, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Layout from '../../layouts/Layout';
import { checkBackendConnection } from '../../utils/APIRequest'; 
import './Home.css';

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      const confirmResubmission = window.confirm("Are you sure you want to log out and go back?");
      if (confirmResubmission) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.history.pushState(null, null, window.location.pathname);

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  useEffect(() => {
    let timeout, warningTimeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      clearTimeout(warningTimeout);

      warningTimeout = setTimeout(() => {
        setOpen(true);
        timeout = setTimeout(() => {
          localStorage.removeItem('user');
          navigate('/login');
        }, 5 * 60 * 1000); // 5 minutes after warning
      }, 5 * 60 * 1000); // 5 minutes of inactivity
    };

    const handleActivity = () => {
      setOpen(false);
      resetTimeout();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      clearTimeout(warningTimeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [navigate]);

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        localStorage.removeItem('user');
        navigate('/connection-snapped'); 
      }
    };

    const interval = setInterval(checkConnection, 60 * 1000); 

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Layout>
      <Box className="home-background" sx={{ padding: '2rem' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card className="colorful-card">
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Journal Publications Overview
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
                  - New building constructed
                </Typography>
                <Typography variant="body2" component="p">
                  - New order received
                </Typography>
                <Typography variant="body2" component="p">
                  - Software maintenance completed
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
                  - Meeting scheduled at 3 pm
                </Typography>
                <Typography variant="body2" component="p">
                  - Interview in 2 weeks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Session Timeout Warning"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have been inactive for 5 minutes. You will be logged out in another 5 minutes if no further activity is detected.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Stay Logged In
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Home;
