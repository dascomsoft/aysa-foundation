
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faGlobe,
  faChevronDown,
  faHeart,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
  faCog,
  faBullhorn,
  faCalendarCheck,
  faNewspaper,
  faUserTie,
  faProjectDiagram
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const currentLocale = pathname.split('/')[1];
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try { setUser(JSON.parse(userData)); } catch (e) { setUser(null); }
    }
  }, []);

  const navLinks = [
    { href: '/', label: t('common.home'), icon: null },
    { href: '/about', label: t('common.about'), icon: null },
    { href: '/president', label: 'President', icon: null },
    { href: '/events', label: t('common.events'), icon: faCalendarCheck },
    { href: '/announcements', label: 'Annonces', icon: faBullhorn },
    { href: '/blog', label: 'Actualités', icon: faNewspaper },
    { href: '/team', label: 'Équipe', icon: faUserTie },
    { href: '/programs', label: 'Programmes', icon: faProjectDiagram },
    { href: '/contact', label: t('common.contact'), icon: null },
  ];

  const switchLocale = (locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setLangMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUserMenuOpen(false);
    router.push('/');
  };

  const getDashboardLink = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return '/admin/super-admin';
      case 'PRESIDENT': return '/admin/super-admin';
      case 'ADMIN': return '/admin/executive';
      case 'MEMBER': return '/admin/volunteer';
      default: return '/profile';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-3">
            <Image 
              src="/aysalogo.jpg" 
              alt="AYSA Foundation" 
              width={40} 
              height={40}
              className="rounded-lg object-cover"
              priority
            />
            <span className="font-heading font-bold text-lg text-primary-600 hidden sm:block">
              AYSA AFRICA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${currentLocale}${link.href}`}
                className={cn(
                  "px-3 py-2 text-stone-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm rounded-lg hover:bg-stone-50",
                  pathname === `/${currentLocale}${link.href}` && "text-primary-600 bg-primary-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth + Donate */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUserCircle} className="text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-stone-700 max-w-[100px] truncate">{user.name}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs text-stone-400" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-stone-200">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-stone-500">{user.email}</p>
                          <span className="text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-medium mt-1 inline-block">{user.role}</span>
                        </div>
                        <Link href={getDashboardLink(user.role)} onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                          <FontAwesomeIcon icon={faCog} className="mr-2" />Dashboard
                        </Link>
                        <Link href={`/${currentLocale}/profile`} onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                          <FontAwesomeIcon icon={faUser} className="mr-2" />Mon Profil
                        </Link>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{t('common.logout')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href={`/${currentLocale}/auth`} className="flex items-center gap-1 px-3 py-2 text-stone-700 hover:text-primary-600 transition-colors text-sm font-medium">
                  <FontAwesomeIcon icon={faSignInAlt} className="text-xs" />
                  {t('common.login')}
                </Link>
              )}

              <Link href={`/${currentLocale}/donate`} className="btn-primary text-sm ml-1">
                <FontAwesomeIcon icon={faHeart} className="mr-1" />
                {t('common.donate')}
              </Link>

              <div className="relative ml-1">
                <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                  <FontAwesomeIcon icon={faGlobe} className="text-stone-600 text-sm" />
                  <span className="uppercase font-medium text-xs">{currentLocale}</span>
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-200 py-2 min-w-[120px] z-50">
                      {['en', 'fr'].map((locale) => (
                        <button key={locale} onClick={() => switchLocale(locale)} className={cn("w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors", currentLocale === locale && "bg-primary-50 text-primary-600 font-medium")}>
                          {locale === 'en' ? 'English' : 'Français'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-stone-100">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-stone-200">
            <div className="container mx-auto px-4 py-4 space-y-1">
              {user && (
                <div className="flex items-center gap-3 px-4 py-3 bg-primary-50 rounded-lg mb-2">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"><FontAwesomeIcon icon={faUserCircle} className="text-primary-600 text-xl" /></div>
                  <div className="flex-1"><p className="font-medium text-sm">{user.name}</p><p className="text-xs text-stone-500">{user.role}</p></div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link key={link.href} href={`/${currentLocale}${link.href}`} onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-stone-50 text-stone-700 font-medium">
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link href={getDashboardLink(user.role)} onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-lg bg-primary-50 text-primary-600 font-medium mt-2">
                    <FontAwesomeIcon icon={faCog} className="mr-2" />Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 font-medium">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />{t('common.logout')}
                  </button>
                </>
              ) : (
                <Link href={`/${currentLocale}/auth`} onClick={() => setIsOpen(false)} className="block px-4 py-3 text-center rounded-lg bg-primary-500 text-white font-medium mt-2">
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />{t('common.login')}
                </Link>
              )}

              <Link href={`/${currentLocale}/donate`} onClick={() => setIsOpen(false)} className="btn-primary block text-center mt-2">
                <FontAwesomeIcon icon={faHeart} className="mr-2" />{t('common.donate')}
              </Link>
              
              <div className="flex gap-2 pt-4 border-t border-stone-200">
                {['en', 'fr'].map((locale) => (
                  <button key={locale} onClick={() => { switchLocale(locale); setIsOpen(false); }} className={cn("flex-1 px-4 py-2 rounded-lg border transition-colors", currentLocale === locale ? "border-primary-500 bg-primary-50 text-primary-600" : "border-stone-200 hover:bg-stone-50")}>
                    {locale === 'en' ? 'English' : 'Français'}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
