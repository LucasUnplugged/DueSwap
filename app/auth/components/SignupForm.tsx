import { useMutation } from 'blitz'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'
import { User } from '../models/models'
import React from 'react'
import { VStack } from '@chakra-ui/react'

type SignupFormProps = {
  onInit?: () => void
  onSuccess?: (user: User) => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <VStack minH="200px" justifyContent="center">
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            props.onInit?.()
            const user = await signupMutation(values)
            props.onSuccess?.(user)
          } catch (error) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
              // This error comes from Prisma
              return { email: 'This email is already being used' }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField isRequired name="email" label="Email" placeholder="Email" />
        <LabeledTextField isRequired name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </VStack>
  )
}

export default SignupForm
