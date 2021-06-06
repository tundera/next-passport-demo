import type { PageComponent } from 'types'

import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useUser } from 'src/lib/hooks'
import { ButtonGroup, Button, Input, Heading, Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { getLayout } from 'src/layouts/MainLayout'
import { useQueryClient, useMutation } from 'react-query'

const SignupPage: PageComponent = () => {
  const { data: user } = useUser()
  const queryClient = useQueryClient()
  const [errorMsg, setErrorMsg] = useState('')

  const mutation = useMutation()
  async function onSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.name.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    const updateUsers = async () => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (res.status === 201) {
        const account = await res.json()

        setQueryData('account', account)
      } else {
        setErrorMsg(await res.text())
      }
    }

    await updateUsers()
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <Heading as="h1" my="4">
        Sign Up
      </Heading>
      {errorMsg && <p className="error">{errorMsg}</p>}

      <form action="#" autoComplete="off" onSubmit={onSubmit}>
        <FormControl isInvalid={!errorMsg}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            name="username"
            required
            placeholder="Your Username"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>
        <FormControl isInvalid={!errorMsg}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            required
            placeholder="Your Password"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>
        <FormControl isInvalid={!errorMsg}>
          <FormLabel htmlFor="rpassword">Repeat Password</FormLabel>
          <Input
            type="password"
            name="rpassword"
            required
            placeholder="Your Password"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>
        <FormControl isInvalid={!errorMsg}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            _placeholder={{ color: 'gray.400' }}
          />
        </FormControl>

        <Flex justifyContent="center" my="8">
          <ButtonGroup className="submit">
            <Button type="submit">Sign up</Button>
            <Link href="/login" passHref>
              <Button as="a">Log In</Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </form>
    </>
  )
}

SignupPage.getLayout = getLayout

export default SignupPage
