Python FTP QuotaGuard Static Example
--

# Prerequesites
```
pip install pyftplib PySocks
```

# Run example
```
QUOTAGUARDSTATIC_URL=... python app.py
```

Be sure to set QUOTAGUARDSTATIC_URL to your proxy URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound).  Either the HTTP or the SOCKS URL will work because the program will convert to the right port number.

# Test in Docker
```
docker build -t qg-static-python-ftp-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-python-ftp-example
```
