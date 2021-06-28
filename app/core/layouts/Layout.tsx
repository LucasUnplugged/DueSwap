import React from 'react'
import { Head } from 'blitz'
import { Grid } from '@chakra-ui/react'
import Header from '../components/Header'

type LayoutProps = {
  title?: string
  children: React.ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} – DueSwap` || 'DueSwap'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh" templateRows={{ base: '160px minmax(400px, auto)', sm: '80px minmax(400px, auto)' }} as="main">
        <Header />
        {children}
      </Grid>
    </>
  )
}

export default Layout
