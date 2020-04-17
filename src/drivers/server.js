const hapi = require('@hapi/hapi')
const dotenv = require('dotenv')

dotenv.config()

const createServer = async () => {
  const server = hapi.Server({
    port: 3000,
    host: 'localhost',
  })

  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    },
  ])

  await server.register([require('./product')])

  return server
}

module.exports = createServer
