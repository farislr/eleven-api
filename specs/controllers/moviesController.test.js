const { findMovies, getMovie } = require('../../src/controllers/moviesController')
const OmdbRequest = require('../../src/lib//requests/OmdbRequest')
const createSearchLog = require('../../src/lib/useCases/createSearchLog')

jest.mock('../../src/lib/requests/OmdbRequest.js', () => {
  return jest.fn().mockImplementation(() => {
    const data = { search: [] }
    const config = { url: 'http://localhost:3000/movies/search?apiKey=faf7e5bb&s=batman' }
    const mockFind = jest.fn().mockImplementation(async () => Promise.resolve({ data, config }))
    const mockGet = jest.fn().mockImplementation(async () => Promise.resolve(data))

    return {
      find: mockFind,
      getById: mockGet,
    }
  })
})

jest.mock('../../src/lib/useCases/createSearchLog.js')

describe('find movies', () => {
  it('called the request and create log', async () => {
    await findMovies('batman')

    expect(OmdbRequest).toHaveBeenCalled()
    expect(createSearchLog).toHaveBeenCalled()
  })
})

describe('get movie detail', () => {
  it('called the request', async () => {
    await getMovie('123')

    expect(OmdbRequest).toHaveBeenCalled()
  })
})
