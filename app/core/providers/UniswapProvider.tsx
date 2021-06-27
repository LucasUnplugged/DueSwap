import React from 'react'
import { Chains, Subgraphs, TheGraphProvider, useCreateSubgraph } from 'thegraph-react'

interface UniswapProviderProps {
  children: React.ReactElement
}

export default function UniswapProvider({ children }: UniswapProviderProps) {
  const subgraph = useCreateSubgraph({
    [Chains.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  })

  const subgraphs = React.useMemo((): Subgraphs => {
    return [subgraph]
  }, [subgraph])

  return (
    <TheGraphProvider chain={Chains.MAINNET} subgraphs={subgraphs}>
      {children}
    </TheGraphProvider>
  )
}
