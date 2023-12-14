FROM ruby:latest

WORKDIR /app/

RUN gem install rest-client

# Copy qgpass into the Docker image
COPY bin/qgpass bin/qgpass

# Make qgpass executable
RUN chmod +x bin/qgpass

COPY restclient.rb restclient.rb

ENTRYPOINT [ "bin/qgpass", "ruby", "restclient.rb" ]