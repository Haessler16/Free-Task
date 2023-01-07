import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handleUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, email, image, role, password } =
    req.body !== '' && JSON.parse(req.body)
  const { type = 'many' } = req.query

  if (req.method === 'GET' && type === 'many') {
    const user = await prisma.user.findMany()

    res.json(user)
    return
  }

  if (req.method === 'GET' && type === 'one') {
    const user = await prisma.user.findUnique({
      where: { email: req.query.email as string },
    })

    res.json(user)
    return
  }

  if (req.method === 'POST') {
    const user = await prisma.user.create({
      data: { name, email, image, role, password },
    })

    res.json(user)
    return
  }

  if (req.method === 'UPDATE') {
    const user = await prisma.user.update({
      where: { id: 1 },
      data: { name, email, image, role },
    })

    res.json(user)
    return
  }

  if (req.method === 'DELETE') {
    const user = await prisma.user.delete({ where: { id: 1 } })

    res.json(user)
    return
  }
}

// function getAllUser(req: NextApiRequest) {}
// function getOneUser(req: NextApiRequest) {}
// function createUser(req: NextApiRequest) {}
// function updateUser(req: NextApiRequest) {}
// function deleteUser(req: NextApiRequest) {}
