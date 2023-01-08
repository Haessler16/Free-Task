// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { comparePassword } from 'lib/bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { iUser } from 'utils/interefaces/user'

// type Data = {
//   name: string
// }

export default async function CredentialsAuth(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // GET any not OK
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }

  // POST - ok
  const { email, password } = JSON.parse(req.body)
  console.log({ body: req.body })

  const getOne = await fetch(`api/user?type=one&email=${email}`)
  const isUserAlReady = await getOne.json()

  if (await comparePassword(password, isUserAlReady.password)) {
    const user: iUser = isUserAlReady
    return res.status(200).json(user)
  }

  res.status(401).end()
}
