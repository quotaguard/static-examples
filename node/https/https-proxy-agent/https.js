var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');

// HTTP/HTTPS proxy to connect to
var proxy = process.env.QUOTAGUARDSTATIC_URL;
console.log('using proxy server %j', proxy);

// HTTPS endpoint for the proxy to connect to
var endpoint = 'https://ip.quotaguard.com';
console.log('attempting to GET %j', endpoint);
var options = url.parse(endpoint);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);
options.agent = agent;

https.get(options, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});
