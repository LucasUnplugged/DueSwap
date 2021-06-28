import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz'
import LoginForm from 'app/auth/components/LoginForm'
import React, { Suspense } from 'react'
import { Center, ChakraProvider } from '@chakra-ui/react'
import UniswapProvider from 'app/core/providers/UniswapProvider'
import theme from 'app/core/styles/theme'
import Loader from 'app/core/components/Loader'
import UserProvider from 'app/core/providers/UserProvider'

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Suspense
      fallback={
        <Center h="100vh" w="100vw">
          <Loader isLoading={true} />
        </Center>
      }
    >
      <UniswapProvider>
        <UserProvider>
          <ChakraProvider theme={theme}>
            <ErrorBoundary FallbackComponent={RootErrorFallback} onReset={useQueryErrorResetBoundary().reset}>
              {getLayout(<Component {...pageProps} />)}
            </ErrorBoundary>
          </ChakraProvider>
        </UserProvider>
      </UniswapProvider>
    </Suspense>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return <ErrorComponent statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />
  } else {
    return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
  }
}
