const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {

  static getByProductId(product_id) {
    return this.findAll({ where: { product_id }})
  }

  static async addTagsToProduct(product_id, tagIds) {
    for(let tag_id of tagIds) {
      await this.create({ product_id, tag_id })
    }
    return this.getByProductId(product_id)
  }

  static deleteByProductId(id) {
    return this.destroy({ where: { product_id: id } })
  }

}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ProductTag',
    tableName: 'product_tag',
  }
);

module.exports = ProductTag;
