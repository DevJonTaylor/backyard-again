const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Product extends Model {
  /**
   * Initialized here and defined at the end of associate method.
   * @type { {} | { include: [ { modal: Category }, { modal: Tag } ]  } }
   */
  static include = {}

  /**
   * Defining the relationship between the Category and Tag models.
   * @param { Category } Category
   * @param { Tag } Tag
   */
  static associate({ Category, Tag }) {
    this.belongsTo(Category, { foreignKey: 'category_id' })
    this.belongsToMany(Tag, { through: 'ProductTag', foreignKey: 'product_id' })

    this.include = { include: [ { model: Category }, { model: Tag } ] }
  }

  /**
   * Returns the entire collection of Products.
   * @returns {Promise<Array<Product>>}
   */
  static all() {
    return this.findAll({ ...this.include })
  }

  /**
   * Returns a single Product if it exists.
   * @param { number } id
   * @returns { Promise<Product> }
   */
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
