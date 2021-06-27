import { AuthenticationError, Link, useMutation, Routes, useRouter } from 'blitz'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'
import { User } from '../models/models'
import React from 'react'
import { VStack, Link as UILink, Center } from '@chakra-ui/react'
import LabeledTextField from 'app/core/components/LabeledTextField'

type LoginFormProps = {
  onInit?: () => void
  onSuccess?: (user: User) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const { query } = useRouter()
  const [loginMutation] = useMutation(login)

  return (
    <VStack minH="200px" justifyContent="center">
      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            props.onInit?.()
            const user = await loginMutation(values)
            props.onSuccess?.(user)
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
            } else {
              return {
                [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField isRequired={true} label="Email" name="email" placeholder="Email address" type="email" />
        <LabeledTextField isRequired={true} label="Password" name="password" placeholder="Password" type="password" />

        <Center as="aside">
          <Link href={Routes.ForgotPasswordPage(query)} passHref>
            <UILink>Forgot your password?</UILink>
          </Link>
        </Center>
      </Form>

      <Center as="footer">
        <Link href={Routes.SignupPage(query)} passHref>
          <UILink>Sign up</UILink>
        </Link>
      </Center>
    </VStack>
  )
}

export default LoginForm
