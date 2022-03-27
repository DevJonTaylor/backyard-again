module.exports = function(req, res, next) {
  res.response = (code, message, data) => {
    return res.header('Content-Type', 'application/vnd.api+json')
      .status(code)
      .send(JSON.stringify(!data ? {code, message} : {code, message, data}))
      .end()
  }
  res.ok = data => {
    return res.response(200, 'success', data)
  }
  res.badRequest = reason => {
    return !reason
      ? res.response(400, 'Bad Request')
      : res.response(400, 'Bad Request', reason)
  }
  res.notFound = () => {
    return res.response(404, 'Not Found')
  }
  res.serverError = () => {
    res.response(500, 'Internal Server Error')
  }

  return next()
}