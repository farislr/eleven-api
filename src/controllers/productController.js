const fs = require('fs')
const path = require('path')

const fetchAllProduct = require('../lib/useCases/fetchAllProduct')
const getAllProduct = require('../lib/useCases/getAllProduct')
const getProductById = require('../lib/useCases/getProductById')
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

const handleImageUpload = (file) =>
  new Promise((resolve, reject) => {
    const imagePath = path.join(__dirname, '../public/images')
    const filename = file.hapi.filename
    const data = file._data

    const uploadPath = `${imagePath}/${filename}`

    fs.writeFile(uploadPath, data, (err) => {
      if (err) {
        reject(err)
      }
      resolve(filename)
    })
  })

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

    const result = await storeAllProduct(products, { productRepository })

    return result
  },

  async editProduct(id, request) {
    try {
      const filename = await handleImageUpload(request.payload.image)
      const imageURL = `${request.server.info.uri}/image/${filename}`

      Object.assign(request.payload, { image: imageURL })

      const editedProduct = await editProduct(id, request.payload, { productRepository })

      if (editedProduct[0]) {
        return editedProduct[1][0]
      } else {
        return generateResponse(true, editedProduct, 'Error occured', { responseParser })
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

  async getAllProduct() {
    try {
      const allProduct = await getAllProduct({ productRepository })

      return generateResponse(false, allProduct, 'Success', { responseParser })
    } catch (e) {
      console.log(e)

      return e
    }
  },

  async getProductById(id) {
    try {
      const product = await getProductById(id, { productRepository })

      return generateResponse(false, product, 'Success', { responseParser })
    } catch (e) {
      console.log(e)

      return e
    }
  },
}
