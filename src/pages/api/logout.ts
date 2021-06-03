import type { AuthApiHandler } from 'types'

import nc from 'next-connect'
import auth from '../../middleware/auth'

const handler: AuthApiHandler = nc()

handler.use(auth).get((req, res) => {
  req.logOut()
  res.status(204).end()
})

export default handler
