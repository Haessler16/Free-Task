import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handleUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, title, description, characters, userId } =
    req.body !== '' && JSON.parse(req.body)

  const { query } = req

  if (req.method === 'GET') {
    if (typeof query.userId === 'string') {
      const notes = await prisma.notes.findMany({
        where: { userId: Number(query.userId) },
      })

      res.json(notes)
      return
    } else if (typeof query.id === 'string') {
      const notes = await prisma.notes.findUnique({
        where: { id: Number(query.id) },
      })

      res.json(notes)
      return
    } else {
      const notes = await prisma.notes.findMany()

      res.json(notes)
      return
    }
  }

  if (req.method === 'POST') {
    const notes = await prisma.notes.create({
      data: { title, description, characters, userId },
    })

    res.json(notes)
    return
  }

  if (req.method === 'UPDATE') {
    const notes = await prisma.notes.update({
      where: { id: id },
      data: { title, description, characters, userId },
    })

    res.json(notes)
    return
  }

  if (req.method === 'DELETE') {
    const notes = await prisma.notes.delete({ where: { id: id } })

    res.json(notes)
    return
  }
}

// function getAllUser(req: NextApiRequest) {}
// function getOneUser(req: NextApiRequest) {}
// function createUser(req: NextApiRequest) {}
// function updateUser(req: NextApiRequest) {}
// function deleteUser(req: NextApiRequest) {}
