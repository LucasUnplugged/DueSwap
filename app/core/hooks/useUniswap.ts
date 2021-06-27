import { Chains, Subgraph, useTheGraph, useSubgraph } from 'thegraph-react'
import { ApolloClient, ApolloQueryResult, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

export function useUniswap<TData = any>() {
  const { clients, subgraphs } = useTheGraph()
  const [uniswapGraph] = subgraphs
  const uniswap: Subgraph = uniswapGraph || { id: '', uris: { [Chains.MAINNET]: '' } }

  const uniswapClient = uniswap ? clients[uniswap.id] : null
  const client: ApolloClient<NormalizedCacheObject> =
    uniswapClient || new ApolloClient({ uri: '', cache: new InMemoryCache() })

  const query = (terms: string): Promise<ApolloQueryResult<TData>> =>
    client.query({
      query: gql`
        ${terms}
      `,
    })

  const { useQuery: useQueryApollo } = useSubgraph<TData, unknown>(uniswap)
  const useQuery = (terms: string) =>
    useQueryApollo(
      gql`
        ${terms}
      `
    )

  return { client, query, uniswap, useQuery }
}
