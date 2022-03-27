const router = require('express').Router();
const { Category, Product } = require('../../models');

function checkId(req, res, next) {
  if(req.params.id === '0') return res.badRequest('Invalid Category Id')
  if(isNaN(req.params.id)) return res.badRequest('Invalid Category Id')

  return next()
}

function checkBody(req, res, next) {
  return !req.body.category_name
    ? res.badRequest('Invalid Category Name')
    : next()
}

async function handleAllRequest(req, res) {
  try {
    return res.ok(await Category.all())
  } catch(err) {
    console.error(err)
    return res.serverError()
  }
}

async function handleOneRequest(req, res) {
  try {

    const cat = await Category.byId(req.params.id)

    return !cat ? res.notFound() : res.ok(cat)

  } catch(err) {
    console.error(err)
    res.serverError()
  }
}

async function handleCreateRequest(req, res) {
  try {
    const newCat = await Category.create(req.body)
    res.ok(newCat)
  } catch(err) {
    console.error(err)
    res.serverError()
  }
}

async function handleUpdateRequest(req, res) {
  try {
    const updatedCat = await Category.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    if(!updatedCat[1].length) return res.notFound()
    return res.ok(updatedCat[1])
  } catch(err) {
    console.error(err)
    return res.serverError()
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const results = await Category.destroy({ where: { id: req.params.id } })
    return !results
      ? res.notFound()
      : res.ok()
  } catch(err) {
    console.error(err)
    res.serverError()
  }
}

router.get('/', handleAllRequest);

router.get('/:id', checkId, handleOneRequest);

router.post('/', checkBody, handleCreateRequest);

router.put('/:id', checkId, handleUpdateRequest);

router.delete('/:id', checkId, handleDeleteRequest);

module.exports = router;
