/**
 * This is the main response to keep everything consistent through the REST API.
 * @extends { Express.response }
 * @param code
 * @param message
 * @param [data]
 * @returns {void|*}
 */
function returnResponse(code, message, data) {
  this.header('Content-Type', 'application/vnd.api+json')
    .status(code)
    .send(JSON.stringify(!data ? { code, message } : { code, message, data }))
}

/**
 * Creates a Http Status 200 response and sends and data provided with it.
 * @extends { Express.response }
 * @param { unknown } [data]
 * @returns {void|*}
 */
function okResponse(data) {
  this.returnResponse(200, 'success', data)
}

/**
 * Creates and sends an Http Status 400 Bad Request
 * @extends { Express.response }
 * @param {string} [reason]
 * @returns {void|*}
 */
function badRequestResponse(reason) {
  return !reason ? this.returnResponse(400, 'Bad Request') : this.returnResponse(400, 'Bad Request', reason)
}

/**
 * Returns a Http Status Response of Not Found.
 * @extends { Express.response }
 * @returns {void|*}
 */
function notFoundResponse() {
  return this.returnResponse(404, 'Not Found')
}

/**
 * Returns a Http Status Response of Internal Server Error
 * @extends { Express.response }
 * @returns {void|*}
 */
function serverErrorResponse() {
  return this.returnResponse(500, 'Internal Server Error')
}

/**
 * Extending the Response object to allow for consistent response and easily utilized.
 */
module.exports = function (req, res, next) {
  res.returnResponse = returnResponse
  res.ok = okResponse
  res.badRequest = badRequestResponse
  res.notFound = notFoundResponse
  res.serverError = serverErrorResponse

  return next()
}
