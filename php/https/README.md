PHP HTTPS w/ GuzzleHTTP QuotaGuard Static Example
--

# Run example
```
QUOTAGUARDSTATIC_URL=... php https.rb
```

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-php-https-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-php-https-example
```
