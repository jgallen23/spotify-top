// main login page
exports.home = {
  path: '/',
  method: 'get',
  config: {
    auth: false
  },
  handler(request, h) {
    //TODO: check if cookie token
    return h.view('home', {});
  }
};
