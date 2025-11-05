FROM node:latest

WORKDIR /app

RUN curl https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz | tar xz

COPY package*.json ./
COPY schema.prisma ./
COPY index.js ./

RUN npm install
RUN npx prisma generate

CMD ["bin/qgtunnel", "node", "index.js"]
