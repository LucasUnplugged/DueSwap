import { Link, Routes, useMutation, useRouter } from 'blitz'
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Link as UILink,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { BiMoon, BiSun, BiTransferAlt } from 'react-icons/bi'
import React from 'react'
import theme from '../styles/theme'
import logout from 'app/auth/mutations/logout'
import { useCurrentUser } from '../hooks/useCurrentUser'

export default function Header() {
  const {
    query: { input, output },
  } = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const toggleLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const toggleIcon = isDark ? <BiSun /> : <BiMoon />
  const logoColor = useColorModeValue('teal.600', 'teal.200')
  const { isAuthenticated, setIsAuthenticated } = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const inputParam = input ? `?input=${input}` : ''
  const outPrefix = input ? '&' : '?'
  const outputParam = output ? `${outPrefix}output=${output}` : ''
  const params = {
    next: `${Routes.Swap().pathname}${inputParam}${outputParam}`,
    input,
    output,
  }

  return (
    <Grid
      as="header"
      alignItems="center"
      gap={{ base: 0, sm: '20px' }}
      h="100%"
      justifyItems={{ base: 'center', sm: 'end' }}
      px="20px"
      templateColumns={{ base: '1fr', sm: '150px auto' }}
      templateRows={{ base: '1fr 1fr', sm: '1fr' }}
    >
      <GridItem
        as="h1"
        color={logoColor}
        justifySelf={{ base: 'center', sm: 'start' }}
        fontSize="24px"
        fontWeight="500"
      >
        <Icon boxSize={9} pr={1} as={BiTransferAlt} />
        DueSwap
      </GridItem>
      <HStack as="section" spacing="20px">
        <HStack spacing="20px" as="nav">
          <Link href={Routes.Swap({ input, output })} passHref>
            <UILink>Swap</UILink>
          </Link>
          <Link href={Routes.Pool({ input, output })} passHref>
            <UILink>Pool</UILink>
          </Link>
          {isAuthenticated ? (
            <Button
              onClick={async () => {
                await logoutMutation()
                setIsAuthenticated(false)
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href={Routes.LoginPage(params)} passHref>
              <Button>Login</Button>
            </Link>
          )}
        </HStack>
        <IconButton
          {...theme.components.IconButton.defaultProps}
          aria-label={toggleLabel}
          icon={toggleIcon}
          onClick={toggleColorMode}
        />
      </HStack>
    </Grid>
  )
}
