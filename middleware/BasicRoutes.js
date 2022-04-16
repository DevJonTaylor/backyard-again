/**
 * This class is intended to cover the four basic interaction of each route.
 * @class
 * @type {BasicRoutes}
 * @property {Model.findAll} allQuery The query that returns all.
 * @property {Model.findOne} byIdQuery The query that searches for a row by id.
 * @property {Model.create} createQuery The query to create an object.
 * @property {Model.update} updateQuery The query to update an object.
 * @property {Model.destroy} deleteQuery The query to delete a row.
 * @property {function(req, res, next): void} checkId The middleware function.
 */
const checkId = require('./checkId')

module.exports = class BasicRoutes {
  allQuery
  byIdQuery
  createQuery
  updateQuery
  deleteQuery
  checkId

  /**
   * This method sets the checkId middleware
   * @param {string} checkIdResponse
   * @returns {BasicRoutes} This for chaining.
   */
  setCheckId(checkIdResponse) {
    this.checkId = checkId(checkIdResponse)

    return this
  }

  /**
   * Sets the delete query.
   * @param {Model.delete} deleteQuery
   * @returns {BasicRoutes}
   */
  setDeleteQuery(deleteQuery) {
    this.deleteQuery = deleteQuery

    return this
  }

  /**
   * Sets the update query
   * @param {Model.update} updateQuery
   * @returns {BasicRoutes}
   */
  setUpdateQuery(updateQuery) {
    this.updateQuery = updateQuery

    return this
  }

  /**
   * Sets teh create query
   * @param {Model.create} createQuery
   * @returns {BasicRoutes}
   */
  setCreateQuery(createQuery) {
    this.createQuery = createQuery

    return this
  }

  /**
   * Sets the get all query.
   * @param {Model.findAll} all
   * @returns {BasicRoutes}
   */
  setAllQuery(all) {
    this.allQuery = all

    return this
  }

  /**
   * Sets the query to find by id.
   * @param {Model.findOne} byId
   * @returns {BasicRoutes}
   */
  setByIdQuery(byId) {
    this.byIdQuery = byId

    return this
  }

  /**
   * Sets the routes up and places the correct methods and functions in their places.
   * @param {router} router
   */
  setupRouter(router) {
    router.route('/').get(this.all.bind(this)).post(this.create.bind(this))

    router
      .route('/:id')
      .get(this.checkId, this.one.bind(this))
      .put(this.checkId, this.update.bind(this))
      .delete(this.checkId, this.delete.bind(this))
  }

  /**
   * This method handles the errors received.
   * @param {Error|string} err
   * @param {unknown} res I could not locate a proper object for the Express.Response object.
   * @returns {void} Even though the items are being returned.  The value is never reached.
   */
  errors(err, res) {
    if (typeof err.errors === 'undefined') {
      if (err.parent.code === 'ER_NO_REFERENCED_ROW_2') return res.notFound()
    } else {
      switch (err.errors[0].type) {
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
    } catch (err) {
      return this.errors(err, res)
    }
  }

  async one(req, res) {
    try {
      const row = await this.byIdQuery(req.params.id)
      return !row ? res.notFound() : res.ok(row)
    } catch (err) {
      return this.errors(err, res)
    }
  }

  async create(req, res) {
    try {
      const newRow = await this.createQuery(req.body)
      res.ok(newRow)
    } catch (err) {
      this.errors(err, res)
    }
  }

  async update(req, res) {
    try {
      const updatedRow = await this.updateQuery(req.body, req.params.id)
      return !updatedRow[1].length ? res.notFound() : res.ok(updatedRow[1])
    } catch (err) {
      return this.errors(err, res)
    }
  }

  async delete(req, res) {
    try {
      const results = await this.deleteQuery(req.params.id)
      return !results ? res.notFound() : res.ok()
    } catch (err) {
      return this.errors(err, res)
    }
  }
}
