Node MongoDB QuotaGuard Static Example

# Test in Docker
```
docker build -t qg-static-node-mongodb-example .
docker run -e QUOTAGUARDSTATIC_URL=... -e MONGO_URI=... qg-static-node-mongodb-example
```