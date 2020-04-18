const axios = require('axios').default
const xmlParser = require('xml2json')
const ProductRepository = require('../repositories/ProductRepository')

const instance = axios.create({
  baseURL: 'http://api.elevenia.co.id/rest/',
  headers: {
    openapikey: process.env.ELEVENIA_API_KEY,
  },
})

module.exports = class extends ProductRepository {
  constructor() {
    super()
    this.instance = instance
  }

  async fetchAllProduct(options) {
    const { page = 1 } = options

    try {
      const { data } = await this.instance.get(`prodservices/product/listing?page=${page}`)

      const products = JSON.parse(xmlParser.toJson(data)).Products.product || []

      return products
    } catch (e) {
      console.log(e)

      return e
    }
  }

  async fetchProductDetail(id) {
    try {
      const { data } = await this.instance.get(`prodservices/product/details/${id}`)

      const product = JSON.parse(xmlParser.toJson(data)).Product

      return product
    } catch (e) {
      console.log(e)

      return e
    }
  }
}
