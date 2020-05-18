const express = require('express');

const actionDb = require('../../data/helpers/actionModel');
const { validateId, validateAction } = require('../middleware/middleware');

const router = express.Router();

// Endpoints
router.get('/', (request, response) => {
  actionDb.get().then((actions) => {
    response.status(200).json(actions);
  });
});

router.get('/:id', validateId(actionDb), (request, response) => {
  response.status(200).json(request.item);
});

router.post('/', validateAction, (request, response, next) => {
  action = request.body;

  actionDb
    .insert(action)
    .then((newAction) => {
      response.status(201).json(newAction);
    })
    .catch((error) => {
      response
        .status(500)
        .json({ message: 'Error adding action to the database' });
    });
  next();
});

router.put(
  '/:id',
  validateAction,
  validateId(actionDb),
  (request, response) => {
    const { id } = request.params;
    const updatedAction = { ...request.body };

    actionDb
      .update(id, updatedAction)
      .then((updated) => {
        updated
          ? response.status(200).json(updated)
          : response
              .status(500)
              .json({ message: 'Error retrieving the updated action' });
      })
      .catch((error) => {
        response
          .status(500)
          .json({ message: 'Error updatingthe action', error });
      });
  }
);

router.delete('/:id', validateId(actionDb), (request, response) => {
  const { id } = request.params;

  actionDb
    .remove(id)
    .then((deleted) => {
      deleted ? response.status(200).end() : null;
    })
    .catch((error) => {
      response
        .status(500)
        .json({
          message: 'Error removing the action from the database',
          error,
        });
    });
});

module.exports = router;
