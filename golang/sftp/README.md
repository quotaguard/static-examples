# Golang SFTP with QuotaGuard Static Example

This example demonstrates connecting to an SFTP server via a QuotaGuard Static SOCKS5 proxy. It connects to the public Rebex SFTP server and reads the contents of `readme.txt`.

## Prerequisites

- Golang
- Docker (optional)

## Run Example (Without Docker)

1. Place the code in a file named `app.go`.
2. Download dependencies:
   ```bash
   go mod tidy
   ```
3. Run the example by setting your proxy URL (format: socks5://username:password@host:port):
    ```bash
    QUOTAGUARDSTATIC_URL="socks5://username:password@host:port" go run app.go
    ```

# Test in Docker
```
docker build -t qg-static-golang-sftp-example .
docker run -e QUOTAGUARDSTATIC_URL=... qg-static-golang-sftp-example
```