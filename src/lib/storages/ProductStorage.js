const ProductRepository = require('../repositories/ProductRepository')

module.exports = class extends ProductRepository {
  constructor() {
    super()
  }

  storeAllProduct(userEntity) {}

  editProduct(id) {}

  deleteProduct(id) {}
}
