const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

Category.hasMany(Product, { foreignKey: 'category_id', key: 'id', onDelete: 'CASCADE' })
Product.belongsTo(Category, { foreignKey: 'category_id', key: 'id' })
Product.createTags = Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id', key: 'id', onDelete: 'CASCADE' })
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id', key: 'id', onDelete: 'CASCADE' })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
