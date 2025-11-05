const { PrismaClient } = require('@prisma/client')

async function main() {
  try {
    console.log('Testing Prisma connection through QGTunnel...')
    
    // Create fresh client for each operation
    const prisma = new PrismaClient()
    
    // Test the connection
    await prisma.$connect()
    console.log('✅ Connected to database through QGTunnel')
    
    await prisma.$disconnect()
    console.log('✅ Connection closed successfully')
    
    console.log('🎉 Prisma + QGTunnel proxy connection verified!')
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  }
}

main()