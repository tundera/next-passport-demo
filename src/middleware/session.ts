import { parseCookies, setCookie } from 'nookies'

import { createLoginSession, getLoginSession } from 'src/lib/auth'

type CookieOptions = Parameters<typeof setCookie>[3]

type SessionParams = {
  name: string
  secret: string
  cookie: CookieOptions
}

const session = ({ name, secret, cookie: cookieOpts }: SessionParams) => {
  return async (req, res, next) => {
    const cookies = parseCookies({ req })
    const token = cookies[name]
    let unsealed = {}

    if (token) {
      try {
        // the cookie needs to be unsealed using the password `secret`
        unsealed = await getLoginSession(token, secret)
      } catch (e) {
        // The cookie is invalid
      }
    }

    req.session = unsealed

    // We are proxying res.end to commit the session cookie
    const oldEnd = res.end
    res.end = async function resEndProxy(...args) {
      if (res.finished || res.writableEnded || res.headersSent) return
      if (cookieOpts.maxAge) {
        req.session.maxAge = cookieOpts.maxAge
      }

      const token = await createLoginSession(req.session, secret)

      setCookie({ res }, name, token, cookieOpts)
      oldEnd.apply(this, args)
    }

    next()
  }
}

export default session
