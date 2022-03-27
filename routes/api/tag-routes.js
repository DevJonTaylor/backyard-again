const router = require('express').Router();
const { Tag } = require('../../models');

function checkId(req, res, next) {
  if(req.params.id === '0') return res.badRequest('Invalid Tag Id')
  if(isNaN(req.params.id)) return res.badRequest('Invalid Tag Id')

  return next()
}

function checkBody(req, res, next) {
  if(!req.body.tag_name) return res.badRequest('Invalid Tag Column')
  next()
}

async function handleAllRequest(req, res) {
  try {
    return res.ok(await Tag.all())
  } catch(err) {
    console.error(err)
    return res.serverError()
  }
}

async function handleOneRequest(req, res) {
  try {
    const tag = await Tag.byId(req.params.id)

    return !tag ? res.notFound() : res.ok(tag)

  } catch(err) {
    console.error(err)
    res.serverError()
  }
}

async function handleCreateRequest(req, res) {
  try {
    res.ok(await Tag.create(req.body))
  } catch(err) {
    console.error(err)
    res.serverError()
  }
}

async function handleUpdateRequest(req, res) {
  try {
    const { id } = req.params
    const where = { id }
    const individualHooks = true

    const updatedTag = await Tag.update(req.body, { where, individualHooks })

    if(!updatedTag[1].length) return res.notFound()

    else return res.ok(updatedTag[1])
  } catch(err) {
    console.error(err)
    return res.serverError()
  }
}

async function handleDeleteRequest(req, res) {
  try {
    const results = await Tag.destroy({ where: { id: req.params.id } })
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
