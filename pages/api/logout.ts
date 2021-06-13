import type { AuthApiHandler } from 'types'

import nc from 'next-connect'
import auth from 'src/middleware/auth'

const handler: AuthApiHandler = nc()

handler.use(auth).get((req, res) => {
  req.logout()
  res.status(204).end()
})

export default handler
