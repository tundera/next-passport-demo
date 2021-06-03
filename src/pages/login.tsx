import type { PageComponent } from 'types'

import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {
  chakra,
  Heading,
  Stack,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VisuallyHidden,
} from '@chakra-ui/react'
import { User, Lock } from 'react-feather'

import { useUser } from 'src/lib/hooks'
import { getLayout } from 'src/layouts/MainLayout'

const LoginPage: PageComponent = () => {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 200) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg('Incorrect username or password. Try better!')
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <Heading as="h1" my="4">
        Login to Example
      </Heading>
      {errorMsg && <p className="error">{errorMsg}</p>}

      <form action="#" autoComplete="off" onSubmit={onSubmit}>
        <Stack spacing="4">
          <FormControl isInvalid={!errorMsg}>
            <VisuallyHidden>
              <FormLabel htmlFor="username">Username</FormLabel>
            </VisuallyHidden>
            <Flex position="relative" alignItems="center" justifyContent="space-between">
              <chakra.span mr="4">
                <User size="25" />
              </chakra.span>
              <Input
                type="text"
                name="username"
                required
                placeholder="Your Username"
                _placeholder={{ color: 'gray.400' }}
              />
            </Flex>
          </FormControl>
          <FormControl isInvalid={!errorMsg}>
            <VisuallyHidden>
              <FormLabel htmlFor="username">Username</FormLabel>
            </VisuallyHidden>
            <Flex position="relative" alignItems="center" justifyContent="space-between">
              <chakra.span mr="4">
                <Lock size="25" />
              </chakra.span>
              <Input
                type="password"
                name="password"
                required
                placeholder="Your Password"
                _placeholder={{ color: 'gray.400' }}
              />
            </Flex>
          </FormControl>

          <Flex justifyContent="center">
            <ButtonGroup spacing="4">
              <Button type="submit">Login</Button>
              <Link href="/signup" passHref>
                <Button as="a">Sign Up</Button>
              </Link>
            </ButtonGroup>
          </Flex>
        </Stack>
      </form>
    </>
  )
}

LoginPage.getLayout = getLayout

export default LoginPage
