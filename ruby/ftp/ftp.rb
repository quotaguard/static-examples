#!/usr/bin/env ruby

require 'curb'
require 'uri'

proxy_uri = URI(ENV['QUOTAGUARDSTATIC_URL'])

c = Curl::Easy.new do |curl|
  curl.proxy_url = proxy_uri.to_s
end

# List files
c.url = "ftp://ftp.gnu.org/"
c.perform
puts c.body_str

# Retrieve README
c.url = "ftp://ftp.gnu.org/README"
c.perform

# Write the README file to a local file
File.open("README", "w") do |file|
  file.write(c.body_str)
end