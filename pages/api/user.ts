import type { AuthApiHandler } from 'types'

import nc from 'next-connect'
import auth from 'src/middleware/auth'
import { deleteUser, updateUserByEmail } from 'src/lib/db'

const handler: AuthApiHandler = nc()

handler
  .use(auth)
  .get((req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed
    // const { name, email, favoriteColor } = req.user
    // res.json({ user: { name, email, favoriteColor } })
    res.json({ user: req.user })
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send('unauthenticated')
    } else {
      next()
    }
  })
  .put((req, res) => {
    const { name } = req.body
    const user = updateUserByEmail(req, req.user.email, { name })
    res.json({ user })
  })
  .delete((req, res) => {
    deleteUser(req)
    req.logout()
    res.status(204).end()
  })

export default handler
