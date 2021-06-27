export interface PairToken {
  id: string
  symbol: string
}

export interface PairData {
  id: string
  reserveUSD: string
  token0: PairToken
  token1: PairToken
  volumeUSD: string
}

export interface PairGraphData {
  pairs: PairData[]
}
export interface TokenData {
  id: string
  symbol: string
  name: string
  decimals: number
  derivedETH: number
}

export interface TokenGraphData {
  tokens: TokenData[]
}
