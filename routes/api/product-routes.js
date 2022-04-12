const router = require('express').Router();
const { Product, ProductTag, Category, Tag } = require('../../models');
const { BasicRoutes, checkId } = require("../../middleware");

const options = { include: [{ model: Category }, { model: Tag } ] , nest: true, logging: false }

const br = new BasicRoutes()
br.setCheckId(checkId('Invalid Product Id'))
  .setAllQuery(() => {
    return Product.findAll(options)
  })
  .setByIdQuery((id) => {
    return Product.findByPk(id, options)
  })
  .setCreateQuery(async (createObject) => {
    if(createObject.Tags) {
      const newProduct = await Product.create(createObject, { logging: false })
      for(const tag of createObject.Tags) {
        await ProductTag.create({ product_id: newProduct.id, tag_id: tag }, { logging: false })
      }

      return Product.findByPk(newProduct.id, options)
    }
    const newProduct = await Product.create(createObject)
    return Product.findByPk(newProduct.id, options)
  })
  .setUpdateQuery(async (updateObject, id) => {
    if(updateObject.Tags) {
      await ProductTag.deleteByProductId(id)
      for(const tag_id of updateObject.Tags) {
        await ProductTag.create({ tag_id, product_id: id }, { logging: false })
      }
    }
    return Product.update(updateObject, { individualHooks: true, where: { id }, logging: false })
  })
  .setDeleteQuery((id) => {
    return Product.destroy({ where: { id }, logging: false })
  })
  .setupRouter(router)

module.exports = router;
