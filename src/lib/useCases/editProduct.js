module.exports = (id, payload, { productRepository }) => {
  return productRepository.editProduct(id, payload)
}
