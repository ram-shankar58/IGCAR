import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../../layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#9d00ff',
    color: 'white',
    '&:hover': {
        backgroundColor: '#7a00cc',
    },
    margin: theme.spacing(1),
}));

const VideoContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '500px',
    backgroundColor: '#1c1c1c',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));



const Meeting = () => {
    const [stream, setStream] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(false);
    const videoRef = useRef(null);
    const [hasPhoto, setHasPhoto]=useState(false);
    const canvasRef=useRef(null);

    const takePhoto = () =>{
        const width=320;
        const height=240;
        let video=videoRef.current;
        let canvas = canvasRef.current;
        canvas.width=width;
        canvas.height=height;
        let context=canvas.getContext('2d');
        context.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    
    };
    
    const savePhoto = () =>{
        let canvas=canvasRef.current;
        const image=canvas.toDataURL('image/png');
        const link=document.createElement('a');
        link.href=image;
        link.download='photo.png';
        link.click();
    };

    useEffect(() => {
        if (isCameraOn) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
                .then(stream => {
                    setStream(stream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(error => {
                    console.error('Error accessing media devices.', error);
                    toast.error('Error accessing media devices.');
                });
        } else {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }
    }, [isCameraOn, isMicOn]);

    const handleCameraToggle = () => {
        setIsCameraOn(prevState => !prevState);
    };

    const handleMicToggle = () => {
        setIsMicOn(prevState => !prevState);
    };

    return (
        <>
            <Layout>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Meeting
                </Typography>
                <VideoContainer>
                    {isCameraOn ? <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%' }} /> : <Typography variant="h6" color="white">Camera is off</Typography>}
                </VideoContainer>
                <Box display="flex" justifyContent="center">
                    <StyledButton onClick={handleCameraToggle}>
                        {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
                    </StyledButton>
                    <StyledButton onClick={handleMicToggle} disabled={!isCameraOn}>
                        {isMicOn ? 'Turn Microphone Off' : 'Turn Microphone On'}
                    </StyledButton>
                    <StyledButton onClick={takePhoto}>Take Photo</StyledButton>
                    <div className={'result'+(hasPhoto ? 'hasPhoto' : '')}>
                        <canvas ref={canvasRef}></canvas>
                        {hasPhoto && <button onClick={savePhoto}>Save Photo</button>}
                    </div>
                </Box>
                <ToastContainer />
            </Container>
            </Layout>
        </>
    );
};

export default Meeting;
