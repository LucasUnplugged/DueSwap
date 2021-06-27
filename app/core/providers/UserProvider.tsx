import React from 'react'
import getCurrentUser from 'app/users/queries/getCurrentUser'
import { useQuery } from 'blitz'

interface IUserContext {
  isAuthenticated: boolean
  setIsAuthenticated: (isAuthenticated: boolean) => void
}
export const UserContext = React.createContext<IUserContext>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    //
  },
})

interface UserProviderProps {
  children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user] = useQuery(getCurrentUser, null)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(!!user)
  React.useEffect(() => {
    setIsAuthenticated(!!user)
  }, [user])

  return <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</UserContext.Provider>
}
