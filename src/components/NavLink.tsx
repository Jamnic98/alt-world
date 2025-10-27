'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  label: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`
        relative transition-colors font-semibold tracking-widest
        after:block after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-current
        after:transition-all after:duration-300
        ${isActive ? 'after:w-[calc(100%+16px)]' : 'after:w-0'}
        hover:after:w-[calc(100%+16px)]
        after:-translate-x-1/2
      `}
    >
      {label}
    </Link>
  )
}

export default NavLink
