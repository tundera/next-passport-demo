import type { NextApiRequest, NextApiResponse } from 'next'

import nc from 'next-connect'
import auth from '../../middleware/auth'
import passport from '../../lib/passport'

interface ExtendedRequest extends NextApiRequest {
  user: any
}

const handler = nc<ExtendedRequest, NextApiResponse>()

handler.use(auth).post(passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user })
})

export default handler
