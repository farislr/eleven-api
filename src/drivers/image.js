module.exports = {
  name: 'image',
  register: async (server) => {
    server.route([
      {
        method: 'GET',
        path: '/image/{file*}',
        handler: {
          directory: {
            path: 'src/public/images',
          },
        },
      },
    ])
  },
}
