import type { User } from 'types'

import { useQuery } from 'react-query'

export const getUsers = async () => {
  const response = await fetch('/api/users')
  const { users } = await response.json()

  return users
}

function useUsers() {
  const query = useQuery<User[]>('users', getUsers)

  return { ...query }
}

export default useUsers
