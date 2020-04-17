const fetchAllProduct = require('../lib/useCases/fetchAllProduct')
const editProduct = require('../lib/useCases/editProduct')
const deleteProduct = require('../lib/useCases/deleteProduct')
const EleveniaRequest = require('../lib/requests/EleveniaRequest')
const productRepository = new EleveniaRequest()

module.exports = {
  async fetchAllProduct() {
    const products = await fetchAllProduct({ productRepository })

    return products
  },

  async editProduct(id) {},

  async deleteProduct(id) {},
}
