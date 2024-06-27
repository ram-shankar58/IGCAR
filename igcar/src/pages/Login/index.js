import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import InitialLayout from '../../layouts/InitialLayout';
import { loginUser } from '../../store/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [values, setValues] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Login successful!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      navigate('/');
    } else if (status === 'failed') {
      toast.error(error, {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [status, error, navigate]);

  return (
    <>
      <InitialLayout />
      <Box className="background-container">
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Box className="complex-box">
            <Typography variant="h4" component="h1" gutterBottom className="complex-text">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email}
                className="complex-input"
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
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                disabled={status === 'loading'}
                className="complex-button"
              >
                {status === 'loading' ? 'Signing in…' : 'Login'}
              </Button>
              <Box sx={{ mt: 2 }}>
                <Link to="/forgotPassword" className="complex-link">
                  Forgot Password?
                </Link>
              </Box>
              <Box sx={{ mt: 2 }}>
                Don't Have an Account?{' '}
                <Link to="/register" className="complex-link">
                  Register
                </Link>
              </Box>
            </form>
          </Box>
        </Container>
        <ToastContainer />
      </Box>
    </>
  );
};

export default Login;
