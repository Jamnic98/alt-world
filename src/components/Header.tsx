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
    bg-transparent text-white
  `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center mx-2 shrink-0 border-none">
        <Image
          src={logoSrc}
          alt="AltWorld Logo"
          width={80}
          height={80}
          priority
          className="w-14 sm:w-16 md:w-20 min-w-12 h-auto"
        />
      </Link>

      {/* Nav: centred */}
      <nav className="flex-1 flex justify-center mx-2">
        <div className="flex gap-4 sm:gap-8 md:gap-16 lg:gap-24">
          <NavLink href="/platform">
            <div className="relative shrink-0 w-[60px] sm:w-[105px] md:w-[140px] h-8 sm:h-[50px] min-w-[50px]">
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
            <div className="relative shrink-0 w-[50px] sm:w-[95px] md:w-[120px] h-8 sm:h-[50px] min-w-[45px]">
              <Image
                src={`${imageFolder}/titles/studio.webp`}
                alt="studio page link"
                fill
                className="object-contain"
                priority
              />
            </div>
          </NavLink>
        </div>
      </nav>

      {/* Instagram */}
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 shrink-0"
        aria-label="Visit our studio Instagram"
      >
        <FaInstagram className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 min-w-6 min-h-6" />
      </a>
    </header>
  )
}

export default Header
