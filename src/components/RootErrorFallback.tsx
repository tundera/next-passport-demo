import type { FC } from 'react'

import ErrorComponent from 'next/error'

export interface ErrorFallbackProps {
  error: Error & Record<any, any>
}

const RootErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
  return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
}

export default RootErrorFallback
