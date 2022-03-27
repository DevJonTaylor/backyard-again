const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Product extends Model {

  static associate({ Category, Tag }) {
    this.belongsTo(Category, { foreignKey: 'category_id' })
    this.belongsToMany(Tag, { through: 'ProductTag', foreignKey: 'product_id' })

    this.include = { include: [ { model: Category }, { model: Tag } ] }
  }

  static include = {}

  static all() {
    return this.findAll({ ...this.include })
  }

  static byId(id) {
    return this.findOne({ where: { id }, ...this.include })
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: _STRING,
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
    tableName: 'product',
    modelName: 'Product',
  }
);

module.exports = Product;
