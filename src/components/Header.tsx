import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

import { NavLink } from '@/components'

type HeaderVariant = 'light' | 'dark'
interface HeaderProps {
  variant: HeaderVariant
  instagramUrl: string
}

const Header: React.FC<HeaderProps> = ({ variant, instagramUrl }) => {
  // Base text colour
  const textColor = variant === 'light' ? 'text-black' : 'text-white'

  // Hover colour: choose high contrast
  const hoverColor = variant === 'light' ? 'hover:text-gray-600' : 'hover:text-gray-400'

  // Select logo based on variant
  const logoSrc =
    variant === 'light' ? '/images/altworld-logo-dark.webp' : '/images/altworld-logo-light.webp'

  return (
    <header
      className={`w-full py-4 px-4 flex items-center justify-between fixed top-0 z-50 bg-transparent ${textColor}`}
    >
      {/* Left: Logo */}
      <Link href="/" className="flex items-center mx-2">
        <Image src={logoSrc} alt="AltWorld Logo" width={80} height={80} priority />
      </Link>

      {/* Center: Navigation */}
      <nav className="flex gap-4 sm:gap-12 md:gap-24">
        <NavLink href="/platform" label="PLATFORM" />
        <NavLink href="/studio" label="STUDIO" />
      </nav>

      {/* Right: Instagram */}
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
