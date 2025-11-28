import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

import { NavLink } from '@/components'

interface HeaderProps {
  logoSrc: string
  instagramUrl: string
}

const Header: React.FC<HeaderProps> = ({ logoSrc, instagramUrl }) => {
  const textColor = 'text-white'

  return (
    <header
      className={`
        absolute top-0 w-full py-4 px-4 flex items-center justify-between z-50
        bg-transparent ${textColor}
      `}
    >
      <Link href="/" className="flex items-center mx-2">
        <Image src={logoSrc} alt="AltWorld Logo" width={80} height={80} priority />
      </Link>

      <nav className="mx-4 flex gap-8 sm:gap-12 md:gap-24 text-sm sm:text-lg md:text-xl font-medium">
        <NavLink href="/platform" label="PLATFORM" />
        <NavLink href="/studio" label="STUDIO" />
      </nav>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={'ml-8'}
        aria-label="Visit our studio Instagram"
      >
        <FaInstagram size={28} />
      </a>
    </header>
  )
}

export default Header
