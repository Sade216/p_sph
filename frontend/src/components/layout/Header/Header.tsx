import LogoSVG from '@/assets/Logo.svg'
import { NavLink } from 'react-router'
import ThemeToggleButton from './ThemeToggleButton'
import NavMenuButton from './NavMenuButton'
import { Badge } from '@/components/ui/badge'

function Header() {
  return (
    <header className="sticky top-0 backdrop-blur-xl flex flex-row justify-between sm:px-0 lg:px-24 h-15 items-center">
        <NavLink to='/' className='flex flex-row gap-2 text-primary hover:text-purple-500 items-center'>
            <img src={LogoSVG}/>
            <div >Sample Packs House</div>
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