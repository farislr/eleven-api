const hapi = require('@hapi/hapi')
const dotenv = require('dotenv')

dotenv.config()

const createServer = async () => {
  const server = hapi.Server({
    port: 3030,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  await server.register([
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    },
    require('@hapi/inert'),
  ])

  await server.register([require('./product'), require('./image')])

  return server
}

module.exports = createServer
