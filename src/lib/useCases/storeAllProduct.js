module.exports = (productEntity, { productRepository }) => {
  return productRepository.storeAllProduct(productEntity)
}
