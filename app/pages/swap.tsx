import React, { Suspense } from 'react'
import { Link, BlitzPage, useMutation, Routes, useRouter } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'
import logout from 'app/auth/mutations/logout'
import { ApolloQueryResult } from '@apollo/client'
import { useUniswap } from 'app/core/hooks/useUniswap'

interface PairToken {
  id: string
  symbol: string
  __typename: string
}

interface PairData {
  id: string
  reserveUSD: string
  token0: PairToken
  token1: PairToken
  volumeUSD: string
  __typename: string
}

interface PairGraphData {
  pairs: PairData[]
}

function GraphPool() {
  const { useQuery } = useUniswap<PairGraphData>()
  const { error, loading, data } = useQuery(`
    {
      pairs(where: { reserveUSD_gte: "9361270", volumeUSD_gte: "50000" }, orderBy: reserveUSD, orderDirection: desc) {
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
  `)
  console.warn('data', data)
  return <p>{error || loading ? 'Loading...' : data?.pairs.length}</p>
}

const UserInfo = () => {
  const { pathname } = useRouter()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage({ next: `${pathname}?in=DAI&out=USDC` })}>
          <a>
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage({ next: `${pathname}?in=DAI&out=USDC` })}>
          <a>
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Swap: BlitzPage = () => {
  // const { query } = useUniswap<PairGraphData>()
  // query(`
  //   {
  //     pairs(first: 1) {
  //       id
  //       token0 {
  //         id
  //         symbol
  //         name
  //       }
  //       token1 {
  //         id
  //         symbol
  //         name
  //       }
  //       liquidityProviderCount
  //       reserve0
  //       reserve1
  //       reserveUSD
  //       token0Price
  //       token1Price
  //       totalSupply
  //       volumeToken0
  //       volumeToken1
  //       volumeUSD
  //     }
  //   }
  // `).then((value: ApolloQueryResult<PairGraphData>) => {
  //   console.warn('value.data', value.data.pairs)
  // })

  return (
    <div>
      <GraphPool />
      <main>
        <div>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
        <p>
          <strong>
            To add a new model to your app, <br />
            run the following in your terminal:
          </strong>
        </p>
        <pre>
          <code>blitz generate all project name:string</code>
        </pre>
        <div>(And select Yes to run prisma migrate)</div>
        <div>
          <p>
            Then <strong>restart the server</strong>
          </p>
          <pre>
            <code>Ctrl + c</code>
          </pre>
          <pre>
            <code>blitz dev</code>
          </pre>
          <p>
            and go to{' '}
            <Link href="/projects">
              <a>/projects</a>
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

Swap.suppressFirstRenderFlicker = true
Swap.getLayout = (page) => <Layout title="Swap">{page}</Layout>

export default Swap
