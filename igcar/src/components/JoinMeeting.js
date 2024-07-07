// src/components/JoinMeeting.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

const JoinMeeting = ({ onMeetingJoined }) => {
  const [code, setCode] = useState('');

  const joinMeeting = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/meetings?code=${code}`);
      if (response.data.length > 0) {
        onMeetingJoined(code);
      } else {
        alert('Meeting not found');
      }
    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Enter Meeting Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={joinMeeting}>
        Join Meeting
      </Button>
    </div>
  );
};

export default JoinMeeting;
