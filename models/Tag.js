const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {

  /**
   * This is initiated now and filled out at the end of the associate method.
   * @type {{} | { include: { model: Product } }}
   */
  static include = {}

  /**
   * Associates the Product model to properly perform joins.
   * @param Product
   */
  static associate({ Product }) {
    this.belongsToMany(Product, { through: 'ProductTag' })

    this.include = { include: { model: Product } }
  }

  /**
   * This is method gathers the collection of the Tag Model and returns it as an Array inside a Promise.
   * @returns {Promise<Array<Tag>>}
   */
  static all() {
    return this.findAll({ ...this.include })
  }

  /**
   * Performs a query and returns if it exists the Tag that matches the id.
   * @param id
   * @returns {Promise<Tag>}
   */
  static byId(id) {
    return this.findOne({ where: { id }, ...this.include })
  }

}

Tag.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: DataTypes.STRING
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Tag',
    tableName: 'tag'
  }
);

module.exports = Tag;
