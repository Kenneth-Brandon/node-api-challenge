const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (request, response) => {
  response.send("You've got this!");
});

module.exports = server;
