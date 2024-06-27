// middleware.js
module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/users') {
      const db = require('./db.json'); // Adjust path as necessary
      const users = db.users;
  
      // Check if email already exists
      const existingUser = users.find(user => user.email === req.body.email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }
  
    // Continue to JSON Server router
    next();
  };
  