const axios = require('axios')
const MoviesRepository = require('../repositories/MovieRepository')

const url = 'https://www.omdbapi.com'
const apiKey = process.env.API_KEY

module.exports = class extends MoviesRepository {
  constructor() {
    super()
    this.apiKey = apiKey
  }

  async find(string = '', options = {}) {
    const { page = 1 } = options

    console.log(this.apiKey)

    try {
      const data = await axios.get(`${url}/?apiKey=${this.apiKey}&s=${string}&page=${page}`)

      return data
    } catch (e) {
      console.log(e)

      return e
    }
  }

  async getById(id) {
    try {
      const { data } = await axios.get(`${url}/?apiKey=${apiKey}&i=${id}`)

      return data
    } catch (e) {
      console.log(e)

      return e
    }
  }
}
