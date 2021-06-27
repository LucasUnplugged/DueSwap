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

      <Grid templateRows="80px auto" as="main">
        <Header />
        {children}
      </Grid>
    </>
  )
}

export default Layout
