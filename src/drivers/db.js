const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()
const { env } = process

const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: 'postgres',
})

module.exports = db
