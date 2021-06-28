import React from 'react'
import { useRouter, BlitzPage, useRedirectAuthenticated } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { LoginForm } from 'app/auth/components/LoginForm'
import { User } from '../models/models'
import { Center, Stack, Heading, useColorModeValue } from '@chakra-ui/react'
import Loader from 'app/core/components/Loader'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'

const LoginPage: BlitzPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const { setIsAuthenticated } = useCurrentUser()
  const router = useRouter()
  const boxBg = useColorModeValue('white', 'whiteAlpha.300')
  const titleColor = useColorModeValue('black', 'white')
  useRedirectAuthenticated(String(router.query.next || '/'))

  return (
    <Center as="article">
      <Stack as="section" bg={boxBg} boxShadow="2xl" p="10px" rounded="lg" w="460px">
        <Heading as="h2" color={titleColor} fontWeight="300" px="16px" py="10px" size="sm">
          Login
        </Heading>
        {loading ? (
          <Center minH="330px">
            <Loader isLoading={loading} />
          </Center>
        ) : (
          <>
            <LoginForm
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

LoginPage.suppressFirstRenderFlicker = true
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
