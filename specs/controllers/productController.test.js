require('dotenv').config()
const { storeAllProduct } = require('../../src/controllers/productController')
const EleveniaRequest = require('../../src/lib/requests/EleveniaRequest')

jest.mock('../../src/lib/requests/EleveniaRequest.js')

describe('product controller', () => {
  describe('fetch all product', () => {
    it('succeed', async () => {
      await storeAllProduct()

      expect(EleveniaRequest).toHaveBeenCalled()
    })
  })
})
