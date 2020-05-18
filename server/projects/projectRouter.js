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

router.get('/:id', validateId(projectDb), (request, response) => {
  response.status(200).json(request.item);
});

router.get('/:id/actions', validateId(projectDb), (request, response) => {
  const { id } = request.params;

  projectDb
    .getProjectActions(id)
    .then((actions) => {
      actions.length
        ? response.status(200).json(actions)
        : response
            .status(404)
            .json({ message: 'No actions found for this project' });
    })
    .catch((error) =>
      response.status(500).json({
        message: 'Error retrieving the actions for this project',
        error,
      })
    );
});

router.post('/', validateProject, (request, response) => {
  const project = request.body;

  projectDb
    .insert(project)
    .then((newProject) => {
      response.status(201).json(newProject);
    })
    .catch((error) =>
      response
        .status(500)
        .json({ message: 'Error adding project to the database', error })
    );
});

router.put(
  '/:id',
  validateProject,
  validateId(projectDb),
  (request, response) => {
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
  }
);

router.delete('/:id', validateId(projectDb), (request, response) => {
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
});

module.exports = router;
