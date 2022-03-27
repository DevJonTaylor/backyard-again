require('dotenv').config();

const Sequelize = require('sequelize');
global.__M = Sequelize.Model
global._STRING = Sequelize.STRING
global._INT = Sequelize.INTEGER

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
