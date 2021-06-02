import type { NextComponentType, NextPage, NextPageContext } from 'next'
import type { AppProps } from 'next/app'

export interface CustomAppProps<P = {}> extends AppProps<P> {
  Component: NextComponentType<NextPageContext, any, P> & {
    getLayout?: (component: JSX.Element) => JSX.Element
  }
}

export declare type PageComponent<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (component: JSX.Element) => JSX.Element
}
