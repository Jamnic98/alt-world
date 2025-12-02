import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

import { NavLink } from '@/components'
import { imageFolder } from '@/constants'

interface HeaderProps {
  logoSrc: string
  instagramUrl: string
}

const Header: React.FC<HeaderProps> = ({ logoSrc, instagramUrl }) => {
  const textColor = 'text-white'

  return (
    <header
      className={`
        absolute top-0 w-full py-3 px-4 flex items-center justify-between z-50
        bg-transparent ${textColor}
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center mx-2">
        <Image
          src={logoSrc}
          alt="AltWorld Logo"
          width={80}
          height={80}
          priority
          className="w-14 h-auto sm:w-16 md:w-20"
        />
      </Link>

      {/* Nav */}
      <nav className="mx-2 flex gap-4 sm:gap-8 md:gap-16 text-xs sm:text-sm md:text-lg font-medium">
        <NavLink href="/platform">
          <div className="relative shrink-0 w-20 sm:w-[105px] h-8 sm:h-[50px]">
            <Image
              src={`${imageFolder}/titles/platform.webp`}
              alt="platform page link"
              fill
              className="object-contain"
              priority
            />
          </div>
        </NavLink>

        <NavLink href="/studio">
          <div className="relative shrink-0 w-16 sm:w-20 h-8 sm:h-[50px]">
            <Image
              src={`${imageFolder}/titles/studio.webp`}
              alt="studio page link"
              fill
              className="object-contain"
              priority
            />
          </div>
        </NavLink>
      </nav>

      {/* Instagram */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4"
        aria-label="Visit our studio Instagram"
      >
        <FaInstagram className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </a>
    </header>
  )
}

export default Header
