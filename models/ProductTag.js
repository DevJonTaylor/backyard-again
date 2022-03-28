const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {

  /**
   * Performs a query that gets ProductTags based on the Product Id that is provided.
   * @param {number} product_id
   * @returns { Promise<any[ProductTag]> }
   */
  static getByProductId(product_id) {
    return this.findAll({ where: { product_id }})
  }

  /**
   * Creates the ProductTags in the amount of the Tags provided.
   * @param {number} product_id
   * @param {Array<number>} tagIds
   * @returns {Promise<Array<ProductTag>>}
   */
  static async addTagsToProduct(product_id, tagIds) {
    for(let tag_id of tagIds) {
      await this.create({ product_id, tag_id })
    }
    return this.getByProductId(product_id)
  }

  /**
   * Deletes all ProductTags that contain the Product ID that is passed.
   * @param {number} id product_id
   * @returns { Promise<void> }
   */
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
