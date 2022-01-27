Python SFTP (paramiko) QuotaGuard Static Example
--

# Prerequesites
```
pip install paramiko
```

# Run example
```
QUOTAGUARDSTATIC_URL=... bin/qgtunnel python app.py
```

Be sure to set QUOTAGUARDSTATIC_URL to your proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).  Either the HTTP or the SOCKS URL will work because the QGTunnel program will convert to the right port number.

# Test in Docker
```
docker build -t qg-static-python-sftp-paramiko-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-python-sftp-paramiko-example
```
