require 'pg'

begin
  connection = PG.connect(
    dbname: ENV['RDS_DB_NAME'],
    user: 'postgres',
    password: ENV['RDS_PASSWORD'],
    host: '127.0.0.1',
    port: 5432,
    connect_timeout: 60
  )

  puts "Successfully connected to the database"
  
  # Run a simple query to verify
  result = connection.exec("SELECT 1")
  result.each do |row|
    puts row
  end

rescue PG::Error => e
  puts "Error connecting to the database: #{e.message}"
ensure
  connection.close if connection
end