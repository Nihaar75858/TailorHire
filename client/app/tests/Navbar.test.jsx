import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/Navbar'
import { useUser } from '../hooks/useAuth'
import { getNavigationConfig } from '../constants/utils'

// Mock dependencies
jest.mock('../hooks/useAuth')
jest.mock('../constants/utils', () => ({
  getNavigationConfig: jest.fn(),
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders logo and default Viewer nav links', () => {
    useUser.mockReturnValue({ userType: 'Viewer' })
    getNavigationConfig.mockReturnValue([
      { name: 'Products', submenus: null },
      { name: 'About', to: '/about' },
    ])

    render(<Navbar />)

    // Expect the logo and the link text
    expect(screen.getByAltText('')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  test('renders Sign in button for Viewer', () => {
    useUser.mockReturnValue({ userType: 'Viewer' })
    getNavigationConfig.mockReturnValue([{ name: 'Products', to: '#' }])

    render(<Navbar />)
    expect(screen.getByText(/sign in/i)).toBeInTheDocument()
  })

  test('shows sidebar when user clicks menu button (logged-in user)', () => {
    useUser.mockReturnValue({ userType: 'Admin' })
    getNavigationConfig.mockReturnValue([{ name: 'Home', to: '/home' }])

    render(<Navbar />)
    const menuButton = screen.getAllByRole('button')[0]
    fireEvent.click(menuButton)

    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  test('triggers logout when Sign out is clicked', () => {
    useUser.mockReturnValue({ userType: 'Admin' })
    getNavigationConfig.mockReturnValue([{ name: 'Home', to: '/home' }])

    delete window.location
    window.location = { href: '' }

    render(<Navbar />)

    // Open sidebar
    const menuButton = screen.getAllByRole('button')[0]
    fireEvent.click(menuButton)

    // Click sign out
    const signOutButton = screen.getByText(/sign out/i)
    fireEvent.click(signOutButton)

    expect(window.location.href).toBe('/')
  })
})
