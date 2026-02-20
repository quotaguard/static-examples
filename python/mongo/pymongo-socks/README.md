# QuotaGuard Static — Python + MongoDB Example (no QGTunnel)

This example shows how to connect to a MongoDB instance through a QuotaGuard Static
SOCKS5 proxy using pure Python — no QGTunnel wrapper required. This approach is suitable
for environments where you cannot run a wrapper process around your application, such as
**PythonAnywhere**.

## How it works

The script patches Python's `socket` module at startup so that all outgoing TCP connections
are automatically routed through your QuotaGuard Static proxy. This must happen before
`pymongo` (or any other network library) is imported.

## Requirements

```
pip install pymongo PySocks
```

## Environment variables

| Variable | Description |
|---|---|
| `QUOTAGUARDSTATIC_URL` | Your QuotaGuard proxy URL, e.g. `socks5://user:password@eu-west-static-01.quotaguard.com:1080`. Found in your [QuotaGuard Dashboard](https://www.quotaguard.com/setup/outbound). |
| `MONGO_URI` | A standard `mongodb://` connection string with explicit hosts (see below). |

## Getting your `mongodb://` connection string

This script requires a **standard `mongodb://` URI** with explicit hosts. The
`mongodb+srv://` URI that MongoDB Atlas provides by default is not supported here because
its DNS SRV resolution happens outside the proxy.

To get the correct URI, run the following snippet in any environment where you can
currently reach MongoDB (e.g. your local machine or PythonAnywhere without the proxy):

```python
from pymongo import MongoClient

client = MongoClient("mongodb+srv://user:password@your-cluster.mongodb.net/", serverSelectionTimeoutMS=10000)
info = client.admin.command("isMaster")
print("Replica Set:", info.get("setName"))
print("Hosts:", info.get("hosts"))
```

Then build your URI in this format:

```
mongodb://user:password@host1:27017,host2:27017,host3:27017/?ssl=true&replicaSet=<setName>&authSource=admin
```

## Run directly

```bash
QUOTAGUARDSTATIC_URL=socks5://... MONGO_URI=mongodb://... python app.py
```

## Run in Docker

```bash
docker build -t qg-static-python-mongo-example .
docker run \
  -e QUOTAGUARDSTATIC_URL=socks5://... \
  -e MONGO_URI=mongodb://... \
  qg-static-python-mongo-example
```
