const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')
Product.associate({ Category, Tag })
Category.associate({ Product })
Tag.associate({ Product })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
