//-----imports-----
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');
const { middleware } = require('./middleware/middleware');

//-----middleware-----
server.use(express.json());
server.use(cors());
server.use(helmet());

//-----routes / endpoints-----
server.use('/api/projects', middleware, projectRouter);
server.use('/api/actions', middleware, actionRouter);

//-----test endpoint-----
server.get('/', (request, response) => {
  response.send(`<h1>You've got this!</h1>`);
});

//-----export-----
module.exports = server;
