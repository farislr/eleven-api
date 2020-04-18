const fetchAllProduct = require('../lib/useCases/fetchAllProduct')
const storeAllProduct = require('../lib/useCases/storeAllProduct')
const fetchProductDetail = require('../lib/useCases/fetchProductDetail')
const editProduct = require('../lib/useCases/editProduct')
const deleteProduct = require('../lib/useCases/deleteProduct')
const generateResponse = require('../lib/useCases/generateResponse')

const EleveniaRequest = require('../lib/requests/EleveniaRequest')
const ProductStorage = require('../lib/storages/ProductStorage')
const ResponseParser = require('../lib/helper/responseParser')

const productRequest = new EleveniaRequest()
const productRepository = new ProductStorage()
const responseParser = new ResponseParser()

module.exports = {
  async storeAllProduct(options) {
    let products = (await fetchAllProduct(options, { productRequest })) || []

    products = await Promise.all(
      products.map(async (product) => {
        const detail = await fetchProductDetail(product.prdNo, { productRequest })

        return {
          name: product.prdNm,
          sku: product.prdNo,
          image: detail.prdImage01,
          description: detail.asDetail,
          price: detail.selPrc,
        }
      })
    )

    storeAllProduct(products, { productRepository })

    return products
  },

  async editProduct(id, data) {
    try {
      const editedProduct = await editProduct(id, data, { productRepository })

      if (editedProduct[0]) {
        return editedProduct[1][0]
      } else {
        return generateResponse(true, editedProduct, 'Error occured')
      }
    } catch (e) {
      return e
    }
  },

  async deleteProduct(id) {
    try {
      const deletedProduct = await deleteProduct(id, { productRepository })

      if (deletedProduct) {
        const response = generateResponse(false, deletedProduct, 'Delete success', { responseParser })

        return response
      } else {
        return generateResponse(true, deletedProduct, 'ID not found', { responseParser })
      }
    } catch (e) {
      console.log(e)

      return e
    }
  },
}
