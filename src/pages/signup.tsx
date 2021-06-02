import type { PageComponent } from 'types'

import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useUser } from 'src/lib/hooks'
import { ButtonGroup, Button, Input, Flex, FormControl, FormLabel } from '@chakra-ui/react'
import { getLayout } from 'src/layouts/MainLayout'

const SignupPage: PageComponent = () => {
  const [user, { mutate }] = useUser()
  const [errorMsg, setErrorMsg] = useState('')

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

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 201) {
      const userObj = await res.json()
      // set user to useSWR state
      mutate(userObj)
    } else {
      setErrorMsg(await res.text())
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  return (
    <>
      <h1>Sign up to Example</h1>
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
