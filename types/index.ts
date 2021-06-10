import type {
  NextComponentType,
  NextPage,
  NextPageContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'
import type { AppProps } from 'next/app'
import type { NextConnect } from 'next-connect'

export interface CustomAppProps<P = {}> extends AppProps<P> {
  Component: NextComponentType<NextPageContext, any, P> & {
    getLayout?: (component: JSX.Element) => JSX.Element
  }
}

export declare type PageComponent<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (component: JSX.Element) => JSX.Element
}

export interface User {
  id: string
  createdAt: number
  email: string
  name: string
  hash: string
  salt: string
}

export type CreateUserParams = {
  email: string
  password: string
  name: string
}

export interface AuthApiRequest extends NextApiRequest {
  user: User
  login: any
  logout: any
  signup: any
  session: any
}

export type AuthApiHandler = NextConnect<AuthApiRequest, NextApiResponse>
