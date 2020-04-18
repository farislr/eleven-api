const ProductRepository = require('../repositories/ProductRepository')
const Product = require('../../drivers/models/Product')

module.exports = class extends ProductRepository {
  constructor() {
    super()
    this.model = Product
  }

  async storeAllProduct(productEntity) {
    const allProduct = await this.model.findAll()

    for (let i = 0; i < allProduct.length; i++) {
      const product = allProduct[i]
      for (let j = 0; j < productEntity.length; j++) {
        const entity = productEntity[j]

        if (entity.sku === product.sku) {
          productEntity.splice(j, 1)
          break
        }
      }
    }

    await this.model.bulkCreate(productEntity)

    return allProduct
  }

  async editProduct(id, data) {
    const updated = await this.model.update(data, { where: { id }, returning: true })

    return updated
  }

  async deleteProduct(id) {
    const deleted = await this.model.destroy({ where: { id } })

    return deleted
  }
}
