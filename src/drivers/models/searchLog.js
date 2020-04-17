const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class SearchLog extends Model {}

SearchLog.init(
  {
    endpoint: DataTypes.STRING,
    value: DataTypes.STRING,
  },
  { sequelize }
)

module.exports = SearchLog
