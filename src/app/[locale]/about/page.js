'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullseye, 
  faLightbulb, 
  faHandshake, 
  faHeart 
} from '@fortawesome/free-solid-svg-icons';

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    {
      icon: faHeart,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, setting high standards for our programs and initiatives.',
    },
    {
      icon: faHandshake,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and community collaboration to create lasting impact.',
    },
    {
      icon: faLightbulb,
      title: 'Innovation',
      description: 'We embrace innovative approaches to address the challenges facing African youth.',
    },
    {
      icon: faBullseye,
      title: 'Impact',
      description: 'We are committed to measurable, sustainable impact in the communities we serve.',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-heading font-bold mb-8">{t('about.title')}</h1>
          
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">{t('about.story')}</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Founded in 2020, the AYSA Foundation emerged from a vision to create meaningful opportunities 
              for African youth. We recognized that while the continent is rich in potential, many young people 
              lack access to the resources and mentorship needed to succeed.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Since our inception, we have grown into a vibrant community of changemakers, educators, 
              and leaders dedicated to empowering the next generation of African innovators and leaders.
            </p>
          </div>

          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">{t('about.values')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={value.icon} className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-1">{value.title}</h3>
                    <p className="text-stone-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}