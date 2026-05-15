'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullseye, 
  faLightbulb, 
  faHandshake, 
  faHeart,
  faUsers,
  faGlobeAfrica,
  faGraduationCap,
  faArrowRight,
  faQuoteLeft,
  faCalendarAlt,
  faTrophy,
  faChartLine,
  faStar,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faWhatsapp
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  const t = useTranslations();
  const [activeTimeline, setActiveTimeline] = useState(0);

  const values = [
    {
      icon: faHeart,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, setting high standards for our programs and initiatives to ensure the best outcomes for African youth.',
      color: 'bg-rose-50 text-rose-600'
    },
    {
      icon: faHandshake,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and community collaboration to create lasting impact across diverse African communities.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We embrace innovative approaches and technology to address the evolving challenges facing African youth in the modern world.',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      icon: faBullseye,
      title: 'Impact',
      description: 'We are committed to measurable, sustainable impact in every community we serve, tracking progress and celebrating successes.',
      color: 'bg-emerald-50 text-emerald-600'
    },
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Foundation Established',
      description: 'AYSA Foundation was founded in Yaoundé, Cameroon, with a vision to empower African youth through education and leadership.',
      icon: faStar
    },
    {
      year: '2021',
      title: 'First Scholarship Program',
      description: 'Launched our inaugural scholarship program, supporting 50 students across Cameroon and Nigeria with full educational funding.',
      icon: faGraduationCap
    },
    {
      year: '2022',
      title: 'Regional Expansion',
      description: 'Expanded operations to 5 additional countries: Ghana, Kenya, Uganda, Rwanda, and Senegal, reaching 2,000+ youth.',
      icon: faGlobeAfrica
    },
    {
      year: '2023',
      title: 'Leadership Academy',
      description: 'Opened the AYSA Leadership Academy, training 500+ young leaders in governance, entrepreneurship, and community development.',
      icon: faUsers
    },
    {
      year: '2024',
      title: '12 Countries Strong',
      description: 'Now operating across 12 African countries with 150+ active projects, 10,000+ members, and 50+ community partnerships.',
      icon: faTrophy
    }
  ];

  const team = [
    {
      image: '/ceoaysa.jpg',
      name: 'Mr. Ibrahim Garba',
      role: 'President & Founder',
      bio: 'Visionary leader with 15+ years in youth development and community organizing across West Africa.',
      social: 'https://wa.me/653772125'
    },
    {
      image: '/aysaceo.jpg',
      name: 'Marie Ashu',
      role: 'Programs Director',
      bio: 'Education specialist passionate about creating equitable access to learning opportunities for all African youth.',
      social: 'https://wa.me/686090863'
    },
    {
      image: '/impact1.jpg',
      name: 'Simplice Talla',
      role: 'Community Lead',
      bio: 'Grassroots mobilizer connecting local communities with AYSA resources and fostering sustainable partnerships.',
      social: 'https://wa.me/653772125'
    }
  ];

  const achievements = [
    { number: '12', label: 'African Countries', icon: faGlobeAfrica },
    { number: '150+', label: 'Active Projects', icon: faChartLine },
    { number: '10,000+', label: 'Youth Empowered', icon: faUsers },
    { number: '50+', label: 'Community Partners', icon: faHandshake },
    { number: '500+', label: 'Scholarships Awarded', icon: faGraduationCap },
    { number: '98%', label: 'Program Success Rate', icon: faTrophy }
  ];

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO ABOUT ==================== */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-400 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 border border-white/20">
              About AYSA Foundation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Empowering African Youth<br />
              <span className="text-accent-300">Since 2020</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
              We are a community-driven organization dedicated to unlocking the potential of young Africans through education, leadership, and sustainable development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== OUR STORY (REDESIGN) ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-6 leading-tight">
                  From a Vision to a <span className="text-primary-600">Movement</span>
                </h2>
                <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
                  <p>
                    Founded in 2020 in Yaoundé, Cameroon, the AYSA Foundation emerged from a powerful vision: 
                    to create meaningful, lasting opportunities for African youth who possess incredible potential 
                    but often lack access to essential resources and mentorship.
                  </p>
                  <p>
                    We recognized that Africa's greatest asset is its young people. While the continent is rich 
                    in talent and ambition, systemic barriers prevent many from reaching their full potential. 
                    AYSA was created to bridge that gap.
                  </p>
                  <p>
                    Since our inception, we have grown from a small local initiative into a vibrant pan-African 
                    community of changemakers, educators, and leaders. Today, we operate across 12 countries, 
                    touching the lives of over 10,000 young people annually.
                  </p>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link 
                    href="/programs" 
                    className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Explore Our Programs
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                  <a 
                    href="https://wa.me/653772125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-stone-200 hover:border-emerald-500 text-stone-700 hover:text-emerald-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faWhatsappBrand} />
                    Chat With Us
                  </a>
                </div>
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
                      <img src="/community-survey.jpg" alt="Community work" className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500" />
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
                      <img src="/impact1.jpg" alt="Community" className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 bg-accent-100 rounded-full blur-3xl opacity-60"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACHIEVEMENTS COUNTER (NOUVELLE SECTION) ==================== */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider mb-2 block">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Numbers That Speak
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-accent-500/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-accent-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/30 transition-colors">
                  <FontAwesomeIcon icon={item.icon} className="text-2xl text-accent-400" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{item.number}</div>
                <div className="text-stone-400 text-sm font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE / JOURNEY (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Milestones That Define Us
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                From a single idea in Yaoundé to a pan-African movement, trace the key moments that shaped AYSA Foundation.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 md:-translate-x-1/2"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-start gap-6 mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Content */}
                  <div className={`flex-1 md:text-${index % 2 === 0 ? 'right' : 'left'} ml-12 md:ml-0`}>
                    <div 
                      className={`bg-stone-50 rounded-2xl p-6 border border-stone-200 hover:border-primary-300 transition-all duration-300 cursor-pointer ${activeTimeline === index ? 'ring-2 ring-primary-500 shadow-lg' : ''}`}
                      onClick={() => setActiveTimeline(activeTimeline === index ? null : index)}
                    >
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-bold mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-heading font-bold text-stone-800 mb-2">{item.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center md:-translate-x-1/2 z-10 shadow-md">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CORE VALUES (REDESIGN COMPLET) ==================== */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Our Core Values
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg">
                These principles guide every decision we make and every program we deliver across Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 ${value.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <FontAwesomeIcon icon={value.icon} className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-stone-800 mb-2">{value.title}</h3>
                      <p className="text-stone-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
// Remplacez la section "TEAM SECTION" dans AboutPage par ceci :

{/* ==================== TEAM SECTION (REDESIGN — aligné avec TeamPage) ==================== */}
<section className="py-24 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
          The People Behind AYSA
        </span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
          Meet Our Leadership
        </h2>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Passionate individuals dedicated to transforming the lives of African youth across the continent.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            image: '/ceoaysa.jpg',
            name: 'Mr. Ibrahim Garba',
            role: 'President & Founder',
            bio: 'Visionary leader with 15+ years in youth development and community organizing across West Africa.',
            whatsapp: '653772125',
            email: 'ibrahim@aysaafrica.org'
          },
          {
            image: '/aysaceo.jpg',
            name: 'Marie Ashu',
            role: 'Programs Director',
            bio: 'Education specialist passionate about creating equitable access to learning opportunities for all African youth.',
            whatsapp: '686090863',
            email: 'marie@aysaafrica.org'
          },
          {
            image: '/impact1.jpg',
            name: 'Simplice Talla',
            role: 'Community Lead',
            bio: 'Grassroots mobilizer connecting local communities with AYSA resources and fostering sustainable partnerships.',
            whatsapp: '653772125',
            email: 'simplice@aysaafrica.org'
          }
        ].map((member, index) => (
          <motion.div
            key={index}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            {/* Image Section */}
            <div className="relative h-72 overflow-hidden bg-stone-100">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Social links on hover */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <a
                  href={`https://wa.me/${member.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faWhatsappBrand} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl text-stone-800 mb-1 group-hover:text-primary-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-accent-600 font-semibold text-sm mb-3">{member.role}</p>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                {member.bio}
              </p>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/btn"
              >
                Voir le profil complet
                <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <FontAwesomeIcon icon={faUsers} />
          Meet the Full Team
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* ==================== JOIN US / CTA FINAL (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faHeart} className="text-4xl text-accent-300" />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Be Part of the AYSA Story
              </h2>
              <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether you want to volunteer, donate, partner, or simply learn more, we'd love to connect with you. Reach out today and help us shape Africa's future.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link 
                  href="/donate" 
                  className="bg-accent-500 hover:bg-accent-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={faHeart} />
                  Support Our Mission
                </Link>
                <a 
                  href="https://wa.me/653772125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={faWhatsappBrand} />
                  WhatsApp Us
                </a>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <FontAwesomeIcon icon={faPhone} className="text-accent-300 mb-2" />
                  <p className="text-white font-semibold">+237 6 53 77 21 25</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <FontAwesomeIcon icon={faPhone} className="text-accent-300 mb-2" />
                  <p className="text-white font-semibold">+237 6 86 09 08 63</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <FontAwesomeIcon icon={faEnvelope} className="text-accent-300 mb-2" />
                  <p className="text-white font-semibold text-sm">Aysaafrica@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}