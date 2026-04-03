import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

const FOOTER_LINKS = {
  'Quick Links': [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Updates' },
    { href: '/gallery', label: 'Gallery' },
  ],
  'Get Involved': [
    { href: '/donate', label: 'Donate Now' },
    { href: '/register', label: 'Join as Member' },
    { href: '/newsletter', label: 'Newsletter' },
    { href: '/community', label: 'Our Community' },
  ],
  Branches: [
    { href: '/branches/france', label: '🇫🇷 France' },
    { href: '/branches/uk', label: '🇬🇧 United Kingdom' },
    { href: '/branches/cameroon', label: '🇨🇲 Cameroon' },
    { href: '/branches', label: 'All Branches →' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy dark:bg-[#060e1c] text-white">
      {/* Newsletter strip */}
      <div className="bg-linear-to-r from-sky-500 to-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Stay Connected</h3>
            <p className="text-sky-100 text-sm mt-1">Get updates on scholarships, projects, and events.</p>
          </div>
          <form
            action="/api/newsletter"
            method="POST"
            className="flex gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 rounded-xl bg-white/20 text-white placeholder:text-sky-100 border border-white/30 focus:outline-none focus:border-white text-sm flex-1 md:w-64"
            />
            <Link
              href="/newsletter"
              className="px-5 py-2.5 bg-white text-sky-600 rounded-xl font-semibold text-sm hover:bg-sky-50 transition-colors whitespace-nowrap"
            >
              Subscribe
            </Link>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://res.cloudinary.com/dkd3k6eau/image/upload/q_auto/f_auto/v1775173015/Photoroom-ccask_poib8c.png"
                alt="CCASKESA crest"
                width={48}
                height={48}
                className="object-contain drop-shadow-md"
              />
              <div>
                <div className="font-bold text-lg">CCASKESA</div>
                <div className="text-xs text-sky-300">CCAS KUMBA - Since 1973</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering the next generation through education. Supporting students with scholarships,
              computers, and mentorship across 6+ countries.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-400 rounded-xl text-sm font-semibold transition-colors"
            >
              <MessageCircle size={16} />
              Join WhatsApp Group
            </a>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="Facebook" title="Facebook" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="X (Twitter)" title="X (Twitter)" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-black flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" title="LinkedIn" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#0A66C2] flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" title="YouTube" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} CCASKESA Alumni.{' '}
            <a
              href="https://portfolio-2026-nine-weld.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              Contact Developer
            </a>
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-sky-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-sky-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
