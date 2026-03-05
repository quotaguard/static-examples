Java HTTPS Jsoup Request QuotaGuard Static Example
--

This example demonstrates making HTTPS requests through QuotaGuard Static using [Jsoup](https://jsoup.org/).

Jsoup uses Java's built-in `HttpURLConnection` under the hood, so the standard Java proxy system properties apply. For HTTPS to work through an authenticated proxy, you must:

1. Set both `http.proxyHost`/`http.proxyPort` and `https.proxyHost`/`https.proxyPort`
2. Set `jdk.http.auth.tunneling.disabledSchemes` to `""` (empty string) — Java 8u111+ disables Basic auth for HTTPS proxy tunneling by default
3. Configure an `Authenticator` that responds to `PROXY` authentication requests

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-java-jsoup-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-java-jsoup-example
```
