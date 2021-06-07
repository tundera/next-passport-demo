import type { User } from 'types'

import { useQuery } from 'react-query'

export const getUser = async () => {
  const response = await fetch('/api/user')
  const { user } = await response.json()

  return user
}

function useCurrentUser() {
  const query = useQuery<User>('currentUser', getUser)

  return { ...query }
}

export default useCurrentUser
