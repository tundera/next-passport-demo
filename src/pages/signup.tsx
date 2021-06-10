import type { PageComponent } from 'types'

import { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import useCurrentUser from 'src/hooks/useCurrentUser'
import {
  ButtonGroup,
  Button,
  Input,
  Heading,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { getLayout } from 'src/layouts/MainLayout'
import useSignUp from 'src/hooks/useSignUp'

type SignUpInputs = {
  email: string
  password: string
  rpassword: string
  name: string
}

const SignupPage: PageComponent = () => {
  const { data: user } = useCurrentUser()

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/')
  }, [user])

  const [errorMsg, setErrorMsg] = useState('')

  const mutation = useSignUp()

  const { handleSubmit, register, formState, getValues } = useForm<SignUpInputs>()

  function validateEmail(value: string | undefined) {
    if (!value) {
      return 'Email is required'
    } else return true
  }

  function validatePassword(value: string | undefined) {
    if (!value) {
      return 'Password is required'
    } else return true
  }

  function validateRepeatPassword(value: string | undefined) {
    if (!value) {
      return 'Password is required'
    } else if (value !== getValues('password')) {
      return "The passwords don't match"
    } else return true
  }

  function validateName(value: string | undefined) {
    if (!value) {
      return 'Name is required'
    } else return true
  }

  async function onSubmit(data) {
    mutation.mutate(data)
  }

  return (
    <>
      <Heading as="h1" my="4">
        Sign Up
      </Heading>
      {errorMsg && <p className="error">{errorMsg}</p>}

      <form action="#" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="text"
            name="email"
            required
            placeholder="Your Email"
            _placeholder={{ color: 'gray.400' }}
            {...register('email', { validate: validateEmail })}
          />
          {formState.errors.email && formState.touchedFields.email && (
            <Flex justifyContent="center">
              <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
            </Flex>
          )}
        </FormControl>

        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            required
            placeholder="Your Password"
            _placeholder={{ color: 'gray.400' }}
            {...register('password', { validate: validatePassword })}
          />
          {formState.errors.password && formState.touchedFields.password && (
            <Flex justifyContent="center">
              <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
            </Flex>
          )}
        </FormControl>

        <FormControl isInvalid={!!formState.errors.rpassword}>
          <FormLabel htmlFor="rpassword">Repeat Password</FormLabel>
          <Input
            type="password"
            name="rpassword"
            required
            placeholder="Repeat Password"
            _placeholder={{ color: 'gray.400' }}
            {...register('rpassword', { validate: validateRepeatPassword })}
          />
          {formState.errors.rpassword && formState.touchedFields.rpassword && (
            <Flex justifyContent="center">
              <FormErrorMessage>{formState.errors.rpassword?.message}</FormErrorMessage>
            </Flex>
          )}
        </FormControl>

        <FormControl isInvalid={!!formState.errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            _placeholder={{ color: 'gray.400' }}
            {...register('name', { validate: validateName })}
          />
          {formState.errors.name && formState.touchedFields.name && (
            <Flex justifyContent="center">
              <FormErrorMessage>{formState.errors.name?.message}</FormErrorMessage>
            </Flex>
          )}
        </FormControl>

        <Flex justifyContent="center" my="8">
          <ButtonGroup spacing="4">
            <Button type="submit" isLoading={formState.isSubmitting}>
              Sign up
            </Button>
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
