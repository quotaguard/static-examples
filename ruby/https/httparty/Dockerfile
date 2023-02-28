FROM ruby:latest

WORKDIR /app/

RUN gem install httparty

COPY httparty.rb httparty.rb

ENTRYPOINT [ "ruby", "httparty.rb" ]
