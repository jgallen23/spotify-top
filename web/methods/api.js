module.exports = {
  method(endpoint, options) {
    const server = this;
    const url = `${server.settings.app.envVars.apiHost}/api${endpoint}`;
    return server.req.get(url, options);
  },
  options: {
    generateKey(endpoint, options) {
      const server = this;
      // the query data should be added to the url to make a unique cache key
      const url = `${server.settings.app.envVars.apiHost}/api${endpoint}?${JSON.stringify(options.query)}`;
      return url;
    },
    cache: {
      generateTimeout: 5000,
      expiresIn: 60000 * 5 // 5 minutes
    }
  }
};
