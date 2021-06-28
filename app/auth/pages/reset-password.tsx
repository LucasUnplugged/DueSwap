import { BlitzPage, useRouterQuery, Link, useMutation, Routes, useRedirectAuthenticated, useRouter } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import LabeledTextField from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { ResetPassword } from 'app/auth/validations'
import resetPassword from 'app/auth/mutations/resetPassword'
import React from 'react'
import { Center, Stack, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import Loader from 'app/core/components/Loader'

const ResetPasswordPage: BlitzPage = () => {
  const { input, output, token } = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()
  const boxBg = useColorModeValue('white', 'whiteAlpha.300')
  const titleColor = useColorModeValue('black', 'white')
  useRedirectAuthenticated(String(router.query.next || '/'))

  return (
    <Center as="article">
      <Stack as="section" bg={boxBg} boxShadow="2xl" p="10px 10px 20px" rounded="lg" w="460px">
        <Heading as="h2" color={titleColor} fontWeight="300" px="16px" py="10px" size="sm">
          Set a New Password
        </Heading>
        {loading ? (
          <Center minH="200px">
            <Loader isLoading={loading} />
          </Center>
        ) : (
          <VStack minH="200px" justifyContent="center">
            {isSuccess ? (
              <Stack px="20px" spacing="20px" textAlign="center">
                <Heading as="h2">Password Reset Successfully</Heading>
                <p>
                  Go to the <Link href={Routes.Swap({ input, output })}>Swap page</Link>
                </p>
              </Stack>
            ) : (
              <Form
                submitText="Reset Password"
                schema={ResetPassword}
                initialValues={{ password: '', passwordConfirmation: '', token: token as string }}
                onSubmit={async (values) => {
                  try {
                    setLoading(true)
                    await resetPasswordMutation(values)
                    setLoading(false)
                  } catch (error) {
                    if (error.name === 'ResetPasswordError') {
                      return {
                        [FORM_ERROR]: error.message,
                      }
                    } else {
                      return {
                        [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                      }
                    }
                  }
                }}
              >
                <LabeledTextField name="password" label="New Password" type="password" />
                <LabeledTextField name="passwordConfirmation" label="Confirm New Password" type="password" />
              </Form>
            )}
          </VStack>
        )}
      </Stack>
    </Center>
  )
}

ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
