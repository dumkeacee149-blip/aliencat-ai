'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/swap', label: 'Face Swap' },
  { href: '/species', label: 'Species Guide' },
] as const

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="text-2xl">🐱</span>
          <span className="bg-gradient-to-r from-[#39FF14] to-[#00D4FF] bg-clip-text text-transparent">
            AlienCat
          </span>
          <span className="text-xs text-white/30">.ai</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-[#39FF14]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Twitter */}
          <a
            href="https://x.com/aliencat_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            @aliencat_ai
          </a>
        </div>
      </div>
    </nav>
  )
}
