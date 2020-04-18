const ResponseRepository = require('../repositories/ResponseRepository')

module.exports = class extends ResponseRepository {
  parse(response) {
    return response
  }
}
