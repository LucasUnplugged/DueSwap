import { HStack } from '@chakra-ui/layout'
import { Heading, Text } from '@chakra-ui/react'
import Loader from 'app/core/components/Loader'
import { useUniswap } from 'app/core/hooks/useUniswap'
import React from 'react'
import { queryPairs } from '../api/queries'
import { PairGraphData } from '../models/models'

interface PairInfoProps {
  token0: string
  token1: string
}
export default function PairInfo({ token0, token1 }: PairInfoProps) {
  const { useQuery } = useUniswap<PairGraphData>()
  const { error, loading, data } = useQuery(queryPairs({ token0, token1 }))
  if (error) {
    console.error(error.message)
  }
  return (
    <HStack alignItems="center" h="60px" justifyContent="flex-end" px="16px">
      <Loader isLoading={loading} />
      {!loading && (
        <Heading as="h4" fontSize="16px">
          <Text as="span" fontWeight="200" pr="10px">
            Volume (USD)
          </Text>
          {parseFloat(data?.pairs[0]?.volumeUSD || '0').toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Heading>
      )}
    </HStack>
  )
}
