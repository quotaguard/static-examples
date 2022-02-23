FROM node:latest

COPY pg.js /app/pg.js

WORKDIR /app/

RUN npm install pg socks

ENTRYPOINT [ "node", "pg.js" ]
