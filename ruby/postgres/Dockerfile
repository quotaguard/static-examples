# Start from a Ruby base image
FROM ruby:latest

# Update the package list
RUN apt-get update -qq && apt-get install -y curl

# Set the working directory
WORKDIR /usr/src/app

# Download and extract QGTunnel software
RUN curl https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz | tar xz

# Install pg gem
RUN gem install pg

# Copy your Ruby script into the Docker image
COPY app.rb .

# Copy the QGTunnel configuration file into the Docker image (uncomment if you have a configuration file)
# COPY .qgtunnel .


# Set the command to run the QGTunnel process and your Ruby script
CMD ["bin/qgtunnel", "ruby", "app.rb"]