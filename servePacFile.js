const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function generateWildcard (value) {
  // if (shExpMatch(host,"*.performfeeds.com")) {
  return `//Use proxy for
        if (shExpMatch(host,"${value}")) {
            return PROXY;
        }
`;
}

module.exports = async (req, res, serverIp, port) => {
  console.log('Serve PAC file');
  const queryObject = (req.urlObj.query || '')
    .split('&')
    .reduce((obj, pair) => {
      const [key, value] = pair.split('=');
      if (key && value) {
        obj[key] = value;
        return obj;
      }
    }, {});
  const wildValues = queryObject && queryObject.wildcard ? queryObject.wildcard.split(',') : [];
  const wildcards = wildValues.reduce((output, value) => output += generateWildcard(value), '');
  const pacContent = `function FindProxyForURL(url, host) {
  PROXY = "PROXY {SERVER_URL}"
  {WILDCARDS}
  // Others
  return {OTHERS} ;
}`;

  res.end(pacContent
    .replace('{WILDCARDS}', wildcards)
    .replace('{SERVER_URL}', `${serverIp}:${port}`)
    .replace('{OTHERS}', wildcards ? '"DIRECT"' : 'PROXY')
  );
};
