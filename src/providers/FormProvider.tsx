import { FormspreeProvider } from '@formspree/react'
import { FC } from 'react'

export const FormProvider: FC = ({ children }) => {
  return (
    <FormspreeProvider project={process.env.NEXT_PUBLIC_FORMSPREE_PROJECT_ID || ''}>
      {children}
    </FormspreeProvider>
  )
}
