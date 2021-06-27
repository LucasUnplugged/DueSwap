import React from 'react'
import { BlitzPage, Router, useRouter } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { useUniswap } from 'app/core/hooks/useUniswap'
import { Stack, Center, Heading, useColorModeValue, VStack, IconButton, Icon } from '@chakra-ui/react'
import { TokenData, TokenGraphData } from '../models/models'
import Loader from 'app/core/components/Loader'
import { queryTokens } from '../api/queries'
import ConfirmButton from '../components/ConfirmButton'
import PairInfo from '../components/PairInfo'
import TokenPicker from '../components/TokenPicker'
import { BiTransferAlt } from 'react-icons/bi'

const Swap: BlitzPage = () => {
  const boxBg = useColorModeValue('white', 'whiteAlpha.300')
  const titleColor = useColorModeValue('black', 'white')
  const { useQuery } = useUniswap<TokenGraphData>()
  const { error, loading, data } = useQuery(queryTokens())
  const { tokens = [] } = data || {}
  const { pathname, query } = useRouter()
  const [token0, setToken0] = React.useState<TokenData | undefined>(tokens?.find(({ id }) => id === query.input))
  const [token1, setToken1] = React.useState<TokenData | undefined>(tokens?.find(({ id }) => id === query.output))

  const setInput = React.useCallback(
    (token: TokenData) => {
      const output = token1?.id || query.output
      Router.replace({ pathname, query: { input: token.id, output } })
    },
    [token1, query.output]
  )
  const setOutput = React.useCallback(
    (token: TokenData) => {
      const input = token0?.id || query.input
      Router.replace({ pathname, query: { input, output: token.id } })
    },
    [token0, query.input]
  )

  const switchTokens = React.useCallback(() => {
    const t0 = token0
    const t1 = token1
    Router.replace({ pathname, query: { input: t1?.id, output: t0?.id } })
  }, [token0, token1])

  if (error) {
    console.error(error.message)
  }

  React.useEffect(() => {
    if (!!query.input && token0?.id !== query.input) {
      const newToken = tokens?.find(({ id }) => id === query.input)
      if (newToken) {
        setToken0(newToken)
      }
    }
  }, [query.input, token0, tokens])
  React.useEffect(() => {
    if (!!query.output && token1?.id !== query.output) {
      const newToken = tokens?.find(({ id }) => id === query.output)
      if (newToken) {
        setToken1(newToken)
      }
    }
  }, [query.output, token1, tokens])

  return (
    <Center as="article">
      <Stack as="section" bg={boxBg} boxShadow="2xl" p="10px" rounded="lg" w="460px">
        <Heading as="h2" color={titleColor} fontWeight="300" px="16px" py="10px" size="sm">
          Swap
        </Heading>
        <VStack minH="160px" justifyContent="center" spacing="20px">
          <Loader isLoading={loading} />
          {!loading && (
            <>
              <TokenPicker active={token0} disabled={token1} setActive={setInput} tokens={tokens} />
              <IconButton
                aria-label="Switch tokens"
                icon={<Icon boxSize={8} p={0} as={BiTransferAlt} />}
                isRound={true}
                onClick={switchTokens}
                size="lg"
                transform="rotateZ(-90deg)"
              />
              <TokenPicker active={token1} disabled={token0} setActive={setOutput} tokens={tokens} />
            </>
          )}
        </VStack>
        {token0 && token1 && <PairInfo token0={token0.id} token1={token1.id} />}
        <ConfirmButton />
      </Stack>
    </Center>
  )
}

Swap.suppressFirstRenderFlicker = true
Swap.getLayout = (page) => <Layout title="Swap">{page}</Layout>

export default Swap
