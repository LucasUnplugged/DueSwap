import { useRouter, BlitzPage, useRedirectAuthenticated } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { SignupForm } from 'app/auth/components/SignupForm'
import { Center, Heading, Stack, useColorModeValue } from '@chakra-ui/react'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { User } from 'db'
import React from 'react'
import Loader from 'app/core/components/Loader'

const SignupPage: BlitzPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const { setIsAuthenticated } = useCurrentUser()
  const router = useRouter()
  const boxBg = useColorModeValue('white', 'whiteAlpha.300')
  const titleColor = useColorModeValue('black', 'white')
  useRedirectAuthenticated(String(router.query.next || '/'))

  return (
    <Center as="article">
      <Stack as="section" bg={boxBg} boxShadow="2xl" p="10px 10px 20px" rounded="lg" w="460px">
        <Heading as="h2" color={titleColor} fontWeight="300" px="16px" py="10px" size="sm">
          Sign up
        </Heading>
        {loading ? (
          <Center minH="200px">
            <Loader isLoading={loading} />
          </Center>
        ) : (
          <>
            <SignupForm
              onInit={() => setLoading(true)}
              onSuccess={(user: User) => {
                const next = router.query.next ? decodeURIComponent(router.query.next as string) : '/'
                setLoading(false)
                if (user) {
                  setIsAuthenticated(true)
                  router.push(next)
                }
              }}
            />
          </>
        )}
      </Stack>
    </Center>
  )
}

SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
