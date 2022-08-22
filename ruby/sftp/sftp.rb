#!/usr/bin/env ruby

require 'net/ssh/proxy/http'
require 'net/sftp'
require 'uri'

quotaguard = URI.parse(ENV["QUOTAGUARDSTATIC_URL"])
proxy = Net::SSH::Proxy::HTTP.new(quotaguard.host, quotaguard.port, user: quotaguard.user, password: quotaguard.password)

Net::SFTP.start('test.rebex.net', 'demo', password: 'password', proxy: proxy) do |sftp|
  sftp.download!('readme.txt', 'readme.txt')
end

if File.exists?('readme.txt')
  puts "Downloaded 'readme.txt' successfully"
  puts "   CONTENTS"
  puts "--------------"
  puts File.read('readme.txt')
  puts "--------------"
else
  puts "MISSING 'readme.txt'"
  exit 1
end
