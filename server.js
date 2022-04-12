const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false, logging: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })

/**
 * TODO:  Go through and create documentation for all functions
 * TODO:  Go through and Create the video
 * TODO:  Create the README
 * TODO:  Submit the project.
 */