import { useQuery } from 'blitz'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import React from 'react'
import { UserContext } from '../providers/UserProvider'

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  const { isAuthenticated, setIsAuthenticated } = React.useContext(UserContext)
  return { isAuthenticated, setIsAuthenticated, user }
}
