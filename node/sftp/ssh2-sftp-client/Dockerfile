FROM node:latest

COPY sftp.js /app/sftp.js
COPY package.json /app/package.json

WORKDIR /app/

RUN npm install ssh2-sftp-client socks

ENTRYPOINT [ "node", "sftp.js" ]
