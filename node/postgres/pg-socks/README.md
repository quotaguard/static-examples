NodeJS Postgres SOCKS QuotaGuard Static Example
--

# Prerequesites
```
npm install pg socks
```

# Run example
```
QUOTAGUARDSTATIC_URL=... DATABASE_URL=... node pg.js
```

Be sure to set QUOTAGUARDSTATIC_URL to your HTTP proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-node-pg-socks-example .
docker run -e QUOTAGUARDSTATIC_URL=... -e DATABASE_URL=... qg-static-node-pg-socks-example
```
