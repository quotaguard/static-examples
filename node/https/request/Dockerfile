FROM node:latest

COPY https.js /app/https.js

WORKDIR /app/

RUN npm install request

ENTRYPOINT [ "node", "https.js" ]
