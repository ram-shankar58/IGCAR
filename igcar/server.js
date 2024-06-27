// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db2.json'); // Adjust path as necessary
const middlewares = jsonServer.defaults();
const customMiddleware = require('./middleware.js'); // Adjust path as necessary

// Use custom middleware
server.use(customMiddleware);

// Use default middlewares (logger, static, cors, etc.)
server.use(middlewares);

// Use router
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
