import { useMutation, useQueryClient } from 'react-query'

type SignUpFormData = {
  username: string
  password: string
  name: string
}

const useSignUp = () => {
  const queryClient = useQueryClient()

  const signUp = async (data: SignUpFormData) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.status === 201) {
      const { user } = await res.json()
      return user
    } else {
      throw new Error(await res.text())
    }
  }

  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: 'currentUser' })
    },
  })

  return mutation
}

export default useSignUp
