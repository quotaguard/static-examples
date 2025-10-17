FROM ruby:latest

WORKDIR /app/

# Update the package list
RUN apt-get update -qq && apt-get install -y curl

# Install net-ldap gem
RUN gem install net-ldap

# Download and extract QGTunnel software
RUN curl https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz | tar xz

# Environment variables (can be overridden at runtime)
ENV QGTUNNEL_DEBUG=true

COPY ldap.rb ldap.rb

CMD ["bin/qgtunnel", "ruby", "ldap.rb"]
