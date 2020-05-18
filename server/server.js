const express = require('express');
const server = express();

const projectRouter = require('./projects/projectRouter');
const { middleware } = require('./middleware/middleware');

server.use(express.json());
server.use('/api/projects', middleware, projectRouter);

server.get('/', (request, response) => {
  response.send("You've got this!");
});
// tested

module.exports = server;
