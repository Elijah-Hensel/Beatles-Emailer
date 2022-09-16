/* eslint-disable import/no-anonymous-default-export */
import prisma from './prisma'

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const messageData = JSON.parse(req.body)

  res.json(messageData)
}

export const getMessages = async () =>
  await prisma.message.findMany()
