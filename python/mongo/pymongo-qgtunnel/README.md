Python MongoDB (pymongo) QuotaGuard Static Example
--

# Prerequesites
```
RUN pip install --no-cache-dir pymongo
RUN curl https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz | tar xz
```

# Run example
```
QUOTAGUARDSTATIC_URL=... bin/qgtunnel python app.py
```

Be sure to set QUOTAGUARDSTATIC_URL to your proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).

# Test in Docker
```
docker build -t qg-static-python-mongo-pymongo-example .
docker run -e QUOTAGUARDSTATIC_URL=... -e MONGO_URI=... qg-static-python-mongo-pymongo-example
```
