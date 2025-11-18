import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

import { NavLink } from '@/components'
import { imageFolder } from '@/constants'

type HeaderVariant = 'light' | 'dark'
interface HeaderProps {
  variant: HeaderVariant
  instagramUrl: string
}

const Header: React.FC<HeaderProps> = ({ variant, instagramUrl }) => {
  const textColor = variant === 'light' ? 'text-black' : 'text-white'
  const hoverColor = variant === 'light' ? 'hover:text-gray-600' : 'hover:text-gray-400'
  const logoSrc =
    variant === 'light'
      ? `${imageFolder}/logos/alt_world.webp`
      : `${imageFolder}/logos/alt_studio.webp`

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

      <nav className="flex gap-4 sm:gap-12 md:gap-24">
        <NavLink href="/platform" label="PLATFORM" />
        <NavLink href="/studio" label="STUDIO" />
      </nav>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`ml-8 transition-colors ${hoverColor}`}
        aria-label="Visit our studio Instagram"
      >
        <FaInstagram size={28} />
      </a>
    </header>
  )
}

export default Header
