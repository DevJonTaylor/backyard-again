const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

/**
 * TODO:  Go through and create documentation for all functions
 * TODO:  Deploy the project
 * TODO:  Go through and Create the video
 * TODO:  Create the README
 * TODO:  Submit the project.
 */