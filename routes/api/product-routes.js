const router = require('express').Router();
const { Product, ProductTag } = require('../../models');

function checkId(req, res, next) {
  if(req.params.id === '0') return res.badRequest('Invalid Product Id')
  if(isNaN(req.params.id)) return res.badRequest('Invalid Product Id')

  return next()
}

function checkBody(req, res, next) {
  if(!req.body.product_name) return res.badRequest('Missing Product Columns')
  if(!req.body.price) return res.badRequest('Missing Product Columns')
  if(!req.body.stock) return res.badRequest('Missing Product Columns')
  next()
}

function handleError(err, res) {
  switch(err.original.code) {
    case 'ER_NO_REFERENCED_ROW_2':
      return res.badRequest('Invalid Category ID')
    default:
      console.error(err)
      return res.serverError()
  }
}

async function handleAllRequest(req, res) {
  try {
    return res.ok(await Product.all())
  } catch(err) {
    console.error(err)
    return handleError(err, res)
  }
}

async function handleOneRequest(req, res) {
  try {
    const cat = await Product.byId(req.params.id)

    return !cat ? res.notFound() : res.ok(cat)

  } catch(err) {
    handleError((err, res))
  }
}

async function handleCreateRequest(req, res) {
  try {
    const newProduct = await Product.create(req.body)

    if(req.body.tagIds)
      await ProductTag.addTagsToProduct(newProduct.id, req.body.tagIds)

    res.ok(await Product.byId(newProduct.id))
  } catch(err) {
    return handleError(err, res)
  }
}

async function handleUpdateRequest(req, res) {
  try {
    const { id } = req.params
    const where = { id }
    const individualHooks = true

    const updatedCat = await Product.update(req.body, { where, individualHooks })

    if(!updatedCat[1].length) return res.notFound()

    if(req.body.tagIds)
      return res.ok(await ProductTag.deleteByProductId(id)
        .then(() => ProductTag.addTagsToProduct(id, req.body.tagIds))
        .then(() => Product.byId(id)))

    else return res.ok(updatedCat[1])
  } catch(err) {
    return handleError(err, res)
  }
}

async function handleDeleteRequest(req, res) {
  try {
    await ProductTag.deleteByProductId(req.params.id)
    const results = await Product.destroy({ where: { id: req.params.id } })
    return !results
      ? res.notFound()
      : res.ok()
  } catch(err) {
    console.error(err)
    res.serverError()
  }
}

router.get('/', handleAllRequest)

router.get('/:id', checkId, handleOneRequest)

router.post('/', checkBody, handleCreateRequest)

router.put('/:id', checkId, handleUpdateRequest)

router.delete('/:id', checkId, handleDeleteRequest)

module.exports = router;
