import { BlitzPage, useMutation, useRedirectAuthenticated, useRouter, useRouterQuery } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { ForgotPassword } from 'app/auth/validations'
import forgotPassword from 'app/auth/mutations/forgotPassword'
import React from 'react'
import { Center, Stack, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import Loader from 'app/core/components/Loader'

const ForgotPasswordPage: BlitzPage = () => {
  const { input, output } = useRouterQuery()
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const boxBg = useColorModeValue('white', 'whiteAlpha.300')
  const titleColor = useColorModeValue('black', 'white')
  useRedirectAuthenticated(String(router.query.next || '/'))

  return (
    <Center as="article">
      <Stack as="section" bg={boxBg} boxShadow="2xl" p="10px" rounded="lg" w="460px">
        <Heading as="h2" color={titleColor} fontWeight="300" px="16px" py="10px 10px 20px" size="sm">
          Forgot your password?
        </Heading>
        {loading ? (
          <Center minH="160px">
            <Loader isLoading={loading} />
          </Center>
        ) : (
          <>
            <VStack minH="160px" justifyContent="center">
              {isSuccess ? (
                <Stack px="20px" spacing="20px" textAlign="center">
                  <Heading as="h2">Request Submitted</Heading>
                  <p>If your email is in our system, you will receive instructions to reset your password shortly.</p>
                </Stack>
              ) : (
                <Form
                  submitText="Send Reset Password Instructions"
                  schema={ForgotPassword}
                  initialValues={{ email: '' }}
                  onSubmit={async (values) => {
                    try {
                      setLoading(true)
                      await forgotPasswordMutation({ ...values, input: String(input), output: String(output) })
                      setLoading(false)
                    } catch (error) {
                      return {
                        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                      }
                    }
                  }}
                >
                  <LabeledTextField name="email" label="Email" placeholder="Email" />
                </Form>
              )}
            </VStack>
          </>
        )}
      </Stack>
    </Center>
  )
}

ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
