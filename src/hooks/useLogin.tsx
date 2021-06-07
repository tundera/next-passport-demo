import { useMutation, useQueryClient } from 'react-query'

type LoginFormData = {
  username: string
  password: string
}

const useLogin = () => {
  const queryClient = useQueryClient()

  const logIn = async (data: LoginFormData) => {
    console.log('here')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.status === 200) {
        const { user } = await res.json()
        return user
      } else {
        throw new Error('Incorrect username or password.')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const mutation = useMutation(logIn, {
    onSuccess: (data) => {
      queryClient.setQueryData('currentUser', data)
    },
  })

  return mutation
}

export default useLogin
