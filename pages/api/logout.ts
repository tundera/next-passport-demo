import type { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'
import auth from '../../middleware/auth'

interface ExtendedRequest extends NextApiRequest {
  logOut: any
}

const handler = nc<ExtendedRequest, NextApiResponse>()

handler.use(auth).get((req, res) => {
  req.logOut()
  res.status(204).end()
})

export default handler
