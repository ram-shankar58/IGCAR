import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Videocam, VideocamOff, Mic, MicOff } from '@material-ui/icons';
import { Button } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff3d00',
  color: 'white',
  '&:hover': {
    backgroundColor: '#d50000',
  },
  margin: theme.spacing(1),
  borderRadius: '50%', // Circular shape
  width: '64px', // Adjust size as needed
  height: '64px', // Adjust size as needed
  minWidth: 0, // Ensure minimal width for circular button
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

const SavePhotoButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
  marginTop: theme.spacing(2),
  borderRadius: '5px', // Rounded corners
  padding: theme.spacing(1, 2),
}));

const MeetingRoom = ({ meetingCode }) => {
  const [stream, setStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const videoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const canvasRef = useRef(null);
  const [participants, setParticipants] = useState([]);

  const takePhoto = () => {
    const width = 320;
    const height = 240;
    let video = videoRef.current;
    let canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const savePhoto = () => {
    let canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'photo.png';
    link.click();
  };

  const handleCameraToggle = () => {
    setIsCameraOn(prevState => !prevState);
  };

  const handleMicToggle = () => {
    setIsMicOn(prevState => !prevState);
  };

  const handleParticipantJoin = (participant) => {
    setParticipants(prevParticipants => [...prevParticipants, participant]);
  };

  const handleParticipantLeave = (participant) => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p.id !== participant.id)
    );
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Meeting Room: {meetingCode}
      </Typography>
      <VideoContainer>
        {isCameraOn ? <video ref={videoRef} autoPlay style={{ width: '100%', height: '100%' }} /> : <Typography variant="h6" color="white">Camera is off</Typography>}
      </VideoContainer>
      <Box display="flex" justifyContent="center">
        <StyledButton onClick={handleCameraToggle}>
          {isCameraOn ? <Videocam /> : <VideocamOff />}
        </StyledButton>
        <StyledButton onClick={handleMicToggle} disabled={!isCameraOn}>
          {isMicOn ? <Mic /> : <MicOff />}
        </StyledButton>
        <StyledButton onClick={takePhoto}>Take Photo</StyledButton>
        <div className={'result' + (hasPhoto ? ' hasPhoto' : '')}>
          <canvas ref={canvasRef}></canvas>
          {hasPhoto && <SavePhotoButton onClick={savePhoto}>Save Photo</SavePhotoButton>}
        </div>
      </Box>
      <Box mt={4}>
        
        <ul>
          {participants.map((participant, index) => (
            <li key={index}>{participant.name}</li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default MeetingRoom;
