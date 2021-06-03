import Iron from '@hapi/iron'

export async function createLoginSession(session, secret) {
  const createdAt = Date.now()
  const obj = { ...session, createdAt }
  const token = await Iron.seal(obj, secret, Iron.defaults)

  return token
}

export async function updateRefreshToken(session) {
  // Implement refresh logic here
  // const {
  //   accessToken,
  //   refreshToken,
  //   expiresIn
  //  } = await refreshMutation({ input: session.refreshToken })
  // return {
  //   ...session
  //   accessToken,
  //   refreshToken,
  //   expiresIn
  // }
}

export async function getLoginSession(token, secret) {
  const session = await Iron.unseal(token, secret, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (session.maxAge && Date.now() > expiresAt) {
    return await updateRefreshToken(session)
  }

  return session
}
