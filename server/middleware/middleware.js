const logger = (request, response, next) => {
  console.log(`\n*** Server Logger ***\n
    Request Method: ${request.method}
    Request URL: ${request.originalUrl}
    TimeStamp: ${new Date(Number(new Date()))}`);
  next();
};

const middleware = [logger];

module.exports = middleware;
