import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = values;
        setLoading(true);

        try {
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
            const user = registeredUsers.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
                toast.success("Login successful!", toastOptions);
            } else {
                toast.error("Invalid email or password", toastOptions);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error("An error occurred. Please try again.", toastOptions);
        } finally {
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
