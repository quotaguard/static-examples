Ruby HTTPS w/ RestClient QuotaGuard Static Example
--

# Run example
```
QUOTAGUARDSTATIC_URL=... ruby restclient.rb
```

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-ruby-restclient-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-ruby-restclient-example
```
