import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import NeonCard from '../components/NeonCard';
import Header from '../components/Header';
const DarkNeonBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(145deg, #0f0c29, #302b63, #24243e)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 0 5px #9d00ff, 0 0 25px #9d00ff, 0 0 50px #9d00ff, 0 0 100px #9d00ff',
  color: 'white',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '& *':{ //note theres a space!
    //all child elements included in, DONT CHANGE
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
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle form value changes
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform registration logic here
    console.log(values);
  };
  return (
    <>
    <Header />

    <DarkNeonBox>
      <ParticlesBg type="cobweb" bg={true} color="#ffffff" num={50} />
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NeonCard elevation={6} sx={{ bgcolor: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(10px)' }}> {/* Use NeonCard here */}
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
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
                style={{color:'white'}}
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
    </>
  );
};

export default Register;