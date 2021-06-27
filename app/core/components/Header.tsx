import { Link } from 'blitz'
import { Grid, GridItem, IconButton, Link as UILink, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const toggleLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const toggleIcon = isDark ? <SunIcon /> : <MoonIcon />
  return (
    <Grid
      as="header"
      alignItems="center"
      bg={isDark ? 'gray.700' : 'gray.100'}
      gap="20px"
      justifyItems="end"
      px="20px"
      templateColumns="120px auto 40px"
    >
      <GridItem as="h1" justifySelf="start" fontSize="24px" fontWeight="500">
        DueSwap
      </GridItem>
      <nav>
        <Link href="/swap">
          <UILink>Swap</UILink>
        </Link>
        <Link href="/pool">
          <UILink>Pool</UILink>
        </Link>
        <Link href="/login">
          <UILink>Login</UILink>
        </Link>
      </nav>
      <IconButton colorScheme="teal" aria-label={toggleLabel} icon={toggleIcon} onClick={toggleColorMode} />
    </Grid>
  )
}
