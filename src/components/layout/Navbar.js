

'use client';

import { useState } from 'react';
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
  faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  const currentLocale = pathname.split('/')[1];
  
  const navLinks = [
    { href: '/', label: t('common.home') },
    { href: '/about', label: t('common.about') },
    { href: '/president', label: 'President' },  
    { href: '/activities', label: t('common.activities') },
    { href: '/events', label: t('common.events') },
    // { href: '/blog', label: t('common.blog') },
    { href: '/contact', label: t('common.contact') },
  ];

  const switchLocale = (locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setLangMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo avec image */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-1">
            <Image 
              src="/aysalogo.jpg" 
              alt="AYSA Foundation Logo" 
              width={130} 
              height={130}
              className="rounded-lg object-cover"
            />
            <span className="font-heading font-bold text-lg text-primary-600 hidden sm:block">
              AYSA Foundation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${currentLocale}${link.href}`}
                className={cn(
                  "text-stone-700 hover:text-primary-600 transition-colors duration-200 font-medium text-sm",
                  pathname === `/${currentLocale}${link.href}` && "text-primary-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth Links */}
            <div className="flex items-center gap-2 ml-2">
              <Link 
                href={`/${currentLocale}/auth`} 
                className="flex items-center gap-1 px-3 py-2 text-stone-700 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                <FontAwesomeIcon icon={faSignInAlt} className="text-xs" />
                {t('common.login')}
              </Link>
              <Link 
                href={`/${currentLocale}/auth`} 
                className="flex items-center gap-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                <FontAwesomeIcon icon={faUser} className="text-xs" />
                {t('common.register')}
              </Link>
            </div>

            <Link href={`/${currentLocale}/donate`} className="btn-primary text-sm ml-2">
              <FontAwesomeIcon icon={faHeart} className="mr-1" />
              {t('common.donate')}
            </Link>

            {/* Language Switcher */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <FontAwesomeIcon icon={faGlobe} className="text-stone-600" />
                <span className="uppercase font-medium text-sm">{currentLocale}</span>
                <FontAwesomeIcon icon={faChevronDown} className="text-xs text-stone-400" />
              </button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-200 py-2 min-w-[120px] z-50"
                  >
                    {['en', 'fr'].map((locale) => (
                      <button
                        key={locale}
                        onClick={() => switchLocale(locale)}
                        className={cn(
                          "w-full text-left px-4 py-2 hover:bg-stone-50 transition-colors",
                          currentLocale === locale && "bg-primary-50 text-primary-600 font-medium"
                        )}
                      >
                        {locale === 'en' ? 'English' : 'Français'}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${currentLocale}${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-stone-50 text-stone-700 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/${currentLocale}/auth`}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 text-center rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  {t('common.login')}
                </Link>
                <Link
                  href={`/${currentLocale}/auth`}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 text-center rounded-lg bg-primary-500 text-white font-medium"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {t('common.register')}
                </Link>
              </div>

              <Link
                href={`/${currentLocale}/donate`}
                onClick={() => setIsOpen(false)}
                className="btn-primary block text-center mt-2"
              >
                <FontAwesomeIcon icon={faHeart} className="mr-2" />
                {t('common.donate')}
              </Link>
              
              <div className="flex gap-2 pt-4 border-t border-stone-200">
                {['en', 'fr'].map((locale) => (
                  <button
                    key={locale}
                    onClick={() => {
                      switchLocale(locale);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-lg border transition-colors",
                      currentLocale === locale 
                        ? "border-primary-500 bg-primary-50 text-primary-600" 
                        : "border-stone-200 hover:bg-stone-50"
                    )}
                  >
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
