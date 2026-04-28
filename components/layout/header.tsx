import Logo from './logo'
import NavigationLinks from './navigation-links'

const Header = () => {
  return (
    <header className='bg-gray-900 flex justify-between items-center'>
      <Logo />
      <NavigationLinks />
    </header>
  )
}

export default Header
