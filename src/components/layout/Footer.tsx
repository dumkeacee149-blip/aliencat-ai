import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span>🐱👽</span>
            <span>AlienCat.ai</span>
            <span className="text-white/20">|</span>
            <span>built by a cat from sector 7</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <Link href="/swap" className="hover:text-white/60 transition">
              Face Swap
            </Link>
            <Link href="/species" className="hover:text-white/60 transition">
              Species
            </Link>
            <a
              href="https://x.com/aliencat_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition"
            >
              Twitter
            </a>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} AlienCat. Not affiliated with any government or galactic federation. Probably.
        </p>
      </div>
    </footer>
  )
}
