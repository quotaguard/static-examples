NodeJS SFTP with ssh2-sftp-client QuotaGuard Static Example
--

# Prerequesites
```
npm install ssh2-sftp-client socks
```

# Run example
```
QUOTAGUARDSTATIC_URL=... node sftp.js
```

Be sure to set QUOTAGUARDSTATIC_URL to your HTTP or SOCKS proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).  The example overrides the port to ensure SOCKS proxy usage.

# Test in Docker
```
docker build -t qg-static-node-sftp-example2 .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-node-sftp-example2
```
