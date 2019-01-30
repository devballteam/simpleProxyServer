const port = process.env.PORT || 3004;
const http = require('http');
const os = require('os');
const url = require('url');
const servePacFile = require('./servePacFile');
const serveReadMe = require('./serveReadMe');
const proxyService = require('./proxyService');
const ifaceName = process.env.IFACE || 'en0';
const serverIp = os.networkInterfaces()[ifaceName].filter(iface => iface.family === 'IPv4')[0].address;

http.createServer((req, res) => {
  req.url = req.url || '';
  const protocol = req.url.length && req.url[0] === '/' ? 'http://' : '';
  req.urlObj = url.parse(protocol + req.headers.host + req.url);

  if ([`localhost:${port}`, `${serverIp}:${port}`].includes(req.urlObj.host)) {
    console.log(req.urlObj.pathname);
    switch(req.urlObj.pathname) {
      case '/':
        serveReadMe(req, res, serverIp, port)
        break;
      case '/pacFile':
        servePacFile(req, res, serverIp, port)
        break;
      default:
        console.log('Not supported');
    }
  } else {
    console.log('Proxy');
    proxyService(req, res);
  }
}).listen(port);
console.log(`Proxy is working on: ${serverIp}:${port}`);
