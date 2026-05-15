'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faArrowLeft, 
  faArrowRight,
  faQuoteLeft,
  faGraduationCap,
  faGlobeAfrica,
  faUsers,
  faHeart,
  faLightbulb,
  faBullseye,
  faHandshake,
  faPhone,
  faWhatsapp,
  faCalendarAlt,
  faMapMarkerAlt,
  faStar,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Link from 'next/link';

export default function TeamMemberDetail() {
  const { id, locale } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedMembers, setRelatedMembers] = useState([]);

  useEffect(() => { 
    fetchMember(); 
  }, [id]);

  const fetchMember = async () => {
    try {
      const { data } = await axios.get('/api/team');
      const found = data.find(m => m._id === id);
      setMember(found || null);
      
      // Get 3 other team members for "Related Team" section
      const others = data.filter(m => m._id !== id).slice(0, 3);
      setRelatedMembers(others);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Fallback data for design preview
  const fallbackMember = {
    _id: '1',
    name: 'Mr. Ibrahim Garba',
    role: 'President & Founder',
    image: '/ceoaysa.jpg',
    email: 'ibrahim@aysaafrica.org',
    linkedin: 'https://linkedin.com',
    whatsapp: '653772125',
    description: { 
      fr: 'Visionary leader with 15+ years in youth development and community organizing across West Africa.\n\nMr. Ibrahim Garba founded AYSA Foundation in 2020 with a clear mission: to bridge the gap between African youth potential and the resources they need to succeed. Under his leadership, AYSA has grown from a small local initiative to a pan-African organization operating across 12 countries.\n\nHis expertise spans education policy, community mobilization, and sustainable development. He holds a Master\'s degree in Development Studies and has worked with organizations such as UNICEF, UNESCO, and various African Union initiatives focused on youth empowerment.\n\nIbrahim believes that "every young African has the capacity to change their community — they just need the right support and opportunities."' 
    },
    joinDate: '2020',
    location: 'Yaoundé, Cameroon',
    expertise: ['Youth Development', 'Strategic Planning', 'Community Organizing', 'Education Policy'],
    achievements: [
      'Founded AYSA Foundation in 2020',
      'Expanded operations to 12 African countries',
      'Secured partnerships with 50+ organizations',
      'Awarded Pan-African Youth Champion 2023'
    ]
  };

  const displayMember = member || fallbackMember;

  const values = [
    {
      icon: faHeart,
      title: 'Passion',
      description: 'Deep commitment to African youth empowerment'
    },
    {
      icon: faLightbulb,
      title: 'Vision',
      description: 'Forward-thinking approach to development challenges'
    },
    {
      icon: faHandshake,
      title: 'Integrity',
      description: 'Transparent and accountable leadership'
    }
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-stone-500 font-medium">Loading profile...</p>
      </div>
    </div>
  );

  if (!member && !fallbackMember) return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-stone-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <FontAwesomeIcon icon={faUsers} className="text-3xl text-stone-400" />
        </div>
        <p className="text-stone-500 text-lg mb-2">Membre non trouvé</p>
        <Link href={`/${locale}/team`} className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center gap-2">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'équipe
        </Link>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden bg-stone-50">
      {/* ==================== HERO PROFILE ==================== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-400 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href={`/${locale}/team`} 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'équipe
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl relative z-10">
                  {displayMember.image ? (
                    <img 
                      src={displayMember.image} 
                      alt={displayMember.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-50">
                      <span className="text-5xl font-bold text-primary-400">{displayMember.name?.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 w-40 h-40 md:w-52 md:h-52 rounded-full bg-accent-500/30 blur-xl -z-0 scale-110"></div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center md:text-left"
              >
                <span className="inline-block px-4 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm font-semibold mb-3 border border-accent-500/30">
                  {displayMember.role}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                  {displayMember.name}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-primary-100 text-sm">
                  {displayMember.location && (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-accent-400" />
                      {displayMember.location}
                    </span>
                  )}
                  {displayMember.joinDate && (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-accent-400" />
                      Since {displayMember.joinDate}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUICK CONTACT BAR (NOUVELLE SECTION) ==================== */}
      <section className="py-6 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center md:justify-start gap-3">
            {displayMember.whatsapp && (
              <a 
                href={`https://wa.me/${displayMember.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faWhatsappBrand} />
                WhatsApp
              </a>
            )}
            {displayMember.email && (
              <a 
                href={`mailto:${displayMember.email}`}
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-primary-50 text-stone-700 hover:text-primary-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border border-stone-200 hover:border-primary-300"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                {displayMember.email}
              </a>
            )}
            {displayMember.linkedin && (
              <a 
                href={displayMember.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border border-blue-200 hover:border-blue-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT & EXPERTISE (REDESIGN COMPLET) ==================== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <motion.div 
                className="md:col-span-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                  Biography
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-800 mb-6">
                  About {displayMember.name?.split(' ')[0]}
                </h2>
                
                {displayMember.description && (displayMember.description.fr || displayMember.description.en) ? (
                  <div className="prose prose-stone max-w-none">
                    <p className="text-stone-600 leading-relaxed text-lg whitespace-pre-line">
                      {displayMember.description.fr || displayMember.description.en}
                    </p>
                  </div>
                ) : (
                  <p className="text-stone-400 italic">Aucune description disponible</p>
                )}

                {/* Quote Block */}
                <div className="mt-8 bg-stone-50 rounded-2xl p-6 border-l-4 border-accent-500">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-2xl text-accent-400 mb-3" />
                  <p className="text-stone-700 italic text-lg leading-relaxed">
                    "Every young African has the capacity to change their community — they just need the right support and opportunities."
                  </p>
                  <p className="text-stone-500 text-sm mt-3 font-semibold">— {displayMember.name}</p>
                </div>
              </motion.div>

              {/* Sidebar Info */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Expertise */}
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                  <h3 className="font-heading font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faStar} className="text-primary-500" />
                    Areas of Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {displayMember.expertise?.map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 bg-white text-stone-700 rounded-lg text-sm font-medium border border-stone-200 hover:border-primary-300 hover:text-primary-700 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    )) || (
                      <>
                        <span className="px-3 py-1.5 bg-white text-stone-700 rounded-lg text-sm font-medium border border-stone-200">Youth Development</span>
                        <span className="px-3 py-1.5 bg-white text-stone-700 rounded-lg text-sm font-medium border border-stone-200">Strategic Planning</span>
                        <span className="px-3 py-1.5 bg-white text-stone-700 rounded-lg text-sm font-medium border border-stone-200">Community Organizing</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Key Stats */}
                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
                  <h3 className="font-heading font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTrophy} className="text-primary-500" />
                    Impact at AYSA
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600 text-sm">Countries Reached</span>
                      <span className="font-bold text-primary-700">12</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600 text-sm">Projects Led</span>
                      <span className="font-bold text-primary-700">150+</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600 text-sm">Youth Impacted</span>
                      <span className="font-bold text-primary-700">10,000+</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ACHIEVEMENTS TIMELINE (NOUVELLE SECTION) ==================== */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Track Record
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Key Achievements
              </h2>
              <p className="text-stone-600">
                Milestones that mark {displayMember.name?.split(' ')[0]}'s journey with AYSA Foundation.
              </p>
            </div>

            <div className="space-y-4">
              {(displayMember.achievements || [
                'Founded AYSA Foundation in 2020',
                'Expanded operations to 12 African countries',
                'Secured partnerships with 50+ organizations',
                'Awarded Pan-African Youth Champion 2023'
              ]).map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 border border-stone-200 hover:border-primary-300 hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faTrophy} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="text-stone-800 font-semibold">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LEADERSHIP VALUES (NOUVELLE SECTION) ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Leadership Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                What Drives {displayMember.name?.split(' ')[0]}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-stone-50 rounded-2xl p-8 text-center border border-stone-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={value.icon} className="text-2xl text-primary-600" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RELATED TEAM (NOUVELLE SECTION) ==================== */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider mb-2 block">
                The Team
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Other Leaders at AYSA
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Meet the other passionate individuals driving AYSA Foundation's mission forward.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedMembers.length > 0 ? relatedMembers.map((related, index) => (
                <motion.div
                  key={related._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={`/${locale}/team/${related._id}`}
                    className="group block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-700 border-2 border-white/20 group-hover:border-accent-400 transition-colors">
                        {related.image ? (
                          <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-xl font-bold text-stone-400">{related.name?.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-white group-hover:text-accent-300 transition-colors">{related.name}</h3>
                        <p className="text-accent-400 text-sm">{related.role}</p>
                      </div>
                    </div>
                    {related.description?.fr && (
                      <p className="text-stone-400 text-sm line-clamp-2 mb-4">{related.description.fr}</p>
                    )}
                    <span className="text-accent-400 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                      View Profile <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                </motion.div>
              )) : (
                // Fallback related members
                [
                  { _id: '2', name: 'Marie Ashu', role: 'Programs Director', image: '/aysaceo.jpg', description: { fr: 'Education specialist passionate about equitable access to learning.' } },
                  { _id: '3', name: 'Simplice Talla', role: 'Community Lead', image: '/impact1.jpg', description: { fr: 'Grassroots mobilizer connecting communities with AYSA resources.' } }
                ].map((related, index) => (
                  <motion.div
                    key={related._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={`/${locale}/team/${related._id}`}
                      className="group block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-500/50 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-700 border-2 border-white/20 group-hover:border-accent-400 transition-colors">
                          <img src={related.image} alt={related.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-white group-hover:text-accent-300 transition-colors">{related.name}</h3>
                          <p className="text-accent-400 text-sm">{related.role}</p>
                        </div>
                      </div>
                      <p className="text-stone-400 text-sm line-clamp-2 mb-4">{related.description.fr}</p>
                      <span className="text-accent-400 text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Profile <FontAwesomeIcon icon={faArrowRight} />
                      </span>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            <div className="text-center mt-12">
              <Link 
                href={`/${locale}/team`}
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faUsers} />
                View Full Team
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-16 bg-white border-t border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-800 mb-4">
                Want to Connect?
              </h2>
              <p className="text-stone-600 mb-8">
                Reach out directly to {displayMember.name?.split(' ')[0]} or explore collaboration opportunities with AYSA Foundation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {displayMember.whatsapp && (
                  <a 
                    href={`https://wa.me/${displayMember.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <FontAwesomeIcon icon={faWhatsappBrand} />
                    WhatsApp
                  </a>
                )}
                <a 
                  href="https://wa.me/653772125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={faPhone} />
                  AYSA General Line
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}