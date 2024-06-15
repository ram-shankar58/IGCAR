import React, {useCallBack, useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../utils/APIRequest";

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

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const {email, password} = values;
        setLoading(true);
        const {data}=await axios.post(loginAPI, { email, password});

        if(data.sucess===true){
            localStorage.setItem("user", JSON.stringify(data.user));
            naviagate("/");
            TransformStream.sucess(data.message, toastOptions);
            setLoading(false);
        }
        else{
            toast.error(data.message, toastOptions);
            setLoading(false);
        }
        };

        return (
            <div>
                <Container
                    className="mt-5"
                    style={{ position: "relative", zIndex: "2 !important" }}
                >
                    <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="text-center mt-5">
                        <AccountBalanceWalletIcon
                            sx={{ fontSize: 40, color: "white" }}
                            className="text-center"
                        />
                        </h1>
                        <h2 className="text-white text-center ">Login</h2>
                        <Form>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label className="text-white">Email address</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mt-3">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={values.password}
                            />
                        </Form.Group>
                        <div
                            style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            }}
                            className="mt-4"
                        >
                            <Link to="/forgotPassword" className="text-white lnk">
                            Forgot Password?
                            </Link>

                            <Button
                            type="submit"
                            className=" text-center mt-3 btnStyle"
                            onClick={!loading ? handleSubmit : null}
                            disabled={loading}
                            >
                            {loading ? "Signin…" : "Login"}
                            </Button>

                            <p className="mt-3" style={{ color: "#9d9494" }}>
                            Don't Have an Account?{" "}
                            <Link to="/register" className="text-white lnk">
                                Register
                            </Link>
                            </p>
                        </div>
                        </Form>
                    </Col>
                    </Row>
                    <ToastContainer />
                </Container>
            </div>
        );


    };

export default Login;