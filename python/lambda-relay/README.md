Python AWS Lambda Relay QuotaGuard Static Example
--

A small forwarding function for platforms that can make outbound HTTP calls but cannot set an HTTP proxy (Zoho Deluge, Bubble, Zapier, and similar). Your platform calls the Lambda's URL, and the Lambda forwards the request through QuotaGuard so the target API sees your static IPs.

```
Your platform --> Lambda Function URL --> QuotaGuard proxy --> target API
```

Uses only libraries already present in the Lambda Python runtime, so there is nothing to package or install.

# Setup

1. In the AWS console, create a Lambda function with the **Python 3.12** runtime and paste in `lambda_function.py`.

2. Under **Configuration > Environment variables**, add:
   - `QUOTAGUARDSTATIC_URL` — your Connection URL from the [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound)
   - `RELAY_KEY` — a long random string you generate. This is the password for your relay; anyone with the URL and this key can send traffic through your proxy, so keep it secret.

3. Under **Configuration > General configuration**, set the timeout to 30 seconds (the 3-second default is tight for API calls).

4. Under **Configuration > Function URL**, create a function URL with auth type **NONE**. The `RELAY_KEY` check in the code is what protects it.

# Calling the relay

Send your request to the function URL with two extra headers:

- `X-Relay-Key` — your secret key
- `X-Target-URL` — the full URL of the API you want to reach

The method, body, `Content-Type`, and `Authorization` headers are forwarded to the target as-is, and the target's response comes back as the relay's response.

Example from Zoho Deluge:

```javascript
response = invokeUrl
[
    url: "https://<your-function-url>.lambda-url.<region>.on.aws/"
    type: POST
    headers: {"X-Relay-Key": "<your secret>", "X-Target-URL": "https://api.example.com/endpoint", "Content-Type": "application/json"}
    parameters: payload.toString()
];
```

Or with curl:

```
curl https://<your-function-url>.lambda-url.<region>.on.aws/ \
  -H "X-Relay-Key: <your secret>" \
  -H "X-Target-URL: https://ip.quotaguard.com"
```

# Test

Point `X-Target-URL` at `https://ip.quotaguard.com` (as in the curl example above). It returns the IP your request came from, which should be one of the two static IPs shown in your dashboard. Those two IPs are what you give the target API for its allowlist; both are active, so allowlist both.
