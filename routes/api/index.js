const router = require('express').Router()
const responses = require('../../middleware/responses')

router
  .use(responses)
  .use('/categories', require('./category-routes'))
  .use('/products', require('./product-routes'))
  .use('/tags', require('./tag-routes'))

module.exports = router
