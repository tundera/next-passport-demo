import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

type ProfileEditFormData = {
  username: string
  password: string
}

const useProfile = () => {
  const queryClient = useQueryClient()

  const editProfile = async (data) => {
    const res = await fetch(`/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    return await res.json()
  }

  const mutation = useMutation(editProfile, {
    onSuccess: (data) => {
      queryClient.setQueryData('currentUser', data)
    },
  })

  return mutation
}

export default useProfile
