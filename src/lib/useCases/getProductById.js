module.exports = (id, { productRepository }) => {
  return productRepository.getProductById(id)
}
