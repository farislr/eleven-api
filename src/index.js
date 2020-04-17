const createServer = require('./drivers/server')
const db = require('./drivers/db')

const start = async () => {
  try {
    await db.authenticate()
    const server = await createServer()
    server.start()
    console.log('Connected to %s', server.info.uri)
  } catch (e) {
    console.log(e)

    throw new Error(e)
  }
}

start()
