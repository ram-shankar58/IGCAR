// src/utils/websocket.js
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000'); // Adjust the URL to your WebSocket server

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onmessage = (message) => {
  console.log('Received:', message.data);
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

export default ws;
