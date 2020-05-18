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

module.exports = router;
