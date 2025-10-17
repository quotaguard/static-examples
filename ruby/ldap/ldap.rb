#!/usr/bin/env ruby

require 'net/ldap'

# Check for required environment variable
unless ENV['QUOTAGUARDSTATIC_URL']
  puts "✗ Error: QUOTAGUARDSTATIC_URL environment variable is required"
  puts "Please set your QuotaGuard Static URL:"
  puts "  export QUOTAGUARDSTATIC_URL='your-quotaguard-static-url'"
  puts "  or"
  puts "  docker run -e QUOTAGUARDSTATIC_URL='your-url' ruby-ldap-example"
  exit 1
end

puts "Using QuotaGuard Static URL: #{ENV['QUOTAGUARDSTATIC_URL'].gsub(/\/\/.*@/, '//***:***@')}"
puts

# Using a publicly available LDAP test server
ldap_host = 'ldap.forumsys.com' # This is a demo LDAP server provided by Forumsys for testing
ldap_port = 1389 # Local Port for QGTunnel
base_dn = 'dc=example,dc=com'

# Create LDAP connection
ldap = Net::LDAP.new(
  host: ldap_host,
  port: ldap_port,
  base: base_dn,
  auth: {
    method: :simple,
    username: 'cn=read-only-admin,dc=example,dc=com',
    password: 'password'
  },
  connect_timeout: 10,
  operation_timeout: 30
)

begin
  puts "Connecting to LDAP server: #{ldap_host}:#{ldap_port}"
  puts "Base DN: #{base_dn}"
  puts "Authentication: read-only-admin"
  puts

  # Test the connection
  if ldap.bind
    puts "✓ Successfully connected and authenticated to LDAP server"
    puts

    # Search for all entries (using a more appropriate filter)
    puts "Searching for all entries in the directory..."
    filter = Net::LDAP::Filter.present('objectClass')
    
    entry_count = 0
    ldap.search(filter: filter, size: 20) do |entry|
      entry_count += 1
      puts "Entry #{entry_count}: #{entry.dn}"
      
      # Display some common attributes
      if entry['cn'] && !entry['cn'].empty?
        puts "  Common Name (CN): #{entry['cn'].first}"
      end
      
      if entry['uid'] && !entry['uid'].empty?
        puts "  User ID (UID): #{entry['uid'].first}"
      end
      
      if entry['mail'] && !entry['mail'].empty?
        puts "  Email: #{entry['mail'].first}"
      end
      
      if entry['objectClass'] && !entry['objectClass'].empty?
        puts "  Object Classes: #{entry['objectClass'].join(', ')}"
      end
      
      puts
    end
    
    puts "Found #{entry_count} entries in the directory"
    puts

    # Search for specific users
    puts "Searching for users with uid attribute..."
    user_filter = Net::LDAP::Filter.present('uid')
    
    user_count = 0
    ldap.search(filter: user_filter, size: 10) do |entry|
      user_count += 1
      uid = entry['uid'] && !entry['uid'].empty? ? entry['uid'].first : 'unknown'
      puts "User #{user_count}: #{uid} (#{entry.dn})"
    end
    
    puts "Found #{user_count} users in the directory"

  else
    puts "✗ Failed to connect or authenticate to LDAP server"
    puts "Error: #{ldap.get_operation_result.message}"
    exit 1
  end

rescue => e
  puts "✗ Error occurred during LDAP operation:"
  puts "Error: #{e.message}"
  exit 1
end

puts "\n✓ LDAP test completed successfully!"
