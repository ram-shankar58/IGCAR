import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginAPI } from '../utils/APIRequest';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import custom CSS for light theme

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
        <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Box className="light-box" sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom className="light-text">
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
                            className="light-input"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            className="light-input"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, bgcolor: '#4caf50', '&:hover': { bgcolor: '#66bb6a' } }}
                            disabled={loading}
                        >
                            {loading ? 'Signing in…' : 'Login'}
                        </Button>
                        <Box sx={{ mt: 2 }}>
                            <Link to="/forgotPassword" className="light-link">
                                Forgot Password?
                            </Link>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            Don't Have an Account?{' '}
                            <Link to="/register" className="light-link">
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
