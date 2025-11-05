NodeJS Prisma PostgreSQL QGTunnel QuotaGuard Static Example
--

# Run example
```
docker build -t qg-static-prisma-example .
docker run -e QUOTAGUARDSTATIC_URL=... -e DATABASE_URL=... qg-static-prisma-example
```

Be sure to set QUOTAGUARDSTATIC_URL to your HTTP proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

**Important:** Due to Prisma's architecture, you must use QGTunnel's direct tunnel endpoint rather than relying on transparent mode DNS overrides.

For example, if your original database URL is:
```
postgresql://user:pass@aws-0-us-east-1.pooler.supabase.com:6543/dbname
```

Use the tunnel endpoint instead:
```
postgresql://user:pass@127.0.0.1:16543/dbname
```

QGTunnel maps configured database endpoints to local ports based on your account's remote configuration.

# Test in Docker
```
docker build -t qg-static-prisma-example .
docker run -e QUOTAGUARDSTATIC_URL=... -e DATABASE_URL=... qg-static-prisma-example
```