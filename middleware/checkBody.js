/**
 * Checks if the body contains specific names.
 * @param invalidResponse
 * @returns {function(*, *, *): void|*}
 */
module.exports = function checkBody(columns, invalidResponse) {
  return (req, res, next) => {
    for(const column of columns) {
      if(!Object.keys(req.body).find(column)) return res.badRequest(invalidResponse)
    }

    return next()
  }
}