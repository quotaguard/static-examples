const url = require('url');
const pg = require('pg');
const socks = require('socks');

const proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
const pgurl = url.parse(process.env.DATABASE_URL);

const config = {
  database: {
    username: pgurl.auth.split(':')[0],
    password: pgurl.auth.split(':')[1],
    host: pgurl.hostname,
    port: parseInt(pgurl.port),
    database: pgurl.path.substring(1),
  },
  proxy: {
    host: proxy.hostname,
    port: 1080,
    username: proxy.auth.split(':')[0],
    password: proxy.auth.split(':')[1],
  },
}

async function connectWithSocksNpmPackage() {
  try {
    console.log("Setting up proxy connection...")

    const info = await socks.SocksClient.createConnection({
      proxy: {
        type: 5,
        host: config.proxy.host,
        port: config.proxy.port,
        userId: config.proxy.username,
        password: config.proxy.password,
      },
      command: "connect",
      destination: {
        host: config.database.host,
        port: config.database.port,
      },
    })

    console.log("Setting up database client...")


    const client = new pg.Client({
      host: config.database.host,
      port: config.database.port,
      user: config.database.username,
      password: config.database.password,
      database: config.database.database,
      stream: info.socket,
    })

    client.connect()

    console.log("Querying database...")

    const res = await client.query("SELECT inet_client_addr()")

    console.log(res.rows)

    client.end()
  } catch (err) {
    console.log(err)
  }
}

connectWithSocksNpmPackage()
