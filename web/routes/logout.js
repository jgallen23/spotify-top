// will redirect to github auth and then to /github:
exports.logout = {
  path: '/logout',
  method: 'get',
  config: {
    auth: false
  },
  handler(request, h) {
    return h.redirect('/').unstate('token');
  }
};
