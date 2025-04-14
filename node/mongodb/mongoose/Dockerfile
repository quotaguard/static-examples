FROM node:latest

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential curl

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Optionally create sample.txt if it's not already present
RUN echo "Hello, this is a sample test file." > sample.txt

# Install QGTunnel
RUN curl https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz | tar xz

# Set necessary environment variables
ENV QGTUNNEL_DEBUG=true

# Start the application using QGTunnel to proxy the connection
CMD [ "bin/qgtunnel", "node", "index.js" ]
