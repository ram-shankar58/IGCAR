import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ParticlesBg from 'particles-bg';
import NeonCard from '../../components/NeonCard';
import Header from '../../components/Header';
import InitialLayout from '../../layouts/InitialLayout';
import bcrypt from 'bcryptjs';

const DarkNeonBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #0f0c29, #302b63, #24243e)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 0 5px #9d00ff, 0 0 25px #9d00ff, 0 0 50px #9d00ff, 0 0 100px #9d00ff',
  color: 'white',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '& *': { 
    color: 'white !important',
  },
}));

const NeonTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#9d00ff',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9d00ff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9d00ff',
    },
    '&:hover fieldset': {
      borderColor: '#9d00ff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9d00ff',
    },
    '& input': {
      color: 'white',
    },
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    designation: '',
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, designation } = values;

    try {
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const userExists = registeredUsers.some(user => user.email === email);

      if (userExists) {
        toast.error("Email already registered", toastOptions);
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = { name, email, password: hashedPassword, designation };
        registeredUsers.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
        toast.success("Registration successful!", toastOptions);
        navigate("/login");
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("An error occurred. Please try again.", toastOptions);
    }
  };

  return (
    <>
      <InitialLayout />
      <DarkNeonBox>
        <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={50} />
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <NeonCard elevation={6} sx={{ bgcolor: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(10px)' }}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Register
              </Typography>
              <form onSubmit={handleSubmit}>
                <NeonTextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                />
                <NeonTextField
                  fullWidth
                  margin="normal"
                  label="Email Address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                />
                <NeonTextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <NeonTextField
                  fullWidth
                  margin="normal"
                  label="Designation"
                  name="designation"
                  type="text"
                  onChange={handleChange}
                  value={values.designation}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3 }}
                  style={{ color: 'white' }}
                >
                  Sign Up
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#FF8E53' }}>
                    Login here
                  </Link>
                </Typography>
              </form>
            </Box>
          </NeonCard>
        </Container>
      </DarkNeonBox>
      <ToastContainer />
    </>
  );
};

export default Register;
