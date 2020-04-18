const Response = require('../entities/Response')

module.exports = (error, data, message, { responseParser }) => {
  const response = new Response(error, data, message)

  return responseParser.parse(response)
}
