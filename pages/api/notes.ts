import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handleUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, title, description, characters, user } =
    req.body !== '' && JSON.parse(req.body)
  const { type = 'many' } = req.query

  if (req.method === 'GET' && type === 'many') {
    const notes = await prisma.notes.findMany()

    res.json(notes)
    return
  }

  if (req.method === 'GET' && type === 'one') {
    const notes = await prisma.notes.findUnique({
      where: { id },
    })

    res.json(notes)
    return
  }

  if (req.method === 'POST') {
    const notes = await prisma.notes.create({
      data: { title, description, characters, user },
    })

    res.json(notes)
    return
  }

  if (req.method === 'UPDATE') {
    const notes = await prisma.notes.update({
      where: { id: id },
      data: { title, description, characters, user },
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
