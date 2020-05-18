const express = require('express');

const projectDb = require('../../data/helpers/projectModel');

const router = express.Router();

// Endpoints

router.get('/', (request, response) => {
  projectDb.get().then((projects) => {
    response.status(200).json(projects);
  });
});

module.exports = router;
