// src/pages/Register.js
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    setLoading(true);

    // Simulated registration logic
    setTimeout(() => {
      setLoading(false);
      // Simulate successful registration
      toast.success('Registration successful!');
      navigate('/login'); // Redirect to login after successful registration
    }, 1000); // Simulating API call with delay
  };

  return (
    <Box className="background-container">
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Box className="complex-box">
          <Typography variant="h4" component="h1" gutterBottom className="complex-text">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              type="text"
              onChange={handleChange}
              value={values.name}
              className="complex-input"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              className="complex-input"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              className="complex-input"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              disabled={loading}
              className="complex-button"
            >
              {loading ? 'Registering…' : 'Register'}
            </Button>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" component="p">
                Already have an account?{' '}
                <Link to="/login" className="complex-link">
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Register;
