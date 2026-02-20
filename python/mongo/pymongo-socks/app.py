"""
MongoDB (PyMongo) via QuotaGuard Static SOCKS5 proxy — pure Python, no QGTunnel.

Usage:
    Set the following environment variables before running:

    QUOTAGUARDSTATIC_URL  Your QuotaGuard Static proxy URL, e.g.:
                          socks5://user:password@eu-west-static-01.quotaguard.com:1080

    MONGO_URI             A standard mongodb:// connection string with explicit hosts, e.g.:
                          mongodb://user:password@host1:27017,host2:27017,host3:27017/
                            ?ssl=true&replicaSet=my-replica-set&authSource=admin

                          NOTE: mongodb+srv:// URIs are NOT supported. Use a standard
                          mongodb:// URI instead. See the README for how to obtain one
                          from your existing mongodb+srv:// URI.

Requirements:
    pip install pymongo PySocks
"""

import os
import socket as _socket
import socks
from urllib.parse import urlparse


def configure_socks_proxy():
    """
    Configure PySocks as the default SOCKS5 proxy and monkey-patch socket.socket
    so that all outgoing TCP connections are routed through QuotaGuard.

    Must be called before importing pymongo (or any other network library).
    """
    proxy_url = os.getenv("QUOTAGUARDSTATIC_URL") or os.getenv("QUOTAGUARD_URL")
    if not proxy_url:
        raise RuntimeError(
            "No proxy URL found. Set the QUOTAGUARDSTATIC_URL environment variable "
            "to your QuotaGuard Static proxy URL."
        )

    proxy = urlparse(proxy_url)
    if proxy.scheme not in ("socks5", "socks5h"):
        raise RuntimeError(
            f"Expected a socks5:// proxy URL, got scheme: {proxy.scheme!r}. "
            f"Check your QUOTAGUARDSTATIC_URL value."
        )
    if not proxy.hostname or not proxy.port:
        raise RuntimeError("Proxy URL is missing a host or port.")

    # Configure PySocks to use this proxy for all new sockets
    socks.set_default_proxy(
        socks.SOCKS5,
        proxy.hostname,
        int(proxy.port),
        rdns=True,           # Resolve hostnames on the proxy side
        username=proxy.username,
        password=proxy.password,
    )

    # Replace socket.socket with socks.socksocket so all connections use the proxy
    _socket.socket = socks.socksocket

    # PyMongo creates sockets with SOCK_CLOEXEC OR'd into the type flag:
    #   socket.socket(af, socktype | getattr(socket, "SOCK_CLOEXEC", 0), proto)
    # This produces a type value of 524289 (SOCK_STREAM | SOCK_CLOEXEC), which
    # ssl.SSLSocket then rejects with "Socket type must be stream or datagram".
    # Removing SOCK_CLOEXEC from the socket module causes PyMongo to fall back to
    # creating plain SOCK_STREAM sockets, which ssl is happy with.
    if hasattr(_socket, "SOCK_CLOEXEC"):
        del _socket.SOCK_CLOEXEC


# ── Patch socket BEFORE importing pymongo ───────────────────────────────────────
configure_socks_proxy()

from pymongo import MongoClient  # noqa: E402


def main():
    mongo_uri = os.environ.get("MONGO_URI")
    if not mongo_uri:
        raise RuntimeError(
            "No MongoDB URI found. Set the MONGO_URI environment variable to a "
            "standard mongodb:// connection string."
        )

    if mongo_uri.startswith("mongodb+srv://"):
        raise RuntimeError(
            "mongodb+srv:// URIs are not supported. "
            "Please convert it to a standard mongodb:// URI first. "
            "See the README for instructions."
        )

    print("Connecting to MongoDB via QuotaGuard SOCKS5 proxy...")
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=10000)

    result = client.admin.command("ping")
    print(f"MongoDB ping: {result}")
    print("✓ Successfully connected to MongoDB through QuotaGuard Static")


if __name__ == "__main__":
    main()
