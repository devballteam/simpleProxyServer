const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const Remarkable = require('remarkable');
const md = new Remarkable();

module.exports = async (req, res, serverIp, port) => {
  console.log('Serve README');
  const readMe = await readFile('./README.md', 'utf8');
  const html = `<html><head>
    <title>Simple Proxy Server</title>
    <meta charset="UTF-8">  <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap/3.2.0/css/bootstrap.css">
  </head><body style="width: 80%; margin: auto" class="markdown-body">${md.render(readMe)}</body></html>`;

  res.end(html.replace(/{SERVER_URL}/g, `${serverIp}:${port}`));
};
