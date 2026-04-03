'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

// Service icon renderer (matches service page icons)
function NavSvcIcon({ type }) {
  const p = { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (type) {
    case 'polygon': return <svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case 'people':  return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'video':   return <svg {...p}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
    case 'share':   return <svg {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
    case 'chart':   return <svg {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case 'play':    return <svg {...p}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>;
    case 'browser': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
    case 'lightbulb': return <svg {...p}><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>;
    default:        return <svg {...p}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

const services = [
  { href: '/services/brand-strategy',      label: 'Brand Strategy',        desc: 'Identity & positioning',     iconType: 'polygon'   },
  { href: '/services/influencer-marketing', label: 'Influencer Marketing',  desc: 'Creator partnerships',      iconType: 'people'    },
  { href: '/services/content-production',  label: 'Content Production',    desc: 'Video, photo & creative',    iconType: 'video'     },
  { href: '/services/social-media',        label: 'Social Media',          desc: 'Full management & growth',   iconType: 'share'     },
  { href: '/services/paid-media',          label: 'Paid Media & Ads',      desc: 'Meta, Google & more',        iconType: 'chart'     },
  { href: '/services/video-production',    label: 'Video Production',      desc: 'Films & brand videos',       iconType: 'play'      },
  { href: '/services/web-development',     label: 'Digital Product Dev',desc: 'Sites & landing pages',      iconType: 'browser'   },
  { href: '/services/consulting',          label: 'Consulting',            desc: 'Strategy & advisory',        iconType: 'lightbulb' },
];

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/for-brands',  label: 'For Brands' },
  { href: '/for-creators',label: 'For Creators' },
  { label: 'Our Services', isDropdown: true },
  { href: '/blog',        label: 'Blog' },
  { href: '/careers',     label: 'Careers' },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.svg key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.svg>
        ) : (
          <motion.svg key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ServicesDropdown({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] rounded-2xl p-4 grid grid-cols-2 gap-2 z-50"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Triangle pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
            <div className="w-3 h-3 rotate-45 mx-auto mt-1" style={{ background: 'var(--glass-bg)', border: '1px solid var(--border)' }} />
          </div>

          {services.map((s, i) => (
            <motion.div key={s.href} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link
                href={s.href}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group"
                onMouseEnter={e => e.currentTarget.style.background = 'var(--glass-light-bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Industry-standard icon instead of colour dot */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-orange transition-colors duration-200 group-hover:bg-orange group-hover:text-white"
                  style={{ background: 'rgba(255,107,0,0.1)' }}
                >
                  <NavSvcIcon type={s.iconType} />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight group-hover:text-orange transition-colors" style={{ color: 'var(--heading)' }}>
                    {s.label}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
          {/* No "Book a Service" CTA here — removed per request */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isServicesActive = pathname.startsWith('/services');

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={scrolled ? {
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          background: 'var(--glass-bg)',
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.12)',
          padding: '10px 0',
        } : {
          backdropFilter: 'none',
          background: 'transparent',
          borderBottom: '1px solid transparent',
          padding: '20px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-manrope text-2xl font-bold tracking-tight">
              <span className="text-orange group-hover:text-white transition-colors duration-300">.</span>
              <span style={{ color: 'var(--logo-text)' }} className="group-hover:text-orange transition-colors duration-300">creatorstick</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key="services"
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 ${isServicesActive ? 'text-orange' : 'text-gray hover:text-orange'}`}
                      style={{ color: isServicesActive ? '#FF6B00' : undefined }}
                    >
                      {link.label}
                      <motion.svg animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>
                    {isServicesActive && (
                      <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                    <ServicesDropdown isOpen={servicesOpen} onClose={() => setServicesOpen(false)} />
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog')) ? 'text-orange' : 'text-gray hover:text-orange'}`}
                >
                  {link.label}
                  {(pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog'))) && (
                    <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle + CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* CTA: "Get in Touch" */}
            <Link
              href="/book"
              className="hidden sm:block bg-orange hover:bg-[#ff8533] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,0,0.4)]"
              style={{ color: '#ffffff' }}
            >
              Get in Touch
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-xl transition-all duration-300"
              aria-label="Toggle menu"
              style={{
                background: isOpen
                  ? 'rgba(255,107,0,0.15)'
                  : 'var(--glass-light-bg)',
                border: isOpen
                  ? '1px solid rgba(255,107,0,0.4)'
                  : '1px solid var(--border-hover)',
                boxShadow: isOpen
                  ? '0 0 20px rgba(255,107,0,0.2)'
                  : 'none',
              }}
            >
              {/* Top bar */}
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7, width: '20px' } : { rotate: 0, y: 0, width: '20px' }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block h-[2px] rounded-full origin-center"
                style={{ background: isOpen ? '#FF6B00' : 'var(--heading)' }}
              />
              {/* Middle bar */}
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] rounded-full"
                style={{ width: '14px', background: 'var(--heading)', alignSelf: 'flex-end', marginRight: '3px' }}
              />
              {/* Bottom bar */}
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7, width: '20px' } : { rotate: 0, y: 0, width: '20px' }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="block h-[2px] rounded-full origin-center"
                style={{ background: isOpen ? '#FF6B00' : 'var(--heading)' }}
              />
              {/* Orange dot — closed state indicator */}
              {!isOpen && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-orange"
                  style={{ boxShadow: '0 0 6px rgba(255,107,0,0.8)' }}
                />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-xl flex flex-col items-center justify-center gap-5 lg:hidden overflow-y-auto pt-20 pb-8"
            style={{ background: 'var(--mobile-menu-bg)' }}
          >
            {navLinks.map((link, i) => {
              if (link.isDropdown) {
                return (
                  <motion.div key="services-mobile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center gap-3 w-full max-w-xs">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center gap-2 text-2xl font-bold font-montserrat"
                      style={{ color: isServicesActive ? '#FF6B00' : 'var(--heading)' }}
                    >
                      Our Services
                      <motion.svg animate={{ rotate: mobileServicesOpen ? 180 : 0 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="w-full overflow-hidden rounded-2xl" style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)' }}>
                          <div className="p-3 grid grid-cols-2 gap-2">
                            {services.map((s) => (
                              <Link
                                key={s.href}
                                href={s.href}
                                onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                                className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium text-orange"
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,0,0.08)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                              >
                                <span className="flex-shrink-0 opacity-70"><NavSvcIcon type={s.iconType} /></span>
                                <span style={{ color: 'var(--heading)' }}>{s.label}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link
                    href={link.href}
                    className="text-3xl font-bold font-montserrat"
                    style={{ color: pathname === link.href ? '#FF6B00' : 'var(--heading)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex items-center gap-4 mt-4">
              <ThemeToggle />
              <Link
                href="/book"
                className="bg-orange text-white px-8 py-3 rounded-full text-lg font-semibold"
                style={{ color: '#ffffff' }}
                onClick={() => setIsOpen(false)}
              >
                Get in Touch
              </Link>
            </motion.div>
            {/* Social quick links in mobile menu */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="flex gap-4 mt-2">
              {[
                { href: 'https://www.instagram.com/creatorstick/', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href: 'https://x.com/creatorstick', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/></svg> },
                { href: 'https://www.linkedin.com/company/creatorstick', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-orange hover:text-white"
                  style={{ background: 'var(--glass-light-bg)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                >{s.icon}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
