NodeJS HTTPS Axios QuotaGuard Static Example
--

# Prerequesites
```
npm install axios
```

# Run example
```
QUOTAGUARDSTATIC_URL=... node https.js
```

Be sure to set QUOTAGUARDSTATIC_URL to your HTTP proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-node-https-axios-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-node-https-axios-example
```
