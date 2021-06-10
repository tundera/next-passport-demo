import type { User } from 'types'

import passport from 'passport'
import Local from 'passport-local'

import { findUserByEmail, validatePassword } from 'src/lib/db'

passport.serializeUser(function (user: User, done) {
  // serialize the email into session
  done(null, user.email)
})

// @ts-expect-error
passport.deserializeUser(function (req, id, done) {
  // deserialize the email back into user object
  const user = findUserByEmail(req, id)
  done(null, user)
})

passport.use(
  new Local.Strategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    (req, email, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = findUserByEmail(req, email)
      // Security-wise, if you hashed the password earlier, you must verify it
      // if (!user || await argon2.verify(user.password, password))
      if (!user || !validatePassword(user, password)) {
        done(null, null)
      } else {
        done(null, user)
      }
    },
  ),
)

export default passport
