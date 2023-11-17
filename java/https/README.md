Java HTTPS QuotaGuard Static Example

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-java-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-java-example
```