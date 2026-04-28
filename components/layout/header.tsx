import Logo from './logo'
import NavigationLinks from './navigation-links'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800 flex justify-between items-center'>
      <Logo />
      <NavigationLinks />
    </header>
  )
}

export default Header
