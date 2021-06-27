export const queryTokens = () => `
{
  tokens(
    first: 100,
    where: { tradeVolumeUSD_gte: "350000000", name_not_contains:"You don't blacklist" },
    orderBy: symbol,
    orderDirection: asc
  ) {
    id
    symbol
    name
    decimals
    derivedETH
  }
}
`

interface QueryPairs {
  token0: string
  token1: string
}
export const queryPairs = ({ token0, token1 }: QueryPairs) => `
{
  pairs(
    first:1,
    where: {
      token0: "${token0}",
      token1: "${token1}"
    },
    orderBy: reserveUSD,
    orderDirection: desc
  ) {
    id
    token0 {
      id
      symbol
      name
    }
    token1 {
      id
      symbol
      name
    }
    liquidityProviderCount
    reserve0
    reserve1
    reserveUSD
    token0Price
    token1Price
    totalSupply
    volumeToken0
    volumeToken1
    volumeUSD
  }
}
`
