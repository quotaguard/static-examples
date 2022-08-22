Ruby SFTP QuotaGuard Static Example
--

# Prerequesites
```bash
# SFTP Gem
gem install net-sftp
```

# Run example
```
QUOTAGUARDSTATIC_URL=... ruby sftp.rb
```

Be sure to set QUOTAGUARDSTATIC_URL to your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-ruby-sftp-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-ruby-sftp-example
```
