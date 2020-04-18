require('dotenv').config()
const { expect } = require('chai')
const EleveniaRequest = require('../../src/lib/requests/EleveniaRequest')

describe('elevenia request', () => {
  let request

  beforeEach(() => {
    request = new EleveniaRequest()
  })

  describe('get all product', () => {
    it('succeed', async () => {
      const data = await request.fetchAllProduct()

      expect(data).to.be.an('array')
    })
  })

  describe('get product detail', () => {
    it('succeed', async () => {
      const data = await request.fetchProductDetail(28022696)

      expect(data).to.be.an('object')
    })
  })
})
