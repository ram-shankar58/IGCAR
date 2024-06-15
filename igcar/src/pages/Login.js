import React, {useCallBack, useEffect, useState} from 'react';
import {Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

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
        

    }
}