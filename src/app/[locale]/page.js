

// 'use client';

// import { useTranslations } from 'next-intl';
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faGraduationCap, 
//   faUsers, 
//   faGlobeAfrica, 
//   faHandshake,
//   faArrowRight,
//   faEnvelope,
//   faHeart,
//   faStar,
//   faLightbulb,
//   faQuoteLeft
// } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';

// const fadeInUp = {
//   initial: { opacity: 0, y: 60 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6 }
// };

// export default function HomePage() {
//   const t = useTranslations();
  
//   const stats = [
//     { icon: faUsers, value: '10,000+', label: t('home.members') },
//     { icon: faGraduationCap, value: '150+', label: t('home.projects') },
//     { icon: faGlobeAfrica, value: '50+', label: t('home.communities') },
//     { icon: faHandshake, value: '12', label: t('home.countries') },
//   ];

//   const programs = [
//     {
//       image: '/community-survey.jpg',
//       icon: faGraduationCap,
//       title: 'Education & Scholarships',
//       description: 'Providing access to quality education and scholarship opportunities for underprivileged youth across Africa.',
//     },
//     {
//       image: '/impact.jpg',
//       icon: faLightbulb,
//       title: 'Leadership Development',
//       description: 'Training the next generation of African leaders through mentorship, workshops, and practical experience.',
//     },
//     {
//       image: '/community-survey1.jpg',
//       icon: faHandshake,
//       title: 'Community Engagement',
//       description: 'Building strong, resilient communities through volunteer programs and local initiatives.',
//     },
//   ];

//   const testimonials = [
//     {
//       image: '/aysaceo.jpg',
//       name: 'Marie Ashu',
//       role: 'Program Beneficiary',
//       quote: 'AYSA Foundation changed my life. Today, I am studying engineering thanks to their scholarship program.',
//     },
//     {
//       image: '/ceoaysa.jpg',
//       name: 'Mr. Ibrahim Garba',
//       role: 'President, AYSA Foundation',
//       quote: 'Every young person deserves the opportunity to reach their full potential. This is our commitment.',
//     },
//     {
//       image: '/impact1.jpg',
//       name: 'Simplice Talla',
//       role: 'Community Leader',
//       quote: 'The foundation\'s programs have transformed our community. Young people now have hope and direction.',
//     },
//   ];

//   return (
//     <div>
//       {/* ==================== HERO ==================== */}
//       <section className="relative min-h-[90vh] flex items-center overflow-hidden">
//         {/* Image de fond bien visible */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: "url('/community-survey.jpg')" }}
//         ></div>
        
//         {/* Overlay sombre pour lisibilité du texte */}
//         <div className="absolute inset-0 bg-black/60"></div>
        
//         {/* Contenu */}
//         <div className="container mx-auto px-4 relative z-10 py-20">
//           <div className="max-w-4xl">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <span className="inline-block px-5 py-2 bg-accent-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
//                 AYSA AFRICA - Since 2020
//               </span>
//             </motion.div>
            
//             <motion.h1 
//               className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.1 }}
//             >
//               {t('home.hero_title')}
//             </motion.h1>
            
//             <motion.p 
//               className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               {t('home.hero_subtitle')}
//             </motion.p>
            
//             <motion.div 
//               className="flex flex-wrap gap-4"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//             >
//               <Link 
//                 href="/donate" 
//                 className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl inline-flex items-center gap-2"
//               >
//                 <FontAwesomeIcon icon={faHeart} />
//                 {t('home.hero_cta')}
//                 <FontAwesomeIcon icon={faArrowRight} />
//               </Link>
//               <Link 
//                 href="/about" 
//                 className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-stone-900 transition-all duration-200 inline-flex items-center gap-2"
//               >
//                 {t('common.learn_more')}
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ==================== STATISTIQUES ==================== */}
//       <section className="py-16 bg-white border-b border-stone-200">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <motion.div 
//                 key={index}
//                 className="text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <FontAwesomeIcon icon={stat.icon} className="text-3xl text-primary-500 mb-3" />
//                 <div className="text-3xl font-bold text-stone-800 mb-1">{stat.value}</div>
//                 <div className="text-stone-500 font-medium">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ==================== PROGRAMS ==================== */}
//       <section className="py-20 bg-stone-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-heading font-bold text-stone-800 mb-4">Our Core Programs</h2>
//             <p className="text-stone-600 max-w-2xl mx-auto text-lg">
//               We focus on three key areas to create lasting impact in African communities.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {programs.map((program, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.15 }}
//               >
//                 <div className="h-48 overflow-hidden">
//                   <img 
//                     src={program.image} 
//                     alt={program.title}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
//                     <FontAwesomeIcon icon={program.icon} className="text-primary-600 text-xl" />
//                   </div>
//                   <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">{program.title}</h3>
//                   <p className="text-stone-600 leading-relaxed">{program.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ==================== MISSION & VISION ==================== */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 gap-8">
//             <motion.div 
//               className="bg-stone-50 rounded-2xl p-10 border border-stone-200"
//               variants={fadeInUp}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//             >
//               <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-primary-500 mb-4" />
//               <h2 className="text-2xl font-heading font-bold text-stone-800 mb-4">{t('home.mission_title')}</h2>
//               <p className="text-stone-600 leading-relaxed text-lg">{t('home.mission_text')}</p>
//             </motion.div>
            
//             <motion.div 
//               className="bg-primary-50 rounded-2xl p-10 border border-primary-200"
//               variants={fadeInUp}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//             >
//               <FontAwesomeIcon icon={faGlobeAfrica} className="text-4xl text-primary-600 mb-4" />
//               <h2 className="text-2xl font-heading font-bold text-stone-800 mb-4">{t('home.vision_title')}</h2>
//               <p className="text-stone-600 leading-relaxed text-lg">{t('home.vision_text')}</p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ==================== TESTIMONIALS ==================== */}
//       <section className="py-20 bg-stone-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-heading font-bold text-stone-800">What People Say</h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl p-8 shadow-md"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.15 }}
//               >
//                 <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-primary-200 mb-4" />
//                 <p className="text-stone-600 mb-6 leading-relaxed italic">{testimonial.quote}</p>
//                 <div className="flex items-center gap-3 border-t border-stone-200 pt-4">
//                   <img 
//                     src={testimonial.image} 
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-bold text-stone-800">{testimonial.name}</p>
//                     <p className="text-sm text-stone-500">{testimonial.role}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ==================== NEWSLETTER ==================== */}
//       <section className="py-20 bg-primary-600">
//         <div className="container mx-auto px-4">
//           <div className="max-w-2xl mx-auto text-center">
//             <FontAwesomeIcon icon={faEnvelope} className="text-5xl text-white mb-6" />
//             <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('home.newsletter_title')}</h2>
//             <p className="text-xl text-primary-100 mb-8">{t('home.newsletter_text')}</p>
//             <form className="flex flex-col sm:flex-row gap-4">
//               <input 
//                 type="email" 
//                 placeholder={t('home.newsletter_placeholder')}
//                 className="flex-1 px-6 py-4 rounded-xl text-stone-800 outline-none text-lg"
//               />
//               <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 whitespace-nowrap">
//                 {t('home.newsletter_button')}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* ==================== CTA FINAL ==================== */}
//       <section className="py-20 bg-stone-900">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             {/* <FontAwesomeIcon icon={faStar} className="text-5xl text-accent-400 mb-6" /> */}
//             <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t('home.cta_title')}</h2>
//             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t('home.cta_text')}</p>
//             <Link 
//               href="/donate" 
//               className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-200 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
//             >
//               <FontAwesomeIcon icon={faHeart} />
//               {t('common.get_involved')}
//               <FontAwesomeIcon icon={faArrowRight} />
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }

















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
  faQuoteLeft,
  faPhone,
  faWhatsapp,
  faMapMarkerAlt,
  faCalendarAlt,
  faDonate,
  faHandsHelping,
  faBullhorn,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
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
      color: 'bg-blue-50 text-blue-600'
    },
    {
      image: '/impact.jpg',
      icon: faLightbulb,
      title: 'Leadership Development',
      description: 'Training the next generation of African leaders through mentorship, workshops, and practical experience.',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      image: '/community-survey1.jpg',
      icon: faHandshake,
      title: 'Community Engagement',
      description: 'Building strong, resilient communities through volunteer programs and local initiatives.',
      color: 'bg-emerald-50 text-emerald-600'
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

  const getInvolvedWays = [
    {
      icon: faDonate,
      title: 'Make a Donation',
      description: 'Support our programs financially. Every contribution directly impacts a young life in Africa.',
      action: 'Donate Now',
      href: '/donate',
      color: 'from-rose-500 to-pink-600'
    },
    {
      icon: faHandsHelping,
      title: 'Volunteer With Us',
      description: 'Share your skills and time. Join our network of volunteers making real change in communities.',
      action: 'Join as Volunteer',
      href: '/volunteer',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: faBullhorn,
      title: 'Spread the Word',
      description: 'Follow us on social media and share our mission with your network to amplify our impact.',
      action: 'Follow Us',
      href: '/social',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/community-survey.jpg')" }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-5 py-2 bg-accent-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm">
                AYSA AFRICA — Empowering Youth Since 2020
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('home.hero_title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow-lg"
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
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faHeart} />
                {t('home.hero_cta')}
                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white/80 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-stone-900 transition-all duration-300 inline-flex items-center gap-2 backdrop-blur-sm"
              >
                {t('common.learn_more')}
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/80 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* ==================== ABOUT / WHO WE ARE (NOUVELLE SECTION) ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                About AYSA Foundation
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-800 mb-6 leading-tight">
                Building Africa's Future, <span className="text-primary-600">One Youth at a Time</span>
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed mb-6">
                Founded in 2020, AYSA (African Youth for Sustainable Advancement) is a non-profit organization 
                dedicated to empowering young Africans through education, leadership development, and community 
                engagement. We believe that every young person, regardless of their background, deserves the 
                opportunity to thrive and contribute to Africa's sustainable development.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  'Registered non-profit organization operating across 12 African countries',
                  'Over 150 active projects impacting 10,000+ young people annually',
                  'Network of 50+ community partners and local organizations',
                  'Transparent governance with 100% commitment to our mission'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-accent-500 mt-1 flex-shrink-0" />
                    <span className="text-stone-600">{item}</span>
                  </div>
                ))}
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors group"
              >
                Discover Our Story
                <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src="/community-survey.jpg" alt="Community work" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src="/impact.jpg" alt="Impact" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src="/aysaceo.jpg" alt="Team" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src="/impact1.jpg" alt="Community" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-accent-100 rounded-full blur-3xl opacity-60"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== STATISTIQUES ==================== */}
      <section className="py-16 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={stat.icon} className="text-2xl text-primary-600" />
                </div>
                <div className="text-4xl font-bold text-stone-800 mb-1">{stat.value}</div>
                <div className="text-stone-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROGRAMS ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-800 mb-4">Our Core Programs</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              We focus on three key areas to create lasting impact in African communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mb-5`}>
                    <FontAwesomeIcon icon={program.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-stone-800 mb-3">{program.title}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6">{program.description}</p>
                  <Link 
                    href={`/programs/${program.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link"
                  >
                    Learn More
                    <FontAwesomeIcon icon={faArrowRight} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GET INVOLVED (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
              Take Action
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-800 mb-4">Get Involved</h2>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg">
              There are many ways to support our mission. Choose the one that resonates with you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {getInvolvedWays.map((way, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${way.color}`}></div>
                <div className={`w-16 h-16 bg-gradient-to-br ${way.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <FontAwesomeIcon icon={way.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-stone-800 mb-3">{way.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-6">{way.description}</p>
                <Link 
                  href={way.href}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${way.color} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
                >
                  {way.action}
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MISSION & VISION ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-stone-50 rounded-2xl p-10 border border-stone-200 hover:border-primary-300 transition-colors"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faGraduationCap} className="text-3xl text-primary-600" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-stone-800 mb-4">{t('home.mission_title')}</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{t('home.mission_text')}</p>
            </motion.div>
            
            <motion.div 
              className="bg-primary-50 rounded-2xl p-10 border border-primary-200 hover:border-primary-400 transition-colors"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faGlobeAfrica} className="text-3xl text-primary-600" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-stone-800 mb-4">{t('home.vision_title')}</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{t('home.vision_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-800">What People Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-4xl text-primary-200 mb-4" />
                <p className="text-stone-600 mb-6 leading-relaxed italic text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4 border-t border-stone-200 pt-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-stone-100"
                  />
                  <div>
                    <p className="font-bold text-stone-800 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-stone-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{t('home.newsletter_title')}</h2>
            <p className="text-xl text-primary-100 mb-8">{t('home.newsletter_text')}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder={t('home.newsletter_placeholder')}
                className="flex-1 px-6 py-4 rounded-xl text-stone-800 outline-none text-lg shadow-lg focus:ring-4 focus:ring-accent-400/30 transition-all"
              />
              <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                {t('home.newsletter_button')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== JOIN US / CONTACT (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Connect With Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-800 mb-4">Join Us Today</h2>
              <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                Ready to make a difference? Reach out to us directly via WhatsApp or explore other ways to connect with the AYSA community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* WhatsApp Contact Cards */}
              <motion.div
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faWhatsappBrand} className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-stone-800">WhatsApp</h3>
                    <p className="text-stone-500">Direct messaging</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="https://wa.me/653772125" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group border border-stone-100"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <FontAwesomeIcon icon={faPhone} className="text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-stone-800">Primary Contact</p>
                      <p className="text-emerald-600 font-bold text-lg">+237 6 53 77 21 25</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-stone-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </a>

                  <a 
                    href="https://wa.me/686090863" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 group border border-stone-100"
                  >
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <FontAwesomeIcon icon={faPhone} className="text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-stone-800">Secondary Contact</p>
                      <p className="text-emerald-600 font-bold text-lg">+237 6 86 09 08 63</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="text-stone-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                <p className="mt-6 text-sm text-stone-500 text-center">
                  Click any number to open WhatsApp chat instantly
                </p>
              </motion.div>

              {/* Other Contact Methods */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-primary-300 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-stone-800">Email Us</h3>
                      <p className="text-stone-500">For formal inquiries</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:contact@aysaafrica.org" 
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors text-lg"
                  >
                    contact@aysaafrica.org
                  </a>
                </div>

                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-primary-300 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-stone-800">Visit Us</h3>
                      <p className="text-stone-500">Headquarters</p>
                    </div>
                  </div>
                  <p className="text-stone-600">
                    Yaoundé, Cameroon<br />
                    <span className="text-stone-400 text-sm">Operating across 12 African countries</span>
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-primary-300 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-stone-800">Office Hours</h3>
                      <p className="text-stone-500">When to reach us</p>
                    </div>
                  </div>
                  <p className="text-stone-600">
                    Monday — Friday<br />
                    <span className="font-semibold text-stone-800">8:00 AM — 6:00 PM (WAT)</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-accent-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faStar} className="text-5xl text-accent-400" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {t('home.cta_title')}
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('home.cta_text')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/donate" 
                className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faHeart} />
                {t('common.get_involved')}
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link 
                href="https://wa.me/653772125" 
                target="_blank"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <FontAwesomeIcon icon={faWhatsappBrand} />
                Chat on WhatsApp
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}