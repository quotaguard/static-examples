Python HTTPS w/ Selenium QuotaGuard Static Example
--

# Run example
```
QUOTAGUARDSTATIC_URL=... bin/qgpass python app.py
```

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-python-https-selenium-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-python-https-selenium-example
```
