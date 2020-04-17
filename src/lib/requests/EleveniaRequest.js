const axios = require('axios').default
const ProductRepository = require('../repositories/ProductRepository')

module.exports = class extends ProductRepository {
  url = 'http://api.elevenia.co.id/rest/'

  constructor() {}

  async fetchAllProduct() {
    try {
      const products = await axios.get()
    } catch (e) {
      console.log(e)

      return e
    }
  }
}
