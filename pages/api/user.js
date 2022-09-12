/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const userData = JSON.parse(req.body)

  const savedUser = await prisma.user.create({
    data: userData,
  })

  res.json(savedUser)
}

export const getUsers = async () => await prisma.user.findMany()