const axios = require('axios').default
const xmlParser = require('xml2json')
const ProductRepository = require('../repositories/ProductRepository')

const instance = axios.create({
  baseURL: 'http://api.elevenia.co.id/rest/',
  timeout: 1000,
  headers: {
    openapikey: process.env.ELEVENIA_API_KEY,
  },
  responseType: 'document',
})

module.exports = class extends ProductRepository {
  constructor() {
    super()
    this.instance = instance
  }

  async fetchAllProduct() {
    try {
      const { data } = await this.instance.get('cateservice/category')

      const products = JSON.parse(xmlParser.toJson(data))['ns2:categorys']['ns2:category'] || []

      return products
    } catch (e) {
      console.log(e)

      return e
    }
  }
}
