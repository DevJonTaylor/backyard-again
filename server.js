const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)

sequelize.sync({ force: false, logging: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  })
})

/**
 * TODO:  Go through and create documentation for all functions
 * TODO:  Go through and Create the video
 * TODO:  Create the README
 * TODO:  Submit the project.
 */
