import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function handleNotes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, title, description, characters, userId, folderId } =
    req.body !== '' && JSON.parse(req.body)

  const { query } = req

  if (req.method === 'GET') {
    const notes = await getNotes(query)
    res.json(notes)
  }

  if (req.method === 'POST') {
    const notes = await prisma.notes.create({
      data: {
        title,
        description,
        characters,
        userId,
        folderId: folderId !== 0 ? folderId : null,
      },
    })

    res.json(notes)
    return
  }

  if (req.method === 'PUT') {
    const notes = await prisma.notes.update({
      where: { id },
      data: { title, description, characters, folderId },
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

async function getNotes(query: Partial<{ [key: string]: string | string[] }>) {
  let { folderId: fdrId, userId, id } = query

  const folderId = isNaN(Number(fdrId)) ? null : Number(fdrId)

  if (typeof userId === 'string' && userId !== 'undefined') {
    if (folderId !== 0) {
      const notes = await prisma.notes.findMany({
        where: {
          userId: Number(userId),
          folderId: {
            equals: folderId,
          },
        },
      })

      return notes
    } else {
      const notes = await prisma.notes.findMany({
        where: {
          userId: Number(userId),
        },
      })

      return notes
    }
  } else if (typeof id === 'string' && id !== 'undefined') {
    const notes = await prisma.notes.findUnique({
      where: { id: Number(id) },
    })

    return notes
  }

  return []
}
// function createUser(req: NextApiRequest) {}
// function updateUser(req: NextApiRequest) {}
// function deleteUser(req: NextApiRequest) {}
