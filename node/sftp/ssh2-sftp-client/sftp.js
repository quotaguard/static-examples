import { parse } from "url";
import { readFile } from "fs";

var proxy = parse(process.env.QUOTAGUARDSTATIC_URL);
var puser = proxy.auth.split(':')[0];
var ppass = proxy.auth.split(':')[1];

import { SocksClient } from 'socks';
import SFTPClient from 'ssh2-sftp-client';

const host = 'test.rebex.net';
const port = 22; // default SSH/SFTP port on remote server

// connect to SOCKS 5 proxy
const { socket } = await SocksClient.createConnection({
  proxy: {
    host: proxy.hostname,
    port: 1080, // proxy port
    userId: puser,
    password: ppass,
    type: 5, // for SOCKS v5
  },
  command: 'connect',
  destination: { host, port } // the remote SFTP server
});

const client = new SFTPClient();
client.connect({
  host,
  sock: socket, // pass the socket to proxy here (see ssh2 doc)
  username: 'demo',
  password: 'password'
}).then(() => {
  console.log("Connected, downloading readme.txt");
  return client.get("readme.txt", "readme.txt");
})
.then(() => {
  console.log("File Downloaded!");
  client.end();
  readFile("readme.txt", function(err, data){
    err ? Function("error","throw error")(err) : console.log(data.toString('utf8'));
  });
})
.catch(err => {
  console.error(err.message);
});


