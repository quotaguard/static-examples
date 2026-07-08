import os, base64
import urllib3
from urllib.parse import urlparse, unquote

# urllib3 does not send credentials embedded in the proxy URL,
# so split them out and pass explicit Proxy-Authorization headers.
qg = urlparse(os.environ["QUOTAGUARDSTATIC_URL"])
proxy = urllib3.ProxyManager(
    f"http://{qg.hostname}:{qg.port}",
    proxy_headers=urllib3.make_headers(
        proxy_basic_auth=f"{unquote(qg.username)}:{unquote(qg.password)}"
    ),
)


def lambda_handler(event, context):
    headers = event.get("headers") or {}

    # Reject calls that don't carry your secret key
    if headers.get("x-relay-key") != os.environ["RELAY_KEY"]:
        return {"statusCode": 403, "body": "Forbidden"}

    target = headers.get("x-target-url")
    if not target:
        return {"statusCode": 400, "body": "Missing X-Target-URL header"}

    method = event.get("requestContext", {}).get("http", {}).get("method", "GET")
    body = event.get("body")
    if body and event.get("isBase64Encoded"):
        body = base64.b64decode(body)

    # Pass through the headers the target API needs
    fwd = {}
    for name in ("content-type", "authorization"):
        if name in headers:
            fwd[name] = headers[name]

    resp = proxy.request(method, target, body=body, headers=fwd, timeout=30.0)
    return {
        "statusCode": resp.status,
        "headers": {"Content-Type": resp.headers.get("Content-Type", "application/json")},
        "body": resp.data.decode("utf-8", errors="replace"),
    }
