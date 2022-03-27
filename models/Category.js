const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection.js')

class Category extends Model {

  static include = {}

  static associate({ Product }) {
    this.hasMany(Product, {foreignKey: 'category_id'})
    this.include = {include: { model: Product }}
  }

  static all() {
    return this.findAll({ ...this.include })
  }
  static byId(id) {
    return this.findOne({where: { id }, ...this.include })
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: 'category',
    modelName: 'Category',
  }
);

module.exports = Category;
