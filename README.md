# [simpleProxyServer](https://github.com/devballteam/simpleProxyServer)

## TODO
- HTTPS proxy

## Setup server:
```
npm install
node index.js (or pm2 start index.js --name proxy)
```

## Usage:
### Setup proxy in MacOS
Instruction for this is available here:
[https://support.apple.com/en-ca/guide/mac-help/enter-proxy-server-settings-on-mac-mchlp2591/mac](https://support.apple.com/en-ca/guide/mac-help/enter-proxy-server-settings-on-mac-mchlp2591/mac)

PAC file will be served on this URL: [http://{SERVER_URL}/pacFile](http://{SERVER_URL}/pacFile)
You can pass wildcard parameter and proxy will be used only for this domain.
Example: [http://{SERVER_URL}/pacFile?wildcard=*.test.com,*.pl](http://{SERVER_URL}/pacFile?wildcard=*.test.com,*.pl)

### Use proxy in terminal application
Terminal application are not using proxy defined in system and you have to setup it by:
```
export http_proxy=http://{SERVER_URL}
export HTTP_PROXY=http://{SERVER_URL}
```
where {SERVER_URL} is server hostname with port.
Then all http request will going through this proxy.

You can exclude which domains shouldn't go through proxy by:
```
export no_proxy=localhost,127.0.0.1,*.my.company.lan
```

