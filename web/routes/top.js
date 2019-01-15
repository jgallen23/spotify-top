// search page for:
//
exports.post = {
  path: '/top',
  method: 'get',
  config: {
    auth: false
  },
  async handler(request, h) {
    const server = request.server;
    const token = request.state.token;
    if (!token) {
      return h.redirect('/spotify');
    }
    return 'ok';
  }
};
