import type { AuthApiHandler } from 'types'

import nc from 'next-connect'

import auth from 'src/middleware/auth'
import { getAllUsers, createUser, findUserByEmail } from 'src/lib/db'

const handler: AuthApiHandler = nc()

handler
  .use(auth)
  .get((req, res) => {
    // For demo purpose only. You will never have an endpoint which returns all users.
    // Remove this in production
    res.json({ users: getAllUsers(req) })
  })
  .post((req, res) => {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      return res.status(400).send('Missing fields')
    }
    // Here you check if the username has already been used
    const emailExisted = !!findUserByEmail(req, email)
    if (emailExisted) {
      return res.status(409).send('The email has already been used')
    }
    const user = { email, password, name }
    // Security-wise, you must hash the password before saving it
    // const hashedPass = await argon2.hash(password);
    // const user = { email, password: hashedPass, name }
    createUser(req, user)
    req.login(user, (err) => {
      if (err) throw err
      // Log the signed up user in
      res.status(201).json({
        user,
      })
    })
  })

export default handler
