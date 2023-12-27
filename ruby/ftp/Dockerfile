FROM ruby:latest

WORKDIR /app/

RUN gem install curb

COPY ftp.rb ftp.rb

CMD ["ruby", "ftp.rb"]