import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#39FF14]/10">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[13px] font-medium text-white/40">aliencatai</span>
            <span className="h-3 w-px bg-white/[0.06]" />
            <span className="text-[12px] text-white/20">built by a cat from sector 7</span>
          </div>

          <div className="flex items-center gap-5 text-[13px] text-white/20">
            <Link href="/swap" className="hover:text-white/40 transition">Face Swap</Link>
            <Link href="/species" className="hover:text-white/40 transition">Species</Link>
            <a
              href="https://x.com/alienaixyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white/40 transition"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @alienaixyz
            </a>
          </div>
        </div>

        <div className="section-line mt-6 mb-4" />

        <p className="text-center text-[11px] text-white/10">
          &copy; {new Date().getFullYear()} aliencatai. Not affiliated with any government or galactic federation. Probably.
        </p>
      </div>
    </footer>
  )
}
