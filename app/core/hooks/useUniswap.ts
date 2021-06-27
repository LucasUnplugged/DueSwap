import { Chains, Subgraph, useTheGraph, useSubgraph } from 'thegraph-react'
import {
  ApolloClient,
  ApolloQueryResult,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
  QueryHookOptions,
} from '@apollo/client'

export function useUniswap<TData = any, TVars = unknown>() {
  const { clients, subgraphs } = useTheGraph()
  const [uniswapGraph] = subgraphs
  const uniswap: Subgraph = uniswapGraph || { id: '', uris: { [Chains.MAINNET]: '' } }

  const uniswapClient = uniswap ? clients[uniswap.id] : null
  const client: ApolloClient<NormalizedCacheObject> =
    uniswapClient || new ApolloClient({ uri: '', cache: new InMemoryCache() })

  const query = (terms: string, variables?: TVars): Promise<ApolloQueryResult<TData>> =>
    client.query({
      query: gql`
        ${terms}
      `,
      variables,
    })

  const { useQuery: useQueryApollo } = useSubgraph<TData, TVars>(uniswap)
  const useQuery = (terms: string, variables?: TVars) =>
    useQueryApollo(
      gql`
        ${terms}
      `,
      variables ? { variables } : undefined
    )

  return { client, query, uniswap, useQuery }
}
