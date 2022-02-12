FROM node:latest

COPY sftp.js /app/sftp.js

WORKDIR /app/

RUN npm install @chilkat/ck-node17-linux64

ENTRYPOINT [ "node", "sftp.js" ]
