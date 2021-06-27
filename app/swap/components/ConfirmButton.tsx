import { Routes } from '.blitz'
import { Link } from '@blitzjs/core'
import { HStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import { useRouter } from 'next/router'
import React from 'react'

export default function ConfirmButton() {
  const { query } = useRouter()
  const { isAuthenticated } = useCurrentUser()
  const input = query.input
  const output = query.output
  const inputParam = input ? `?input=${input}` : ''
  const outPrefix = input ? '&' : '?'
  const outputParam = output ? `${outPrefix}output=${output}` : ''
  const params = {
    next: `${Routes.Swap().pathname}${inputParam}${outputParam}`,
    input,
    output,
  }

  return (
    <HStack spacing="10px" as="footer" justifyContent="flex-end">
      {isAuthenticated ? (
        <Button variant="solid" w="100%">
          Swap
        </Button>
      ) : (
        <>
          <Link href={Routes.SignupPage(params)} passHref>
            <Button fontWeight="400" px="30px" variant="ghost">
              Sign up
            </Button>
          </Link>
          <Link href={Routes.LoginPage(params)} passHref>
            <Button variant="solid" w="100%">
              Login to swap
            </Button>
          </Link>
        </>
      )}
    </HStack>
  )
}
