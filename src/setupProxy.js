const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.2pay.uz',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // API yo'lini o'zgartiring
      },
    })
  );
};
