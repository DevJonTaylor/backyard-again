const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {

  static include = {}

  static associate({ Product }) {
    this.belongsToMany(Product, { through: 'ProductTag' })
    this.include = { include: { model: Product } }
  }

  static all() {
    return this.findAll({ ...this.include })
  }

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
