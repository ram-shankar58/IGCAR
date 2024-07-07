// src/components/CreateMeeting.js
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField, Typography } from '@mui/material';

const CreateMeeting = ({ onMeetingCreated }) => {
  const [title, setTitle] = useState('');

  const createMeeting = async () => {
    const code = uuidv4();
    const newMeeting = { title, code };

    try {
      await axios.post('http://localhost:3001/meetings', newMeeting);
      onMeetingCreated(code);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={createMeeting}>
        Create Meeting
      </Button>
    </div>
  );
};

export default CreateMeeting;
