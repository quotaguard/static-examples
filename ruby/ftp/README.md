Ruby FTP QuotaGuard Static Example
--

# Prerequesites
```bash
# curb Gem
gem install curb
```

# Run example
```
QUOTAGUARDSTATIC_URL=... ruby ftp.rb
```

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-ruby-ftp-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-ruby-ftp-example
```
