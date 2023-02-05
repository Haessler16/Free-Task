import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

export default async function handleTasks(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, title, userId } = req.body !== '' && JSON.parse(req.body)

  const { query } = req

  if (req.method === 'GET') {
    if (typeof query.userId === 'string') {
      const tasks = await prisma.task.findMany({
        where: { userId: Number(query.userId) },
      })

      res.json(tasks)
      return
    } else if (typeof query.id === 'string') {
      const task = await prisma.task.findUnique({
        where: { id: Number(query.id) },
      })

      res.json(task)
      return
    } else {
      return []
    }
  }

  if (req.method === 'POST') {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    })

    res.json(task)
    return
  }

  if (req.method === 'PUT') {
    const task = await prisma.task.update({
      where: { id: id },
      data: { title, userId },
    })

    res.json(task)
    return
  }

  if (req.method === 'DELETE') {
    const task = await prisma.task.delete({ where: { id: id } })

    res.json(task)
    return
  }
}

// function createUser(req: NextApiRequest) {}
// function updateUser(req: NextApiRequest) {}
// function deleteUser(req: NextApiRequest) {}
