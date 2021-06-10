import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

type LoginFormData = {
  email: string
  password: string
}

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const queryClient = useQueryClient()

  const logIn = async (data: LoginFormData) => {
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
        throw new Error('Incorrect email or password.')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const mutation = useMutation(logIn, {
    onError: (error: Error) => {
      setErrorMessage(error.message)
    },
    onSuccess: (data) => {
      queryClient.setQueryData('currentUser', data)
    },
  })

  return mutation
}

export default useLogin
