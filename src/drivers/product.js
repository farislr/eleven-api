const { storeAllProduct, editProduct, deleteProduct, getAllProduct, getProductById } = require('../controllers/productController')

module.exports = {
  name: 'products',
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/product/fetch',
        handler: async (request, h) => {
          const options = {
            page: request.query.page,
          }
          return await storeAllProduct(options)
        },
      },
      {
        method: 'PATCH',
        path: '/product/{id}/edit',
        handler: async (request, h) => {
          const { id } = request.params

          return await editProduct(id, request.payload)
        },
      },
      {
        method: 'DELETE',
        path: '/product/{id}/delete',
        handler: async (request, h) => {
          return await deleteProduct(request.params.id)
        },
      },
      {
        method: 'GET',
        path: '/product',
        handler: async (request, h) => {
          return await getAllProduct()
        },
      },
      {
        method: 'GET',
        path: '/product/{id}',
        handler: async (request, h) => {
          return await getProductById(request.params.id)
        },
      },
    ])
  },
}
