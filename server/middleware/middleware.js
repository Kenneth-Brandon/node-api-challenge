const logger = (request, response, next) => {
  console.log(`\n*** Server Logger ***\n
    Request Method: ${request.method}
    Request URL: ${request.originalUrl}
    TimeStamp: ${new Date(Number(new Date()))}`);
  next();
};

const validateId = (db) => (request, response, next) => {
  const { id } = request.params;
  console.log(params);

  db.get(id)
    .then((item) => {
      item !== null
        ? (request.item = item)
        : response.status(400).json({ message: 'Invalid id' });
      next();
    })
    .catch((error) => {
      response.status(500).json({ errorMessage: "Couldn't validate", error });
    });
};

const validateProject = (request, response, next) => {
  const { body } = request;

  JSON.stringify(body) === '{}'
    ? response.status(400).json({ message: 'Missing project data' })
    : !body.name || !body.description
    ? response.status(400).json({
        message: `missing required 
        ${
          !body.name ? 'name' : !body.description ? 'description' : null
        } field`,
      })
    : next();
};

const validateAction = (request, response, next) => {
  const { body } = request;

  JSON.stringify(body) === '{}'
    ? response.status(400).json({ message: 'missing action data' })
    : !body.project_id
    ? response.status(400).json({ message: 'missing required project_id' })
    : !body.description || !body.notes
    ? response.status(400).json({
        message: `missing required 
          ${
            !body.description ? 'description' : !body.notes ? 'notes' : null
          } field`,
      })
    : !body.description.length <= 128
    ? response
        .status(400)
        .json({ message: 'description must be 128 characters or fewer' })
    : next();
};

const middleware = [logger];

module.exports = { middleware, validateId, validateProject, validateAction };
