// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { iUser } from 'utils/interefaces/user'

// type Data = {
//   name: string
// }

export default function CredentialsAuth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET any not OK
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  // POST - ok
  console.log({ body: req.body })
  if (req.body.password === 'bum') {
    const user: iUser = {
      id: 6,
      email: '',
      name: '',
      createdAt: Date.now(),
      role: 'admin',
      image: '',
      notes: [],
      task: [],
    }
    return res.status(200).json(user)
  }

  res.status(401).end()
}
