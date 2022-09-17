const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

require('dotenv').config()
const SENDER = process.env.sender

let nodemailer = require('nodemailer')

const getUsers = async () =>
  await prisma.user.findMany()

const getMessages = async () => await prisma.message.findMany()

const addMessageToUser = async ({ user, message, allUsers }) => {
  allUsers.forEach((u) => {
    if (user.id === u.id) {
      u.messages.push(message)
    }
  })
}

const userHasReceivedAllMessages = (userMessages, allMessages) =>
  userMessages.length >= allMessages.length

async function main() {
  console.log('sendMailers running...')

  // initialize data from from ORM
  const allMessages = await getMessages()
  const allUsers = await getUsers()

  // check for users
  if (allUsers.length < 1) return console.log('🚨 We don\'t have any users to email these Beatles lyrics to! Try again! 🚨')
  
  // add messages array to each user
  allUsers.forEach((user) => user.messages = [])

  // every minute, attempt to send email
  setInterval(async () => {
    allUsers.forEach(async (user) => {
      let filteredMessages = []

      // if user.messages is the same length as allMessages
        // do not send email
      if (userHasReceivedAllMessages(user.messages, allMessages)) {
        return console.log(`✅ ${user.email} has received all messages`)
      }

      // if user does not have an email address
        // return
      if (!user.email) return console.error(`🛑 Email not sent. User ${user.id} has no email address`)

      // loop through allMessages
        // for each message, loop through user.messages
          // if user.messages includes this message move on to the next message
          // if user.messages !includes this message, add it to filteredMessages to be sent to user
      allMessages.forEach((message) => {
        if (user.messages.length > 0) {
          user.messages.forEach((m) => {
            if (message.id === m.id) return
            else filteredMessages.push(message)
          })
          return filteredMessages
        } else {
          filteredMessages = [...allMessages]
        }
      })

      const data = {
        id: user.id,
        email: user.email,
        name: user.name,
        message:
          filteredMessages[Math.floor(Math.random() * filteredMessages.length)], // filter allMessages to not include messages that are already in user.messages
      }

      // after email is sent
        // add the message to the user object in allUsers
      addMessageToUser({ user, message: data.message, allUsers })
      await sendMail(data)

    })
  }, 60000)
}

const sendMail = async (data) => {
  const { email, name, message: { message } } = data
  console.log(`💌💨 Sending message, ${message},  to ${email}`)

  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    pool: true,
    rateLimit: true,
    maxConnections: 500,
    maxMessages: 1000,
    rateDelta: 20000,
  })

  const mailData = {
    from: SENDER,
    to: email,
    subject: `Message From Cope Notes`,
    html: `<div>Hi ${name}! <br> ${message}</div>`,
  }

  transporter.sendMail(mailData, async function (err, info) {
    if (err) console.log(err)
    else {
      console.log(`📬 Email sent successfully to ${mailData.to}`)
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
