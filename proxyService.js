const http = require('http');

module.exports = (req, res) => {
  console.log('Proxy:', req.url);
  const options = {
    hostname: req.urlObj.hostname,
    port:     req.urlObj.port || 80,
    path:     req.url,
    method:   req.method,
    headers:  req.headers
  };
  const proxy = http.request(options, (response) => {
    res.writeHead(response.statusCode, response.headers)
    response.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });
};
