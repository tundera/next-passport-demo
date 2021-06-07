import type { PageComponent } from 'types'

import { useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {
  chakra,
  Heading,
  Stack,
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VisuallyHidden,
} from '@chakra-ui/react'
import { User, Lock } from 'react-feather'

import useCurrentUser from 'src/hooks/useCurrentUser'
import { getLayout } from 'src/layouts/MainLayout'
import { useForm } from 'react-hook-form'

import useLogin from 'src/hooks/useLogin'

type LoginInputs = {
  username: string
  password: string
}

const LoginPage: PageComponent = () => {
  const { data: user } = useCurrentUser()

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  const { handleSubmit, register, formState } = useForm<LoginInputs>()

  const mutation = useLogin()

  function validateUsername(value: string | undefined) {
    if (!value) {
      return 'Username is required'
    } else return true
  }

  function validatePassword(value: string | undefined) {
    if (!value) {
      return 'Password is required'
    } else return true
  }

  async function onSubmit(data) {
    mutation.mutate(data)
  }

  return (
    <>
      <Heading as="h1" my="4">
        Login
      </Heading>

      <form action="#" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="4">
          <FormControl isInvalid={!!formState.errors.username}>
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
                {...register('username', { validate: validateUsername })}
              />
            </Flex>
            {formState.errors.username && formState.touchedFields.username && (
              <Flex justifyContent="center">
                <FormErrorMessage>{formState.errors.username?.message}</FormErrorMessage>
              </Flex>
            )}
          </FormControl>
          <FormControl isInvalid={!!formState.errors.password}>
            <VisuallyHidden>
              <FormLabel htmlFor="password">Username</FormLabel>
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
                {...register('password', { validate: validatePassword })}
              />
            </Flex>
            {formState.errors.password && formState.touchedFields.password && (
              <Flex justifyContent="center">
                <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
              </Flex>
            )}
          </FormControl>

          <Flex justifyContent="center" my="8">
            <ButtonGroup spacing="4">
              <Button type="submit" isLoading={formState.isSubmitting}>
                Login
              </Button>
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
