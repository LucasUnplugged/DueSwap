import React from 'react'
import { BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'

const Pool: BlitzPage = () => {
  return (
    <main>
      <p>Test</p>
    </main>
  )
}

Pool.suppressFirstRenderFlicker = true
Pool.getLayout = (page) => <Layout title="Pool">{page}</Layout>

export default Pool
