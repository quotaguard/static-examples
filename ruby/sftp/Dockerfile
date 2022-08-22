FROM ruby:latest

WORKDIR /app/

RUN gem install net-sftp

COPY sftp.rb sftp.rb

ENTRYPOINT [ "ruby", "sftp.rb" ]
