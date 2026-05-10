
'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faBriefcase, faStar, faUsers, faLeaf, faLaptopCode, faHeartPulse, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

export default function ProgramsPage() {
  const programs = [
    {
      id: 'aysa-talk',
      title: 'AYSA Talk',
      icon: faMicrophone,
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      images: ['/community-survey.jpg', '/community-survey1.jpg'],
      description: 'AYSA TALK is a national youth public speaking training and competition platform by AYSA AFRICA, designed to equip young people with the skills, confidence, and voice to lead and influence change. Through structured training, mentorship, and competitive speaking opportunities, the program empowers youth to communicate ideas effectively, engage in meaningful dialogue, and emerge as impactful leaders in their communities.',
    },
    {
      id: 'youth-economic-empowerment',
      title: 'Youth Economic Empowerment Program',
      icon: faBriefcase,
      color: 'from-green-500 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      images: ['/impact.jpg', '/impact1.jpg'],
      description: 'The Youth Economic Empowerment Program is designed to equip Youth with practical skills, entrepreneurial knowledge, and access to income-generating opportunities. The program combines skills training, mentorship, and hands-on experience to help participants launch micro-projects or start small businesses.',
      objective: 'Reduce youth unemployment and underemployment by providing relevant skills, business knowledge, and practical experience. Empower youth to become financially independent, develop entrepreneurial thinking, and create income opportunities.',
      results: 'Participants gain practical vocational, digital, or business skills. They implement small projects, start micro-enterprises, or secure internships. Outcomes include sustainable income, stronger industry connections, and a growing network of young entrepreneurs.',
    },
    {
      id: 'aysa-leadership-fellowship',
      title: 'AYSA Leadership Fellowship',
      icon: faStar,
      color: 'from-yellow-500 to-yellow-700',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      images: ['/hilton-conference.jpg', '/hilton-conference1.jpg'],
      description: 'The AYSA Leadership Fellowship is a dedicated program designed to identify, train, and empower Youth with the skills and knowledge to lead positive change in their communities. Fellows engage in structured learning combining leadership training, project management, and hands-on community initiatives.',
      objective: 'Cultivate a new generation of proactive, solution-driven youth leaders who can influence decision-making, initiate impactful community projects, and inspire others.',
      results: 'Fellows design and implement tangible community projects addressing issues from youth empowerment and climate action to education and entrepreneurship. The program produces a network of active, confident leaders capable of mobilizing peers and engaging policymakers.',
    },
    {
      id: 'aysa-conferences-forums',
      title: 'AYSA Conferences and Forums',
      icon: faUsers,
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      images: ['/goethe-institut-forum.jpg', '/geothe-institut-forum1.jpg'],
      description: 'The AYSA Conferences and Forums program is a platform for youth leaders, innovators, and stakeholders to share ideas, learn, and collaborate on solutions for pressing social, economic, and environmental challenges.',
      objective: 'Connect youth with peers, experts, and decision-makers to build leadership capacity, foster partnerships, and inspire action. Position AYSA Africa as a leading youth empowerment platform.',
      results: 'Expanded professional networks, shared innovative ideas, youth-led proposals, follow-up projects, partnerships with local authorities, and increased youth representation in policy and decision-making platforms.',
    },
    {
      id: 'aysa-green-action',
      title: 'AYSA Green Action Program',
      icon: faLeaf,
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      images: ['/community-survey2.jpg', '/impact2.jpg'],
      description: 'The Green Action Program is a youth-led initiative that empowers Youth to take practical action on local environmental challenges through hands-on activities, awareness campaigns, and sustainable small-scale projects.',
      objective: 'Engage youth in climate action while creating positive local impact. Equip young people to design and implement environmentally sustainable projects that benefit their communities.',
      results: 'Tangible environmental projects such as community clean-ups, recycling initiatives, tree planting campaigns, and sustainable waste-to-income activities. Cleaner communities and increased youth engagement in climate action.',
    },
    {
      id: 'sheleads-tech',
      title: 'SheLeads Tech – Women in Tech',
      icon: faLaptopCode,
      color: 'from-pink-500 to-pink-700',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      images: ['/mindset.jpg', '/description.jpg'],
      description: 'SheLeads Tech is a program designed to equip young African women with digital skills and open pathways to professional and entrepreneurial opportunities in technology.',
      objective: 'Close the gender gap in tech by empowering women with high-demand digital skills, boosting confidence, and connecting them to career and entrepreneurial opportunities.',
      results: 'Practical digital skills such as basic coding, data analysis, digital marketing, or online freelancing. Increased number of female-led digital projects and a network of tech-savvy women leaders.',
    },
    {
      id: 'community-health-initiative',
      title: 'AYSA Community Health Initiative',
      icon: faHeartPulse,
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      images: ['/community-survey.jpg', '/impact.jpg'],
      description: 'The AYSA Community Health Initiative is a youth-driven program aimed at improving health outcomes at the community level by addressing preventable diseases, sanitation, and climate-related health risks.',
      objective: 'Reduce community vulnerability to preventable and climate-sensitive diseases by equipping youth with knowledge, skills, and tools for health advocacy and local interventions.',
      results: 'Improved sanitation and hygiene practices, increased awareness of preventable health risks, active youth-led health interventions, reduced incidence of common diseases, and a network of trained youth Health Ambassadors.',
    },
    {
      id: 'aysa-humanitarian',
      title: 'AYSA Humanitarian Program',
      icon: faHandHoldingHeart,
      color: 'from-orange-500 to-orange-700',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      images: ['/aysaceo.jpg', '/ceoaysa.jpg'],
      description: 'The AYSA Humanitarian Program is a youth-led initiative aimed at supporting refugees and orphans by providing practical training and resources to improve their living conditions.',
      objective: 'Equip refugees with skills and knowledge that enhance safety, employability, and self-reliance through first aid training, digital skills, and livelihood initiatives.',
      results: 'Ability to handle minor medical emergencies, use digital tools effectively, implement small initiatives enhancing quality of life, and a supportive network of trained youth capable of mentoring others.',
    },
  ];

  return (
    <div className="py-16 bg-stone-200">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Programs</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Discover our comprehensive programs designed to empower African youth through education, 
            leadership, technology, health, and community development.
          </p>
        </div>

        {/* Programs List */}
        <div className="space-y-16">
          {programs.map((program, index) => (
            <motion.section
              key={program.id}
              id={program.id}
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              {/* Program Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <FontAwesomeIcon icon={program.icon} className="text-white text-xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold">{program.title}</h2>
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {program.images.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shadow-md h-56 md:h-72">
                    <img src={img} alt={`${program.title} - Image ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Description */}
                <div className={`${program.bgColor} rounded-2xl p-6 md:p-8`}>
                  <h3 className={`font-heading font-bold text-lg mb-3 ${program.textColor}`}>Description</h3>
                  <p className="text-stone-700 leading-relaxed">{program.description}</p>
                </div>

                {/* Objective */}
                {program.objective && (
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
                    <h3 className="font-heading font-bold text-lg mb-3 text-primary-600">🎯 Objective</h3>
                    <p className="text-stone-700 leading-relaxed">{program.objective}</p>
                  </div>
                )}

                {/* Expected Results */}
                {program.results && (
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
                    <h3 className="font-heading font-bold text-lg mb-3 text-accent-500">📊 Expected Results</h3>
                    <p className="text-stone-700 leading-relaxed">{program.results}</p>
                  </div>
                )}
              </div>

              {/* Separator */}
              {index < programs.length - 1 && (
                <div className="mt-16 border-t border-stone-300"></div>
              )}
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
