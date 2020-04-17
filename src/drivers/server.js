const dotenv = require('dotenv')
const hapi = require('@hapi/hapi')

dotenv.config()

const createServer = async () => {
  const server = hapi.Server({
    port: 3000,
    host: 'localhost',
  })

  await server.register([
    require('./product'),
    {
      plugin: require('hapi-pino'),
      options: {
        prettyPrint: process.env.NODE_ENV !== 'production',
      },
    },
  ])

  return server
}

module.exports = createServer
