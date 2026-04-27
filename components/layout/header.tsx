import Logo from './logo'
import NavigationLinks from './navigation-links'

const Header = () => {
  return (
    <header className='bg-gray-900 flex justify-between items-end'>
      <Logo />
      <NavigationLinks />
    </header>
  )
}

export default Header
