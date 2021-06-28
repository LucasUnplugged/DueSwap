import { Center, Spinner, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

interface LoaderProps {
  isLoading: boolean
}

export default function Loader({ isLoading }: LoaderProps) {
  const emptyColor = useColorModeValue('gray.200', 'blackAlpha.300')
  const color = useColorModeValue('teal.500', 'teal.200')
  return !isLoading ? null : (
    <Center h="100%" w="100%">
      <Spinner thickness="4px" speed="0.85s" emptyColor={emptyColor} color={color} size="xl" />
    </Center>
  )
}
