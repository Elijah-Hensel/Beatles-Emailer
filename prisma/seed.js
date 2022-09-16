const { PrismaClient } = require('@prisma/client')
const { users, messages } = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.user.deleteMany()
    console.log('Deleted records in user table')

    await prisma.message.deleteMany()
    console.log('Deleted records in message table')

    users.forEach(async (user) => {
      console.log(`Creating user ${user.name}...`)
      await prisma.user.create({
        data: user,
      })
      console.log(`User ${user.name} created!~`)
    })

    messages.forEach(async (message) => {
      console.log(`Creating message ${message.message}...`)
      await prisma.message.create({
        data: message
      })
      console.log(`Message ${message.message} created!~`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
