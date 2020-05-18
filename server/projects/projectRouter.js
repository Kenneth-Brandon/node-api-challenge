const express = require('express');

const projectDb = require('../../data/helpers/projectModel');
const { validateId } = require('../middleware/middleware');

const router = express.Router();

// Endpoints

router.get('/', (request, response) => {
  projectDb.get().then((projects) => {
    response.status(200).json(projects);
  });
});
// tested

router.get('/:id', validateId(projectDb), (request, response) => {
  response.status(200).json(request.item);
});

module.exports = router;
