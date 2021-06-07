import type { PageComponent } from 'types'

import { useEffect } from 'react'
import Router from 'next/router'
import {
  chakra,
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { useForm, SubmitHandler } from 'react-hook-form'

import { getLayout } from 'src/layouts/MainLayout'
import { useCurrentUser } from 'src/lib/hooks'
import useProfileEdit from 'src/hooks/useProfileEdit'

type ProfileEditInputs = {
  name: string
}

const ProfilePage: PageComponent = () => {
  const { data: user } = useCurrentUser()
  const { handleSubmit, register, formState, setValue } = useForm<ProfileEditInputs>()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (user) setValue('name', user.name)
  }, [user])

  const mutation = useProfileEdit()

  function validateName(value: string | undefined) {
    if (!value) {
      return 'Name is required'
    } else return true
  }

  const onSubmit: SubmitHandler<ProfileEditInputs> = (data) => {
    mutation.mutate(data)
  }

  async function handleDeleteProfile() {
    const res = await fetch(`/api/user`, {
      method: 'DELETE',
    })

    if (res.status === 204) {
      queryClient.setQueryData('currentUser', { user: null })
      Router.replace('/')
    }
  }

  return (
    <>
      <div className="form-container">
        <form action="#" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>
              <chakra.span>Name</chakra.span>
            </FormLabel>
            <Input type="text" required {...register('name', { validate: validateName })} />
            {formState.errors.name && formState.touchedFields.name && (
              <Flex justifyContent="center">
                <FormErrorMessage>{formState.errors.name?.message}</FormErrorMessage>
              </Flex>
            )}
          </FormControl>

          <Flex justifyContent="center">
            <ButtonGroup spacing="4">
              <Button type="submit" isLoading={formState.isSubmitting}>
                Update Profile
              </Button>
              <Button onClick={handleDeleteProfile}>Delete profile</Button>
            </ButtonGroup>
          </Flex>
        </form>
      </div>
    </>
  )
}

ProfilePage.getLayout = getLayout

export default ProfilePage
