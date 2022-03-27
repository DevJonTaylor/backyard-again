const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Category } = require('./Category')

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10,
      validate: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

/**
 * @typedef {Model} Product
 * @type {Product}
 * @exports {Product}
 */
module.exports = Product;
