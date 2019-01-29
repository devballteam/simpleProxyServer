const http = require('http');
const port = process.env.PORT || 3004;

http.createServer((clientReq, clientRes) => {
  const [hostname, reqPort] = clientReq.headers.host.split(':');

  console.log('Proxy:', clientReq.headers.host, clientReq.url);

  const options = {
    hostname,
    port: reqPort || 80,
    path: clientReq.url,
    method: clientReq.method,
    headers: clientReq.headers
  };

  if (hostname !== 'localhost') {
  const proxy = http.request(options, (res) => {
    clientRes.writeHead(res.statusCode, res.headers)
    res.pipe(clientRes, { end: true });
  });

  clientReq.pipe(proxy, { end: true });
  } else {
    clientRes.end('Proxy is running on localhost');
  }
}).listen(port);
console.log('Proxy started at port:', port);
