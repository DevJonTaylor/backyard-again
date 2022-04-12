module.exports = class BasicRoutes {
  allQuery
  byIdQuery
  createQuery
  updateQuery
  deleteQuery
  checkId
  checkBody

  setCheckId(checkId) {
    this.checkId = checkId

    return this
  }

  setCheckBody(checkBody) {
    this.checkBody = checkBody

    return this
  }

  setDeleteQuery(deleteQuery) {
    this.deleteQuery = deleteQuery

    return this
  }

  setUpdateQuery(updateQuery) {
    this.updateQuery = updateQuery

    return this
  }

  setCreateQuery(createQuery) {
    this.createQuery = createQuery

    return this
  }

  setAllQuery(all) {
    this.allQuery = all

    return this
  }

  setByIdQuery(byId) {
    this.byIdQuery = byId

    return this
  }

  setupRouter(router) {
    router.route('/')
      .get(this.all.bind(this))
      .post(this.create.bind(this))

    router.route('/:id')
      .get(this.checkId, this.one.bind(this))
      .put(this.checkId, this.update.bind(this))
      .delete(this.checkId, this.delete.bind(this))
  }

  errors(err, res) {
    if(typeof err.errors === 'undefined') {
      if(err.parent.code === 'ER_NO_REFERENCED_ROW_2')
      return res.notFound()
    } else {
      switch(err.errors[0].type) {
        case 'notNull Violation':
          return res.badRequest(`Column '${err.errors[0].path}' missing.`)
        default:
          console.error(err)
          return res.serverError()
      }
    }
  }

  async all(req, res) {
    try {
      const all = await this.allQuery()
      return res.ok(all)
    } catch(err) {
      return this.errors(err, res)
    }
  }

  async one(req, res) {
    try {
      const row = await this.byIdQuery(req.params.id)
      return !row ? res.notFound() : res.ok(row)
    } catch(err) {
      return this.errors(err, res)
    }
  }

  async create(req, res) {
    try {
      const newRow = await this.createQuery(req.body)
      res.ok(newRow)
    } catch(err) {
      this.errors(err, res)
    }
  }

  async update(req, res) {
    try {
      const updatedRow = await this.updateQuery(req.body, req.params.id)
      return !updatedRow[1].length ? res.notFound() : res.ok(updatedRow[1])
    } catch(err) {
      return this.errors(err, res)
    }
  }

  async delete(req, res) {

    try {
      const results = await this.deleteQuery(req.params.id)
      return !results ? res.notFound() : res.ok()
    } catch(err) {
      return this.errors(err, res)
    }
  }
}