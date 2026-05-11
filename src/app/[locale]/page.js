

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faUsers, 
  faGlobeAfrica, 
  faHandshake,
  faArrowRight,
  faEnvelope,
  faHeart,
  faStar,
  faLightbulb,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  const t = useTranslations();
  
  const stats = [
    { icon: faUsers, value: '10,000+', label: t('home.members') },
    { icon: faGraduationCap, value: '150+', label: t('home.projects') },
    { icon: faGlobeAfrica, value: '50+', label: t('home.communities') },
    { icon: faHandshake, value: '12', label: t('home.countries') },
  ];

  const programs = [
    {
      image: '/community-survey.jpg',
      icon: faGraduationCap,
      title: 'Education & Scholarships',
      description: 'Providing access to quality education and scholarship opportunities for underprivileged youth across Africa.',
    },
    {
      image: '/impact.jpg',
      icon: faLightbulb,
      title: 'Leadership Development',
      description: 'Training the next generation of African leaders through mentorship, workshops, and practical experience.',
    },
    {
      image: '/community-survey1.jpg',
      icon: faHandshake,
      title: 'Community Engagement',
      description: 'Building strong, resilient communities through volunteer programs and local initiatives.',
    },
  ];

  const testimonials = [
    {
      image: '/aysaceo.jpg',
      name: 'Marie Ashu',
      role: 'Program Beneficiary',
      quote: 'AYSA Foundation changed my life. Today, I am studying engineering thanks to their scholarship program.',
    },
    {
      image: '/ceoaysa.jpg',
      name: 'Mr. Ibrahim Garba',
      role: 'President, AYSA Foundation',
      quote: 'Every young person deserves the opportunity to reach their full potential. This is our commitment.',
    },
    {
      image: '/impact1.jpg',
      name: 'Simplice Talla',
      role: 'Community Leader',
      quote: 'The foundation\'s programs have transformed our community. Young people now have hope and direction.',
    },
  ];

  return (
    <div>
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Image de fond bien visible */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/community-survey.jpg')" }}
        ></div>
        
        {/* Overlay sombre pour lisibilité du texte */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Contenu */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-5 py-2 bg-accent-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
                AYSA AFRICA - Since 2020
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('home.hero_title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('home.hero_subtitle')}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link 
                href="/donate" 
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHeart} />
                {t('home.hero_cta')}
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-stone-900 transition-all duration-200 inline-flex items-center gap-2"
              >
                {t('common.learn_more')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATISTIQUES ==================== */}
      <section className="py-16 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FontAwesomeIcon icon={stat.icon} className="text-3xl text-primary-500 mb-3" />
                <div className="text-3xl font-bold text-stone-800 mb-1">{stat.value}</div>
                <div className="text-stone-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROGRAMS ==================== */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-stone-800 mb-4">Our Core Programs</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              We focus on three key areas to create lasting impact in African communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={program.icon} className="text-primary-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">{program.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{program.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-stone-50 rounded-2xl p-10 border border-stone-200"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-primary-500 mb-4" />
              <h2 className="text-2xl font-heading font-bold text-stone-800 mb-4">{t('home.mission_title')}</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{t('home.mission_text')}</p>
            </motion.div>
            
            <motion.div 
              className="bg-primary-50 rounded-2xl p-10 border border-primary-200"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <FontAwesomeIcon icon={faGlobeAfrica} className="text-4xl text-primary-600 mb-4" />
              <h2 className="text-2xl font-heading font-bold text-stone-800 mb-4">{t('home.vision_title')}</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{t('home.vision_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-stone-800">What People Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-primary-200 mb-4" />
                <p className="text-stone-600 mb-6 leading-relaxed italic">{testimonial.quote}</p>
                <div className="flex items-center gap-3 border-t border-stone-200 pt-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-stone-800">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-5xl text-white mb-6" />
            <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('home.newsletter_title')}</h2>
            <p className="text-xl text-primary-100 mb-8">{t('home.newsletter_text')}</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder={t('home.newsletter_placeholder')}
                className="flex-1 px-6 py-4 rounded-xl text-stone-800 outline-none text-lg"
              />
              <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 whitespace-nowrap">
                {t('home.newsletter_button')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-20 bg-stone-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* <FontAwesomeIcon icon={faStar} className="text-5xl text-accent-400 mb-6" /> */}
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('home.cta_title')}</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t('home.cta_text')}</p>
            <Link 
              href="/donate" 
              className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-200 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              <FontAwesomeIcon icon={faHeart} />
              {t('common.get_involved')}
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
