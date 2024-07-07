// socketServer.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5001 });

let users = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case 'join':
        users[parsedMessage.meetingCode] = users[parsedMessage.meetingCode] || [];
        users[parsedMessage.meetingCode].push(ws);
        broadcast(ws, parsedMessage.meetingCode, { type: 'new-user', peerId: ws.peerId });
        break;
      case 'leave':
        users[parsedMessage.meetingCode] = users[parsedMessage.meetingCode].filter(user => user !== ws);
        broadcast(ws, parsedMessage.meetingCode, { type: 'user-left', peerId: ws.peerId });
        break;
      case 'offer':
      case 'answer':
      case 'ice-candidate':
        broadcast(ws, parsedMessage.meetingCode, parsedMessage);
        break;
    }
  });

  ws.on('close', () => {
    // Clean up user from the users list
    Object.keys(users).forEach(meetingCode => {
      users[meetingCode] = users[meetingCode].filter(user => user !== ws);
    });
  });
});

function broadcast(ws, meetingCode, message) {
  users[meetingCode].forEach(user => {
    if (user !== ws) {
      user.send(JSON.stringify(message));
    }
  });
}

console.log('WebSocket server running on ws://localhost:5000');
