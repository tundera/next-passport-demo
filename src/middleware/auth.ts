import type { AuthApiHandler } from 'types'

import nc from 'next-connect'

import passport from 'src/middleware/passport'
import session from 'src/middleware/session'

const auth: AuthApiHandler = nc()

auth
  .use(
    session({
      name: 'sess',
      secret: process.env.TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    }),
  )
  .use((req, res, next) => {
    // Initialize mocked database
    // Remove this after you add your own database
    req.session.users = req.session.users || []
    next()
  })
  .use(passport.initialize())
  .use(passport.session())

export default auth
