import LogoSVG from '@/assets/Logo.svg'
import { NavLink } from 'react-router'
import ThemeToggleButton from './ThemeToggleButton'
import NavMenuButton from './NavMenuButton'
import { Badge } from '@/components/ui/badge'

function Header() {
  return (
    <header className="sticky top-0 backdrop-blur-lg flex flex-row justify-between px-4 sm:px-10 lg:px-24 h-15 items-center">
        <NavLink to='/' className='flex flex-row gap-2 text-primary hover:text-purple-500 items-center'>
            <img src={LogoSVG}/>
            <div className='hidden sm:block lg:block' >Sample Packs House</div>
            <Badge className='scale-80' variant="destructive">{`Work still in progress...`}</Badge>
        </NavLink>
        <div className="flex flex-row gap-2 items-center rounded-full bg-muted">
            <ThemeToggleButton/>
            <NavMenuButton/>
        </div>
        
    </header>
  )
}

export default Header