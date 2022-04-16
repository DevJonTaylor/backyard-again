const router = require('express').Router()
const { Tag } = require('../../models')
const { BasicRoutes } = require('../../middleware')

const options = { nested: true, logging: false }

const br = new BasicRoutes()
br.setCheckId('Invalid Product Id')
  .setAllQuery(() => {
    return Tag.findAll(options)
  })
  .setByIdQuery(id => {
    return Tag.findByPk(id, options)
  })
  .setCreateQuery(async createObject => {
    return Tag.create(createObject, { logging: false })
  })
  .setUpdateQuery(async (updateObject, id) => {
    return Tag.update(updateObject, { individualHooks: true, where: { id }, logging: false })
  })
  .setDeleteQuery(id => {
    return Tag.destroy({ where: { id }, logging: false })
  })
  .setupRouter(router)

module.exports = router
