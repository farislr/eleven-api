const findMovies = require('../lib/useCases/findMovies')
const getMovie = require('../lib/useCases/getMovie')
const createSearchLog = require('../lib/useCases/createSearchLog')
const OmdbRequest = require('../lib/requests/OmdbRequest')
const SearchLogStorage = require('../lib/storages/SearchLogStorage')

const movieRepository = new OmdbRequest()
const searchLogRepository = new SearchLogStorage()

module.exports = {
  async findMovies(string, options) {
    const movies = await findMovies(string, options, { movieRepository })

    const {
      data,
      config: { url },
    } = movies

    await createSearchLog(url, string, { searchLogRepository })

    return data
  },

  async getMovie(id) {
    const movie = await getMovie(id, { movieRepository })

    return movie
  },
}
