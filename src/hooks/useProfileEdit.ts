import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'

type ProfileEditFormData = {
  name: string
}

const useProfileEdit = () => {
  const queryClient = useQueryClient()

  const editProfile = async (data: ProfileEditFormData) => {
    const res = await fetch(`/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const { user } = await res.json()

    return user
  }

  const mutation = useMutation(editProfile, {
    onSuccess: (data) => {
      queryClient.setQueryData('currentUser', data)
    },
  })

  return mutation
}

export default useProfileEdit
