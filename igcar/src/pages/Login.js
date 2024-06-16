import React, { useCallback, useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginAPI } from '../utils/APIRequest';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Login = () => {
    const navigate=useNavigate();

    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    }, [navigate]);

    const [values, setValues]=useState({
        email:"",
        password:"",
    });

    const handleChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value});
    };
    const toastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };
    
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const {email, password} = values;
        setLoading(true);
        const {data}=await axios.post(loginAPI, { email, password});

        if(data.sucess===true){
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
            TransformStream.sucess(data.message, toastOptions);
            setLoading(false);
        }
        else{
            toast.error(data.message, toastOptions);
            setLoading(false);
        }
        };
        const particlesInit = useCallback(async (engine) => {
             console.log(engine);
            await loadFull(engine);
        }, []);
        
        const particlesLoaded = useCallback(async (container) => {
             await console.log(container);
        }, []);

        return (
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <Particles
                    // ... (keep your existing Particles configuration)
                />
                <Container maxWidth="sm" sx={{ mt: 8 }}>
                    <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
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
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={values.password}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                disabled={loading}
                            >
                                {loading ? 'Signing in…' : 'Login'}
                            </Button>
                            <Box sx={{ mt: 2 }}>
                                <Link to="/forgotPassword">
                                    Forgot Password?
                                </Link>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                Don't Have an Account?{' '}
                                <Link to="/register">
                                    Register
                                </Link>
                            </Box>
                        </form>
                    </Box>
                </Container>
                <ToastContainer />
            </Box>
        );
    };
    
    export default Login;