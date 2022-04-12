module.exports = function checkId(invalidResponse = '') {
  return (req, res, next) => {
    if(req.params.id === '0') return res.badRequest(invalidResponse)
    if(isNaN(req.params.id)) return res.badRequest(invalidResponse)

    return next()
  }
}