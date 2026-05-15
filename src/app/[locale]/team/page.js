'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faArrowRight, 
  faQuoteLeft,
  faUsers,
  faGlobeAfrica,
  faGraduationCap,
  faHandshake,
  faHeart,
  faPhone,
  faWhatsapp,
  faStar,
  faLightbulb,
  faBullseye
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Link from 'next/link';

export default function TeamPage() {
  const { locale } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get('/api/team');
      setMembers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  // Fallback data for design preview when API fails
  const fallbackMembers = [
    {
      _id: '1',
      name: 'Mr. Ibrahim Garba',
      role: 'President & Founder',
      image: '/ceoaysa.jpg',
      description: { fr: 'Visionary leader with 15+ years in youth development and community organizing across West Africa.' },
      whatsapp: '653772125',
      email: 'ibrahim@aysaafrica.org'
    },
    {
      _id: '2',
      name: 'Marie Ashu',
      role: 'Programs Director',
      image: '/aysaceo.jpg',
      description: { fr: 'Education specialist passionate about creating equitable access to learning opportunities for all African youth.' },
      whatsapp: '686090863',
      email: 'marie@aysaafrica.org'
    },
    {
      _id: '3',
      name: 'Simplice Talla',
      role: 'Community Lead',
      image: '/impact1.jpg',
      description: { fr: 'Grassroots mobilizer connecting local communities with AYSA resources and fostering sustainable partnerships.' },
      whatsapp: '653772125',
      email: 'simplice@aysaafrica.org'
    }
  ];

  const displayMembers = members.length > 0 ? members : fallbackMembers;

  const teamStats = [
    { icon: faUsers, value: '25+', label: 'Team Members' },
    { icon: faGlobeAfrica, value: '12', label: 'Countries Represented' },
    { icon: faGraduationCap, value: '60%', label: 'Women in Leadership' },
    { icon: faHandshake, value: '8', label: 'Years of Combined Experience' }
  ];

  const departments = [
    {
      icon: faGraduationCap,
      title: 'Education & Scholarships',
      description: 'Designing curricula, managing scholarship programs, and ensuring educational excellence across all initiatives.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: faLightbulb,
      title: 'Leadership Development',
      description: 'Creating mentorship frameworks, organizing workshops, and building the next generation of African leaders.',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: faHandshake,
      title: 'Community Engagement',
      description: 'Building bridges between AYSA and local communities through volunteer programs and grassroots initiatives.',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: faHeart,
      title: 'Partnerships & Funding',
      description: 'Securing resources, managing donor relationships, and ensuring sustainable financial growth for our mission.',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const values = [
    {
      icon: faStar,
      title: 'Integrity',
      description: 'We lead with transparency and accountability in everything we do.'
    },
    {
      icon: faBullseye,
      title: 'Excellence',
      description: 'We set high standards and continuously strive to exceed them.'
    },
    {
      icon: faHeart,
      title: 'Compassion',
      description: 'We genuinely care about the communities and youth we serve.'
    },
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We embrace creative solutions to complex African challenges.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO TEAM ==================== */}
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
              The People Behind AYSA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Notre <span className="text-accent-300">Équipe</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed max-w-3xl mx-auto">
              L'équipe exécutive AYSA Foundation — Passionate leaders, educators, and changemakers dedicated to transforming Africa's future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== TEAM STATS (NOUVELLE SECTION) ==================== */}
      <section className="py-16 bg-white -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FontAwesomeIcon icon={stat.icon} className="text-xl text-primary-600" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-stone-800 mb-1">{stat.value}</div>
                <div className="text-stone-500 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EXECUTIVE TEAM (REDESIGN COMPLET) ==================== */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Executive Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Meet Our Leaders
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                The dedicated individuals steering AYSA Foundation toward its mission of empowering African youth.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse text-center border border-stone-100">
                    <div className="w-28 h-28 bg-stone-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-5 bg-stone-200 rounded mb-2 w-3/4 mx-auto"></div>
                    <div className="h-4 bg-stone-200 rounded mb-3 w-1/2 mx-auto"></div>
                    <div className="h-3 bg-stone-200 rounded w-full mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : members.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-100 shadow-md mb-12">
                <p className="text-stone-500 text-lg">Aucun membre trouvé</p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {displayMembers.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  onMouseEnter={() => setHoveredMember(member._id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-100">
                    {/* Image Section */}
                    <div className="relative h-72 overflow-hidden bg-stone-100">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                          <span className="text-5xl font-bold text-primary-300">{member.name?.charAt(0)}</span>
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Social links on hover */}
                      <div className={`absolute bottom-4 left-0 right-0 flex justify-center gap-3 transition-all duration-300 ${hoveredMember === member._id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {member.whatsapp && (
                          <a
                            href={`https://wa.me/${member.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                          >
                            <FontAwesomeIcon icon={faWhatsappBrand} />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                          </a>
                        )}
                        <a
                          href="#"
                          className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                        >
                          <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <Link href={`/${locale}/team/${member._id}`} className="block group/link">
                        <h3 className="font-heading font-bold text-xl text-stone-800 mb-1 group-hover/link:text-primary-600 transition-colors">
                          {member.name}
                        </h3>
                      </Link>
                      <p className="text-accent-600 font-semibold text-sm mb-3">{member.role}</p>
                      {member.description?.fr && (
                        <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {member.description.fr}
                        </p>
                      )}
                      <Link
                        href={`/${locale}/team/${member._id}`}
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/btn"
                      >
                        Voir le profil complet
                        <FontAwesomeIcon icon={faArrowRight} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DEPARTMENTS (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                How We're Organized
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Our Departments
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                AYSA Foundation operates through specialized teams, each focused on a critical pillar of youth empowerment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-stone-50 rounded-2xl p-8 border border-stone-200 hover:border-transparent transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${dept.color} opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={dept.icon} className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">{dept.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{dept.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEAM VALUES (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Our Culture
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Values That Unite Us
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Every member of the AYSA team embodies these core principles in their work with African youth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-accent-500/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-500/30 transition-colors">
                      <FontAwesomeIcon icon={value.icon} className="text-accent-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white mb-2">{value.title}</h3>
                      <p className="text-stone-400 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== JOIN THE TEAM (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12 border border-primary-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                    Careers
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                    Join Our Team
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-6">
                    Passionate about youth development? We're always looking for talented individuals who share our vision for Africa's future. Explore open positions or reach out to learn more.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://wa.me/653772125"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <FontAwesomeIcon icon={faWhatsappBrand} />
                      Contact via WhatsApp
                    </a>
                    <a 
                      href="mailto:Aysaafrica@gmail.com"
                      className="inline-flex items-center gap-2 border-2 border-primary-300 hover:border-primary-500 text-primary-700 hover:text-primary-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      Send Your CV
                    </a>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-3 mt-6">
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-primary-500 text-xl mb-2" />
                        <p className="text-sm font-semibold text-stone-800">Remote Friendly</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                        <FontAwesomeIcon icon={faGlobeAfrica} className="text-primary-500 text-xl mb-2" />
                        <p className="text-sm font-semibold text-stone-800">Pan-African Impact</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                        <FontAwesomeIcon icon={faHeart} className="text-primary-500 text-xl mb-2" />
                        <p className="text-sm font-semibold text-stone-800">Meaningful Work</p>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm">
                        <FontAwesomeIcon icon={faUsers} className="text-primary-500 text-xl mb-2" />
                        <p className="text-sm font-semibold text-stone-800">Diverse Team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Connect With Our Team
              </h2>
              <p className="text-lg text-stone-400 mb-8">
                Have questions or want to collaborate? Reach out directly to our leadership.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://wa.me/653772125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={faWhatsappBrand} />
                  +237 6 53 77 21 25
                </a>
                <a 
                  href="https://wa.me/686090863"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={faWhatsappBrand} />
                  +237 6 86 09 08 63
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}