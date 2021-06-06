import type { User } from 'types'

import { useQuery, useMutation } from 'react-query'

export const getUser = async () => {
  const response = await fetch('/api/user')
  const { user } = await response.json()

  return user
}

export const getUsers = async () => {
  const response = await fetch('/api/users')
  const { users } = await response.json()

  return users
}

export function useCurrentUser() {
  const query = useQuery<User>('currentUser', getUser)

  return { ...query }
}

export function useUsers() {
  const query = useQuery<User[]>('users', getUsers)

  return { ...query }
}
