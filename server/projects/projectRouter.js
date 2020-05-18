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

router.post('/', validateProject, (request, response, next) => {
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
  next();
});
// tested

router.put(
  '/:id',
  validateProject,
  validateId(projectDb),
  (request, response, next) => {
    const { id } = request.params;
    const updatedProject = { ...request.body };

    projectDb
      .update(id, updatedProject)
      .then((updated) => {
        updated
          ? response.status(200).json(updated)
          : response
              .status(500)
              .json({ message: 'Error retrieving the updated project' });
      })
      .catch((error) => {
        response
          .status(500)
          .json({ message: 'Error updating the project', error });
      });
    next();
  }
);

router.delete('/:id', validateId(projectDb), (request, response, next) => {
  const { id } = request.params;

  projectDb
    .remove(id)
    .then((deleted) => {
      deleted ? response.status(200).end() : null;
    })
    .catch((error) => {
      response.status(500).json({
        message: 'Error removing the project from the database',
        error,
      });
    });
  next();
});

module.exports = router;
