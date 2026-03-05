Java HTTPS POST Request (HttpURLConnection) QuotaGuard Static Example
--

This example demonstrates making an HTTPS POST request through QuotaGuard Static using Java's built-in `HttpURLConnection`.

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-java-httpurlconnection-post-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-java-httpurlconnection-post-example
```
