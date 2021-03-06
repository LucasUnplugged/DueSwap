import { render } from 'test/utils'
import Swap from './swap'
import { useCurrentUser } from 'app/core/hooks/useCurrentUser'

jest.mock('app/core/hooks/useCurrentUser')
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

test.skip('renders swap title', () => {
  // This is an example of how to ensure a specific item is in the document
  // But it's disabled by default (by test.skip) so the test doesn't fail
  // when you remove the the default content from the page

  // This is an example on how to mock api hooks when testing
  mockUseCurrentUser.mockReturnValue({
    isAuthenticated: true,
    setIsAuthenticated: () => {
      //
    },
    user: {
      id: 1,
      name: 'User',
      email: 'user@email.com',
      role: 'user',
    },
  })

  const { getByText } = render(<Swap />)
  const titleElement = getByText(/Swap/i)
  expect(titleElement).toBeInTheDocument()
})
