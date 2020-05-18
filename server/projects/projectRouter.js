const express = require('express');

const projectDb = require('../../data/helpers/projectModel');
const { validateId, validateProject } = require('../middleware/middleware');

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

router.post('/', validateProject, (request, response) => {
  const project = request.body;

  projectDb
    .insert(project)
    .then((newProject) => {
      response.status(201).json(newProject);
    })
    .catch((error) => {
      response
        .status(500)
        .json({ message: 'Error adding project to the database', error });
    });
});

module.exports = router;
