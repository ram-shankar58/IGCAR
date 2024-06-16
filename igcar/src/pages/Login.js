import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginAPI } from '../utils/APIRequest';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import custom CSS for complex effects
import Header from '../components/Header';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = values;
        setLoading(true);
        const { data } = await axios.post(loginAPI, { email, password });

        if (data.success === true) {
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
            toast.success(data.message, toastOptions);
            setLoading(false);
        } else {
            toast.error(data.message, toastOptions);
            setLoading(false);
        }
    };

    return (
        <>
        <Header />
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
                            disabled={loading}
                            className="complex-button"
                        >
                            {loading ? 'Signing in…' : 'Login'}
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
