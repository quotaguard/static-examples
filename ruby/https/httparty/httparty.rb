#!/usr/bin/env ruby

require 'httparty'
require 'uri'

raise 'Missing environment variable' unless ENV['QUOTAGUARDSTATIC_URL']
quotaguard = URI.parse(ENV["QUOTAGUARDSTATIC_URL"])

result = HTTParty.get('https://ip.quotaguard.com', {
  http_proxyaddr: quotaguard.host,
  http_proxyport: quotaguard.port,
  http_proxyuser: quotaguard.user,
  http_proxypass: quotaguard.password
})

puts result.body
