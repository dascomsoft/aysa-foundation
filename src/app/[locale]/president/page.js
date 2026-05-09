

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faQuoteLeft, 
  faGlobeAfrica, 
  faUsers, 
  faGraduationCap,
  faHandshake,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, 
  faTwitter, 
  faFacebook,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function PresidentPage() {
  const t = useTranslations();

  const achievements = [
    { 
      icon: faGlobeAfrica, 
      number: '10,000+', 
      label: 'Youth Reached',
      frLabel: 'Jeunes Touchés'
    },
    { 
      icon: faUsers, 
      number: '50+', 
      label: 'Communities',
      frLabel: 'Communautés'
    },
    { 
      icon: faGraduationCap, 
      number: '150+', 
      label: 'Programs',
      frLabel: 'Programmes'
    },
    { 
      icon: faHandshake, 
      number: '25+', 
      label: 'Partners',
      frLabel: 'Partenaires'
    },
  ];

  const quotes = [
    {
      en: "The future of Africa lies in the hands of its youth. Our mission is to equip them with the tools, knowledge, and confidence to build that future.",
      fr: "L'avenir de l'Afrique repose entre les mains de sa jeunesse. Notre mission est de leur donner les outils, les connaissances et la confiance nécessaires pour construire cet avenir."
    },
    {
      en: "Every young person has unlimited potential. At AYSA Foundation, we create the environment for that potential to flourish.",
      fr: "Chaque jeune a un potentiel illimité. À la Fondation AYSA, nous créons l'environnement pour que ce potentiel s'épanouisse."
    },
    {
      en: "Leadership is not about titles, it's about impact. Our youth are learning to lead by serving their communities.",
      fr: "Le leadership n'est pas une question de titres, mais d'impact. Nos jeunes apprennent à diriger en servant leurs communautés."
    }
  ];

  const gallery = [
    '/coomunity-survey2.jpg',
    '/community-survey.jpg',
    '/community-survey1.jpg',
    '/hilton-conference.jpg',
    '/hilton-conference1.jpg',
    '/impact.jpg',
    '/impact1.jpg',
    '/impact2.jpg',
    '/mindset.jpg',
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
                Meet Our<br />
                <span className="text-accent-400">President</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-heading mb-4 text-stone-200">
                Mr. Ibrahim Garba
              </h2>
              <p className="text-xl text-stone-300 mb-4">
                Founder & President, AYSA Foundation
              </p>
              <div className="w-24 h-1 bg-accent-400 mb-6"></div>
              <p className="text-lg text-stone-200 leading-relaxed mb-8 max-w-xl">
                Visionary leader, educator, and advocate for African youth empowerment. 
                With over 5 years of experience in community development and youth mentorship, 
                Mr. Ibrahim has dedicated his life to unlocking the potential of Africa's next generation.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img 
                    src="/ceoaysa.jpg" 
                    alt="Mr. Ibrahim Garba - President AYSA Foundation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-accent-500 text-white px-6 py-3 rounded-xl shadow-lg">
                  <p className="text-sm font-medium">5+ Years</p>
                  <p className="text-xs opacity-80">of Leadership</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Biography</h2>
              <div className="card p-8 space-y-4">
                <p className="text-stone-600 leading-relaxed">
                  Mr. Ibrahim Garba is a distinguished leader in African youth development, 
                  with a career spanning over 5 years in education, community organizing, and 
                  international development. His journey began in the classrooms of Abidjan, 
                  where he witnessed firsthand the transformative power of education.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  After completing his studies in Educational Leadership , Mr. Ibrahim worked with several international organizations across 
                  Cameroon and abroad, developing youth empowerment programs that have impacted thousands 
                  of young lives.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  In 2020, he founded the AYSA Foundation with a clear mission: to create 
                  sustainable pathways for African youth to access quality education, leadership 
                  training, and economic opportunities. Under his leadership, the foundation has 
                  grown from a small community initiative to a pan-African movement.
                </p>
                <div className="bg-stone-50 rounded-xl p-6 mt-6">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-primary-400 mb-3" />
                  <p className="text-lg text-stone-700 italic">
                    {quotes[0].en}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-heading font-bold mb-6">Quick Info</h2>
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Location</p>
                    <p className="font-medium">Cameroon, Yaounde</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Email</p>
                    <p className="font-medium text-sm">president@aysafoundation.org</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Education</p>
                    <p className="font-medium text-sm">Educational Leadership</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faGlobeAfrica} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Languages</p>
                    <p className="font-medium text-sm">French, English, Foufouldé</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Impact Under His Leadership</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FontAwesomeIcon icon={achievement.icon} className="text-4xl mb-4" />
                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-white/80">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Leadership Philosophy</h2>
          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                className="card p-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-primary-300 mb-3" />
                <p className="text-lg text-stone-700 italic">{quote.en}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <img 
                  src={image} 
                  alt={`AYSA Foundation Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-800 text-white mb-0">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">Join Our Mission</h2>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto">
              Be part of a movement that is transforming African youth development.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/donate" className="btn-primary">
                Support Our Work
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
              <Link href="/contact" className="px-6 py-3 rounded-xl border-2 border-white text-white font-medium hover:bg-white hover:text-stone-900 transition-all">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
