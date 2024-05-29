Ruby PostgresSQL QuotaGuard Static Example w/ QGTunnel
--

# Prerequesites
```
# install QGTunnel
curl https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz | tar xz

# Setup Tunnel in QuotaGuard Dashboard
https://dash.quotaguard.com/setup/tunnels (or provide `.qgtunnel` file)
```

# Test in Docker
```
docker build -t qg-static-ruby-postgres-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-ruby-postgres-example
```
