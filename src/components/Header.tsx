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
    <header className="absolute top-0 z-50 flex items-center justify-center w-full px-4 pt-3 text-white bg-transparent">
      {/* Logo  */}
      <div className="absolute flex items-center left-4 shrink-0">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Alt World Logo"
            width={459}
            height={305}
            priority
            className="w-16 h-auto mt-4 sm:w-20 md:w-24"
          />
        </Link>
      </div>

      {/* Nav - fully centred */}
      <nav className="flex justify-center flex-1">
        <div className="flex gap-6 sm:gap-8 md:gap-24 lg:gap-36 xl:gap-48">
          <NavLink href="/platform">
            <div className="relative w-[70px] sm:w-[115px] md:w-[140px] h-8 sm:h-[50px] min-w-[50px]">
              <Image
                src={`${imageFolder}/titles/platform.webp`}
                alt="Platform page link"
                fill
                className="object-contain"
                priority
              />
            </div>
          </NavLink>

          <NavLink href="/studio">
            <div className="relative w-[50px] sm:w-[90px] md:w-[110px] h-8 sm:h-[50px] min-w-[45px]">
              <Image
                src={`${imageFolder}/titles/studio.webp`}
                alt="Studio page link"
                fill
                className="object-contain"
                priority
              />
            </div>
          </NavLink>
        </div>
      </nav>

      {/* Instagram - absolute right */}
      <div className="absolute flex items-center right-4 shrink-0">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit our studio Instagram"
        >
          <FaInstagram className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </a>
      </div>
    </header>
  )
}

export default Header
