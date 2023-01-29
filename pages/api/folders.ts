import prisma from 'lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handleFolders(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, title, userId } = req.body !== '' && JSON.parse(req.body)

  const { query } = req

  if (req.method === 'GET') {
    if (typeof query.userId === 'string') {
      const folders = await prisma.folder.findMany({
        where: { userId: Number(query.userId) },
      })

      res.json(folders)
      return
    } else if (typeof query.id === 'string') {
      const folders = await prisma.folder.findUnique({
        where: { id: Number(query.id) },
      })

      res.json(folders)
      return
    } else {
      const folders = await prisma.folder.findMany()

      res.json(folders)
      return
    }
  }

  if (req.method === 'POST') {
    const folders = await prisma.folder.create({
      data: { title, userId },
    })

    res.json(folders)
    return
  }

  if (req.method === 'UPDATE') {
    const folders = await prisma.folder.update({
      where: { id: id },
      data: { title },
    })

    res.json(folders)
    return
  }

  if (req.method === 'DELETE') {
    const folders = await prisma.folder.delete({ where: { id: id } })

    res.json(folders)
    return
  }
}

// function getAllUser(req: NextApiRequest) {}
// function getOneUser(req: NextApiRequest) {}
// function createUser(req: NextApiRequest) {}
// function updateUser(req: NextApiRequest) {}
// function deleteUser(req: NextApiRequest) {}
