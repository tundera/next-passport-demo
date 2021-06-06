import type { PageComponent } from 'types'

import { useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import Router from 'next/router'
import {
  chakra,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'

import { useCurrentUser } from 'src/lib/hooks'
import { getLayout } from 'src/layouts/MainLayout'

function ProfileEdit() {
  const nameRef = useRef<HTMLInputElement>()
  const { data: user } = useCurrentUser()

  const { setQueryData } = useQueryClient()

  useEffect(() => {
    if (!user) return

    nameRef.current.value = user.name
  }, [user])

  async function handleEditProfile(e) {
    e.preventDefault()

    const body = {
      name: nameRef.current.value,
    }
    const res = await fetch(`/api/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const updatedUser = await res.json()

    setQueryData('currentUser', updatedUser)
  }

  async function handleDeleteProfile() {
    const res = await fetch(`/api/user`, {
      method: 'DELETE',
    })

    if (res.status === 204) {
      setQueryData('currentUser', { user: null })
      Router.replace('/')
    }
  }

  return (
    <>
      <div className="form-container">
        <form action="#" autoComplete="off" onSubmit={handleEditProfile}>
          <FormControl>
            <FormLabel>
              <chakra.span>Name</chakra.span>
            </FormLabel>
            <Input type="text" ref={nameRef} required />
          </FormControl>

          <Flex justifyContent="center">
            <ButtonGroup spacing="4">
              <Button type="submit">Update profile</Button>
              <Button onClick={handleDeleteProfile}>Delete profile</Button>
            </ButtonGroup>
          </Flex>
        </form>
      </div>
    </>
  )
}

const ProfilePage: PageComponent = () => {
  const { data: user, isLoading } = useCurrentUser()

  useEffect(() => {
    // redirect user to login if not authenticated
    if (!isLoading && !user) Router.replace('/login')
  }, [user, isLoading])

  return (
    <>
      <Heading as="h1">Profile</Heading>

      {user && (
        <>
          <Text>Your session:</Text>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <ProfileEdit />
        </>
      )}
    </>
  )
}

ProfilePage.getLayout = getLayout

export default ProfilePage
