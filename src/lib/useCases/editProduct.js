module.exports = (id, data, { productRepository }) => {
  return productRepository.editProduct(id, data)
}
