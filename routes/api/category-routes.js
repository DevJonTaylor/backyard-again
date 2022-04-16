const router = require('express').Router()
const { Category, Product } = require('../../models')
const { BasicRoutes } = require('../../middleware/index')

const options = { include: { model: Product }, nest: true, logging: false }

const br = new BasicRoutes()
br.setCheckId('Invalid Category Id.')
  .setAllQuery(() => {
    return Category.findAll(options)
  })
  .setByIdQuery(id => {
    return Category.findByPk(id, options)
  })
  .setCreateQuery(createObject => {
    return Category.create(createObject, { logging: false })
  })
  .setUpdateQuery((updateObject, id) => {
    return Category.update(updateObject, { individualHooks: true, where: { id }, logging: false })
  })
  .setDeleteQuery(id => {
    return Category.destroy({ where: { id }, logging: false })
  })
  .setupRouter(router)

module.exports = router
