

'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faEnvelope,
  faPhone,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const t = useTranslations();
  
  return (
    <footer className="bg-stone-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand avec Logo */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image 
                src="/aysalogo.jpg" 
                alt="AYSA Foundation Logo" 
                width={100} 
                height={100}
                className="rounded-full"
              />
              <div>
                <span className="font-heading font-bold text-xl block">AYSA</span>
                <span className="text-xs text-stone-400">Foundation</span>
              </div>
            </div>
            <p className="text-stone-400 mb-6 leading-relaxed">
              Empowering African youth through education, innovation, and community engagement.
            </p>
            <div className="flex gap-3">
              {[faFacebook, faTwitter, faInstagram, faLinkedin].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: t('common.about') },
                { href: '/president', label: 'President' },
                { href: '/activities', label: t('common.activities') },
                { href: '/events', label: t('common.events') },
                { href: '/blog', label: t('common.blog') },
                { href: '/contact', label: t('common.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-stone-400">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary-400 w-5" />
                <span>contact@aysafoundation.org</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <FontAwesomeIcon icon={faPhone} className="text-primary-400 w-5" />
                <span>+237 00 00 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <FontAwesomeIcon icon={faLocationDot} className="text-primary-400 w-5" />
                <span>Yaoundé, Cameroon</span>
              </li>
            </ul>
          </div>

          {/* Donate CTA */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6">{t('common.donate')}</h3>
            <p className="text-stone-400 mb-6 leading-relaxed">
              Your contribution helps us empower more young Africans.
            </p>
            <Link 
              href="/donate" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 inline-flex items-center gap-2 w-full justify-center"
            >
              <FontAwesomeIcon icon={faHeart} />
              {t('common.donate')}
            </Link>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-stone-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AYSA Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
