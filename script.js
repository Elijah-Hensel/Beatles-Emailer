const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany()
  allUsers.forEach(async (user) => {
    const data = {
      email: user.email,
      name: user.name,
    }
  
    await fetch('http://localhost:3000/pages/api/contact.js', {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log("Response received")
      console.log(res)
      if (res.status === 200) {
        console.log("Response succeeded!")
      }
    })
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
