const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Product extends Model {}

Product.init(
  {
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
  },
  { sequelize }
)

module.exports = Product
