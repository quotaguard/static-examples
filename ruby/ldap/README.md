Ruby LDAP QuotaGuard Static Example
--

# Prerequisites
```bash
# net-ldap Gem
gem install net-ldap
```

# Run example

## Using Docker (Recommended)
```bash
# Build the image
docker build -t ruby-ldap-example .

# Run with your QuotaGuard Static URL
docker run -e QUOTAGUARDSTATIC_URL="your-quotaguard-static-url" ruby-ldap-example
```

## Running locally
```bash
# Set your QuotaGuard Static URL
export QUOTAGUARDSTATIC_URL="your-quotaguard-static-url"

# Install dependencies
gem install net-ldap

# Run the script
ruby ldap.rb
```

## Required Environment Variables
- **QUOTAGUARDSTATIC_URL**: Your QuotaGuard Static URL (required)
  - Format: `socks5://username:password@proxy-host:port`
  - Example: `socks5://user:pass@proxy.quotaguard.com:1080`

## Optional Environment Variables
- **QGTUNNEL_DEBUG**: Set to `true` for debugging QGTunnel operations (optional, defaults to `true`)

# About this example

This example demonstrates how to connect to an LDAP directory server through QuotaGuard Static using the QGTunnel proxy. 

The example uses a publicly available LDAP test server (ldap.forumsys.com) provided by Forumsys for testing purposes. This server contains sample directory data that can be used for testing LDAP connections.

## LDAP Server Details
- **Host**: ldap.forumsys.com
- **Port**: 389 (standard LDAP port)
- **Base DN**: dc=example,dc=com
- **Bind DN**: cn=read-only-admin,dc=example,dc=com
- **Password**: password

## QGTunnel Configuration Requirements
For this example to work properly, your QGTunnel configuration must include the following settings:

- **Remote Destination**: `tcp://ldap.forumsys.com:389`
- **Local Port**: `1389`
- **Transparent Mode**: `enabled`

This configuration allows the Ruby script to connect to `localhost:1389`, which QGTunnel will transparently forward to `ldap.forumsys.com:389` through your QuotaGuard Static proxy.

## What the example does
1. Establishes a connection to the LDAP server through QGTunnel
2. Authenticates using the read-only admin credentials
3. Searches for all entries in the directory
4. Displays common attributes for each entry (CN, UID, email, object classes)
5. Performs a specific search for users with UID attributes
6. Reports the total number of users found

## Expected Output
The example should successfully connect to the LDAP server and display information about the test users and groups available in the Forumsys test directory.

## Environment Variables
- `QUOTAGUARDSTATIC_URL`: Your QuotaGuard Static URL (required)
- `QGTUNNEL_DEBUG`: Set to `true` for debugging QGTunnel operations (optional)
