FROM ruby:latest

WORKDIR /app/

RUN gem install socksify curb

COPY ftp.rb ftp.rb

CMD ["ruby", "ftp.rb"]