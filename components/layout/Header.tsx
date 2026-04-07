'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, LogOut, User, LayoutDashboard, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Updates' },
  { href: '/donate', label: 'Donate', highlight: true },
  { href: '/community', label: 'Community' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/branches', label: 'Branches' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const items = mobileItemsRef.current;
    if (!menu || !items) return;

    if (mobileOpen) {
      // Slide + fade in container
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'power3.out' },
      );
      // Stagger each nav item
      gsap.fromTo(
        items.children,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, stagger: 0.05, ease: 'power2.out', delay: 0.1 },
      );
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.25, ease: 'power3.in' });
    }
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-[#0c1221]/95 backdrop-blur-md shadow-lg shadow-navy/10'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="https://res.cloudinary.com/dkd3k6eau/image/upload/q_auto/f_auto/v1775173015/Photoroom-ccask_poib8c.png"
              alt="CCASKESA crest"
              width={44}
              height={44}
              className="object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
              priority
            />
            <div className="hidden sm:block">
              <div className={cn('font-bold text-sm leading-tight', scrolled ? 'text-navy dark:text-white' : 'text-white')}>CCASKESA</div>
              <div className={cn('text-[10px] leading-tight', scrolled ? 'text-slate-500 dark:text-slate-300' : 'text-white/70')}>Alumni</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, highlight }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                  highlight
                    ? 'bg-sky-500 text-white hover:bg-sky-400 shadow-md shadow-sky-500/30 px-4'
                    : pathname === href
                    ? scrolled
                      ? 'text-sky-500 bg-sky-50 dark:bg-sky-900/20'
                      : 'text-white bg-white/15'
                    : scrolled
                    ? 'text-slate-700 dark:text-slate-300 hover:text-sky-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={cn('p-2 rounded-lg transition-colors', scrolled ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white/90 hover:text-white hover:bg-white/10')}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isAuthenticated ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#162032] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 z-50">
                    <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <User size={15} /> Profile
                    </Link>
                    <hr className="my-1 border-slate-200 dark:border-slate-700" />
                    <button onClick={logout} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/login" className={cn('px-3 py-1.5 text-sm font-medium transition-colors', scrolled ? 'text-slate-700 dark:text-slate-300 hover:text-sky-500' : 'text-white/90 hover:text-white')}>
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-1.5 text-sm font-medium bg-navy text-white rounded-lg hover:bg-navy-light transition-colors shadow-md">
                  Join Us
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white/90 hover:text-white hover:bg-white/10')}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — always mounted, GSAP controls height/opacity */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden overflow-hidden h-0 opacity-0 bg-white dark:bg-[#0c1221] border-t border-slate-200 dark:border-slate-800 shadow-xl"
      >
        <div ref={mobileItemsRef} className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, highlight }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                highlight
                  ? 'bg-sky-500 text-white'
                  : pathname === href
                  ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-500'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
              )}
            >
              {label}
            </Link>
          ))}
          <hr className="my-2 border-slate-200 dark:border-slate-700" />
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <button onClick={logout} className="px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="flex-1 py-2.5 text-center text-sm font-medium border border-slate-300 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300">
                Sign In
              </Link>
              <Link href="/register" className="flex-1 py-2.5 text-center text-sm font-medium bg-navy text-white rounded-xl">
                Join Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
