const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection.js')

class Category extends Model {

  /**
   * This object is defined here and filled at the end of the associate method.
   * @type { {} | { include: { model: Product } }}
   */
  static include = {}

  /**
   * Method prepares the Category model for joins and any proper constraints that may be in the way.
   * @param { Product } Product
   * @returns { void }
   */
  static associate({ Product }) {
    this.hasMany(Product, {foreignKey: 'category_id'})
    this.include = { include: { model: Product }}
  }

  /**
   * Gathers the collection of the Category model and returns it inside a Promise wrapped in an Array.
   * @returns { Promise< Array< Category > > }
   */
  static all() {
    return this.findAll({ ...this.include })
  }

  /**
   * Takes a Category ID and performs a search.  If a Category matches the ID it returns that one.
   * @param { number } id
   * @returns {Promise<Category>}
   */
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
