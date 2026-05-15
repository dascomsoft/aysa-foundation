'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, 
  faBriefcase, 
  faStar, 
  faUsers, 
  faLeaf, 
  faLaptopCode, 
  faHeartPulse, 
  faHandHoldingHeart,
  faArrowRight,
  faArrowDown,
  faGraduationCap,
  faGlobeAfrica,
  faChartLine,
  faLightbulb,
  faHandshake,
  faHeart,
  faBullseye,
  faRocket,
  faCheckCircle,
  faEnvelope,
  faCalendarAlt,
  faMapMarkerAlt,
  faPhone  // ← REMPLACÉ faWhatsapp par faPhone
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default function ProgramsPage() {
  const [activeProgram, setActiveProgram] = useState(null);
  const [hoveredProgram, setHoveredProgram] = useState(null);

  const programs = [
    {
      id: 'aysa-talk',
      title: 'AYSA Talk',
      icon: faMicrophone,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      accentColor: 'bg-blue-500',
      images: ['/community-survey.jpg', '/community-survey1.jpg'],
      description: 'AYSA TALK is a national youth public speaking training and competition platform by AYSA AFRICA, designed to equip young people with the skills, confidence, and voice to lead and influence change. Through structured training, mentorship, and competitive speaking opportunities, the program empowers youth to communicate ideas effectively, engage in meaningful dialogue, and emerge as impactful leaders in their communities.',
      objective: 'Develop confident, articulate young leaders capable of driving social change through powerful communication and public engagement.',
      results: 'Hundreds of youth trained in public speaking, with winners gaining national recognition and opportunities for international representation.',
      stats: { participants: '2,500+', countries: '8', satisfaction: '96%' }
    },
    {
      id: 'youth-economic-empowerment',
      title: 'Youth Economic Empowerment',
      icon: faBriefcase,
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      accentColor: 'bg-green-500',
      images: ['/impact.jpg', '/impact1.jpg'],
      description: 'The Youth Economic Empowerment Program is designed to equip Youth with practical skills, entrepreneurial knowledge, and access to income-generating opportunities. The program combines skills training, mentorship, and hands-on experience to help participants launch micro-projects or start small businesses.',
      objective: 'Reduce youth unemployment and underemployment by providing relevant skills, business knowledge, and practical experience. Empower youth to become financially independent, develop entrepreneurial thinking, and create income opportunities.',
      results: 'Participants gain practical vocational, digital, or business skills. They implement small projects, start micro-enterprises, or secure internships. Outcomes include sustainable income, stronger industry connections, and a growing network of young entrepreneurs.',
      stats: { participants: '3,200+', businesses: '450+', jobs: '1,200+' }
    },
    {
      id: 'aysa-leadership-fellowship',
      title: 'AYSA Leadership Fellowship',
      icon: faStar,
      color: 'from-yellow-500 to-yellow-700',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      accentColor: 'bg-yellow-500',
      images: ['/hilton-conference.jpg', '/hilton-conference1.jpg'],
      description: 'The AYSA Leadership Fellowship is a dedicated program designed to identify, train, and empower Youth with the skills and knowledge to lead positive change in their communities. Fellows engage in structured learning combining leadership training, project management, and hands-on community initiatives.',
      objective: 'Cultivate a new generation of proactive, solution-driven youth leaders who can influence decision-making, initiate impactful community projects, and inspire others.',
      results: 'Fellows design and implement tangible community projects addressing issues from youth empowerment and climate action to education and entrepreneurship. The program produces a network of active, confident leaders capable of mobilizing peers and engaging policymakers.',
      stats: { fellows: '500+', projects: '120+', communities: '45+' }
    },
    {
      id: 'aysa-conferences-forums',
      title: 'AYSA Conferences & Forums',
      icon: faUsers,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      accentColor: 'bg-purple-500',
      images: ['/goethe-institut-forum.jpg', '/geothe-institut-forum1.jpg'],
      description: 'The AYSA Conferences and Forums program is a platform for youth leaders, innovators, and stakeholders to share ideas, learn, and collaborate on solutions for pressing social, economic, and environmental challenges.',
      objective: 'Connect youth with peers, experts, and decision-makers to build leadership capacity, foster partnerships, and inspire action. Position AYSA Africa as a leading youth empowerment platform.',
      results: 'Expanded professional networks, shared innovative ideas, youth-led proposals, follow-up projects, partnerships with local authorities, and increased youth representation in policy and decision-making platforms.',
      stats: { events: '35+', attendees: '8,000+', partnerships: '60+' }
    },
    {
      id: 'aysa-green-action',
      title: 'AYSA Green Action Program',
      icon: faLeaf,
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
      accentColor: 'bg-emerald-500',
      images: ['/community-survey2.jpg', '/impact2.jpg'],
      description: 'The Green Action Program is a youth-led initiative that empowers Youth to take practical action on local environmental challenges through hands-on activities, awareness campaigns, and sustainable small-scale projects.',
      objective: 'Engage youth in climate action while creating positive local impact. Equip young people to design and implement environmentally sustainable projects that benefit their communities.',
      results: 'Tangible environmental projects such as community clean-ups, recycling initiatives, tree planting campaigns, and sustainable waste-to-income activities. Cleaner communities and increased youth engagement in climate action.',
      stats: { trees: '50,000+', cleanups: '200+', youth: '1,800+' }
    },
    {
      id: 'sheleads-tech',
      title: 'SheLeads Tech',
      icon: faLaptopCode,
      color: 'from-pink-500 to-pink-700',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      accentColor: 'bg-pink-500',
      images: ['/mindset.jpg', '/description.jpg'],
      description: 'SheLeads Tech is a program designed to equip young African women with digital skills and open pathways to professional and entrepreneurial opportunities in technology.',
      objective: 'Close the gender gap in tech by empowering women with high-demand digital skills, boosting confidence, and connecting them to career and entrepreneurial opportunities.',
      results: 'Practical digital skills such as basic coding, data analysis, digital marketing, or online freelancing. Increased number of female-led digital projects and a network of tech-savvy women leaders.',
      stats: { women: '1,500+', skills: '12', employment: '65%' }
    },
    {
      id: 'community-health-initiative',
      title: 'AYSA Community Health Initiative',
      icon: faHeartPulse,
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      accentColor: 'bg-red-500',
      images: ['/community-survey.jpg', '/impact.jpg'],
      description: 'The AYSA Community Health Initiative is a youth-driven program aimed at improving health outcomes at the community level by addressing preventable diseases, sanitation, and climate-related health risks.',
      objective: 'Reduce community vulnerability to preventable and climate-sensitive diseases by equipping youth with knowledge, skills, and tools for health advocacy and local interventions.',
      results: 'Improved sanitation and hygiene practices, increased awareness of preventable health risks, active youth-led health interventions, reduced incidence of common diseases, and a network of trained youth Health Ambassadors.',
      stats: { ambassadors: '800+', communities: '60+', reach: '25,000+' }
    },
    {
      id: 'aysa-humanitarian',
      title: 'AYSA Humanitarian Program',
      icon: faHandHoldingHeart,
      color: 'from-orange-500 to-orange-700',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
      accentColor: 'bg-orange-500',
      images: ['/aysaceo.jpg', '/ceoaysa.jpg'],
      description: 'The AYSA Humanitarian Program is a youth-led initiative aimed at supporting refugees and orphans by providing practical training and resources to improve their living conditions.',
      objective: 'Equip refugees with skills and knowledge that enhance safety, employability, and self-reliance through first aid training, digital skills, and livelihood initiatives.',
      results: 'Ability to handle minor medical emergencies, use digital tools effectively, implement small initiatives enhancing quality of life, and a supportive network of trained youth capable of mentoring others.',
      stats: { refugees: '1,200+', orphans: '600+', training: '45+' }
    },
  ];

  const impactStats = [
    { icon: faUsers, value: '10,000+', label: 'Youth Reached', color: 'bg-blue-500' },
    { icon: faGlobeAfrica, value: '12', label: 'Countries', color: 'bg-green-500' },
    { icon: faRocket, value: '8', label: 'Active Programs', color: 'bg-yellow-500' },
    { icon: faHandshake, value: '150+', label: 'Partnerships', color: 'bg-purple-500' }
  ];

  const pillars = [
    {
      icon: faGraduationCap,
      title: 'Education & Skills',
      description: 'Building knowledge and practical capabilities for the modern world',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: faLightbulb,
      title: 'Leadership & Innovation',
      description: 'Cultivating visionary thinkers and community catalysts',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: faHeart,
      title: 'Health & Wellbeing',
      description: 'Promoting sustainable community health and environmental action',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: faBullseye,
      title: 'Economic Empowerment',
      description: 'Creating pathways to financial independence and entrepreneurship',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  const howToJoin = [
    {
      step: '01',
      icon: faPhone,  // ← REMPLACÉ faWhatsapp par faPhone
      title: 'Contact Us',
      description: 'Reach out via WhatsApp or email to express your interest in any program.',
      action: 'Chat Now',
      href: 'https://wa.me/653772125',
      color: 'bg-emerald-500'
    },
    {
      step: '02',
      icon: faCheckCircle,
      title: 'Apply Online',
      description: 'Fill out a simple application form with your details and program preference.',
      action: 'Apply',
      href: '#programs-list',
      color: 'bg-primary-500'
    },
    {
      step: '03',
      icon: faRocket,
      title: 'Get Started',
      description: 'Join orientation, meet your mentors, and begin your transformation journey.',
      action: 'Learn More',
      href: '/about',
      color: 'bg-accent-500'
    }
  ];

  return (
    <div className="overflow-hidden bg-white">
      {/* ==================== HERO PROGRAMS ==================== */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-400 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 border border-white/20">
              What We Do
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Our <span className="text-accent-300">Programs</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed max-w-3xl mx-auto mb-10">
              Eight transformative initiatives designed to empower African youth through education, leadership, technology, health, and sustainable development.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#programs-list"
                className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Explore Programs
                <FontAwesomeIcon icon={faArrowDown} />
              </a>
              <a 
                href="https://wa.me/653772125"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faWhatsappBrand} />
                Enquire via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== IMPACT STATS (NOUVELLE SECTION) ==================== */}
      <section className="py-16 bg-white -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-stone-50 rounded-2xl p-6 text-center border border-stone-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md`}>
                  <FontAwesomeIcon icon={stat.icon} className="text-white text-xl" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-stone-800 mb-1">{stat.value}</div>
                <div className="text-stone-500 font-medium text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROGRAM PILLARS (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Four Pillars of Impact
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Every AYSA program is built on one of these foundational pillars, ensuring comprehensive youth development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-stone-200 hover:border-transparent transition-all duration-300 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={pillar.icon} className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-stone-800 mb-3">{pillar.title}</h3>
                  <p className="text-stone-600 leading-relaxed text-sm">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PROGRAMS LIST (REDESIGN COMPLET) ==================== */}
      <section id="programs-list" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
              All Initiatives
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
              Explore Our Programs
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Click on any program to learn more about its objectives, expected results, and how to get involved.
            </p>
          </div>

          <div className="space-y-12">
            {programs.map((program, index) => (
              <motion.article
                key={program.id}
                id={program.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className={`bg-white rounded-3xl overflow-hidden border-2 ${program.borderColor} hover:shadow-2xl transition-all duration-500 ${activeProgram === program.id ? 'ring-2 ring-offset-2 ' + program.textColor.replace('text-', 'ring-') : ''}`}
                  onMouseEnter={() => setHoveredProgram(program.id)}
                  onMouseLeave={() => setHoveredProgram(null)}
                >
                  {/* Program Header */}
                  <div className={`bg-gradient-to-r ${program.color} p-6 md:p-8 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={program.icon} className="text-3xl text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-1">{program.title}</h2>
                        <p className="text-white/80 text-sm md:text-base">Program #{String(index + 1).padStart(2, '0')}</p>
                      </div>
                      <button
                        onClick={() => setActiveProgram(activeProgram === program.id ? null : program.id)}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 self-start md:self-auto"
                      >
                        {activeProgram === program.id ? 'Show Less' : 'Learn More'}
                        <FontAwesomeIcon icon={activeProgram === program.id ? faArrowDown : faArrowRight} className={`transition-transform ${activeProgram === program.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Program Content */}
                  <div className="p-6 md:p-8">
                    {/* Images Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {program.images.map((img, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-md h-48 md:h-64 group/img">
                          <img 
                            src={img} 
                            alt={`${program.title} - Image ${i + 1}`} 
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" 
                          />
                        </div>
                      ))}
                    </div>

                    {/* Description */}
                    <div className={`${program.bgColor} rounded-2xl p-6 md:p-8 mb-6 border ${program.borderColor}`}>
                      <h3 className={`font-heading font-bold text-lg mb-3 flex items-center gap-2 ${program.textColor}`}>
                        <div className={`w-2 h-2 rounded-full ${program.accentColor}`}></div>
                        About This Program
                      </h3>
                      <p className="text-stone-700 leading-relaxed">{program.description}</p>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{ height: activeProgram === program.id ? 'auto' : 0, opacity: activeProgram === program.id ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 pb-6">
                        {/* Objective */}
                        {program.objective && (
                          <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200">
                            <h3 className="font-heading font-bold text-lg mb-3 text-stone-800 flex items-center gap-2">
                              <FontAwesomeIcon icon={faBullseye} className={program.textColor} />
                              Objective
                            </h3>
                            <p className="text-stone-600 leading-relaxed">{program.objective}</p>
                          </div>
                        )}

                        {/* Results */}
                        {program.results && (
                          <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200">
                            <h3 className="font-heading font-bold text-lg mb-3 text-stone-800 flex items-center gap-2">
                              <FontAwesomeIcon icon={faChartLine} className={program.textColor} />
                              Expected Results
                            </h3>
                            <p className="text-stone-600 leading-relaxed">{program.results}</p>
                          </div>
                        )}

                        {/* Stats Grid */}
                        {program.stats && (
                          <div className="grid grid-cols-3 gap-4">
                            {Object.entries(program.stats).map(([key, value], i) => (
                              <div key={i} className={`${program.bgColor} rounded-xl p-4 text-center border ${program.borderColor}`}>
                                <div className={`text-2xl font-bold ${program.textColor} mb-1`}>{value}</div>
                                <div className="text-stone-500 text-xs font-medium uppercase tracking-wider">{key}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          <a 
                            href="https://wa.me/653772125"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 bg-gradient-to-r ${program.color} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5`}
                          >
                            <FontAwesomeIcon icon={faWhatsappBrand} />
                            Apply via WhatsApp
                          </a>
                          <a 
                            href="mailto:Aysaafrica@gmail.com"
                            className="inline-flex items-center gap-2 border-2 border-stone-200 hover:border-stone-400 text-stone-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                          >
                            <FontAwesomeIcon icon={faEnvelope} />
                            Email Inquiry
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW TO JOIN (NOUVELLE SECTION) ==================== */}
      <section className="py-24 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                How to Join Any Program
              </h2>
              <p className="text-stone-400 max-w-2xl mx-auto">
                Getting involved with AYSA is simple. Follow these three steps to start your journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {howToJoin.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  {/* Connector line */}
                  {index < howToJoin.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
                  )}
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-accent-500/50 transition-all duration-300 text-center relative z-10 group">
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={step.icon} className="text-white text-2xl" />
                    </div>
                    <div className="text-5xl font-bold text-white/10 absolute top-4 right-4 font-heading">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-stone-400 leading-relaxed mb-6 text-sm">{step.description}</p>
                    <a 
                      href={step.href}
                      target={step.href.startsWith('http') ? '_blank' : undefined}
                      rel={step.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`inline-flex items-center gap-2 ${step.color} hover:opacity-90 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md`}
                    >
                      {step.action}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12 border border-primary-200 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FontAwesomeIcon icon={faHeart} className="text-3xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                  Ready to Transform Your Future?
                </h2>
                <p className="text-stone-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                  Join thousands of young Africans who have already taken the first step toward empowerment. 
                  Our team is standing by to help you find the right program.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://wa.me/653772125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-3"
                  >
                    <FontAwesomeIcon icon={faWhatsappBrand} />
                    +237 6 53 77 21 25
                  </a>
                  <a 
                    href="https://wa.me/686090863"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center gap-3"
                  >
                    <FontAwesomeIcon icon={faWhatsappBrand} />
                    +237 6 86 09 08 63
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-6 text-stone-500 text-sm">
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
                    Aysaafrica@gmail.com
                  </span>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-500" />
                    Yaoundé, Cameroon
                  </span>
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500" />
                    Mon — Fri, 8AM — 6PM
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}