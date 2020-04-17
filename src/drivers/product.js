module.exports = {
  name: 'products',
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/product',
        handler: (request, h) => {
          return 'product list'
        },
      },
      {
        method: 'PATCH',
        path: '/product/{id}/edit',
        handler: (request, h) => {
          return 'edit product'
        },
      },
      {
        method: 'DELETE',
        path: '/product/{id}/delete',
        handler: (request, h) => {
          return 'delete product'
        },
      },
    ])
  },
}
