// github will pass the access token back to here after oauth:
exports.post = {
  path: '/spotify',
  method: 'get',
  config: {
    auth: 'spotify'
  },
  handler(request, h) {
    console.log(request.auth.credentials);
    return h.redirect('/top').state('token', request.auth.credentials.token);
  }
};
