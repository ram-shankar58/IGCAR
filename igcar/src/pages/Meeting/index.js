// src/pages/meetings/index.js
import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Layout from '../../layouts/Layout';
import CreateMeeting from '../../components/CreateMeeting';
import JoinMeeting from '../../components/JoinMeeting';
import MeetingRoom from '../../components/MeetingRoom';

const MeetingsPage = () => {
  const [meetingCode, setMeetingCode] = useState(null);
  const [participants, setParticipants] = useState([]);

  const handleMeetingCreated = (code) => {
    setMeetingCode(code);
  };

  const handleMeetingJoined = (code) => {
    setMeetingCode(code);
  };

  const handleParticipantJoin = (participant) => {
    setParticipants(prevParticipants => [...prevParticipants, participant]);
  };

  const handleParticipantLeave = (participant) => {
    setParticipants(prevParticipants =>
      prevParticipants.filter(p => p !== participant)
    );
  };

  const handleLeaveCall = () => {
    setMeetingCode(null); // Reset meeting code to leave the call
  };

  return (
    <Layout>
      <Container>
        
        {!meetingCode ? (
          <Box display="flex" justifyContent="space-around" marginBottom={4}>
            <CreateMeeting onMeetingCreated={handleMeetingCreated} />
            <JoinMeeting onMeetingJoined={handleMeetingJoined} />
          </Box>
        ) : (
          <>
            <MeetingRoom meetingCode={meetingCode} onParticipantJoin={handleParticipantJoin} onParticipantLeave={handleParticipantLeave} />
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Button variant="contained" color="secondary" onClick={handleLeaveCall}>
                Leave Call
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default MeetingsPage;
