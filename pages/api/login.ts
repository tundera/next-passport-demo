import type { AuthApiHandler } from 'types'

import nc from 'next-connect'

import auth from 'src/middleware/auth'
import passport from 'src/middleware/passport'

const handler: AuthApiHandler = nc()

handler.use(auth).post(passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user })
})

export default handler
