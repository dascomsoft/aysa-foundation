'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faPaperPlane,
  faClock,
  faWhatsapp,
  faCheckCircle,
  faArrowRight,
  faQuestionCircle,
  faHeadset,
  faMap,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp as faWhatsappBrand } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import toast from 'react-hot-toast';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast.success(t('contact.success') || 'Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: faEnvelope,
      title: 'Email Us',
      value: 'Aysaafrica@gmail.com',
      href: 'mailto:Aysaafrica@gmail.com',
      description: 'For general inquiries and partnerships',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'hover:border-blue-300'
    },
    {
      icon: faWhatsappBrand,
      title: 'WhatsApp Primary',
      value: '+237 6 53 77 21 25',
      href: 'https://wa.me/653772125',
      description: 'Fastest response — Available 24/7',
      color: 'bg-emerald-50 text-emerald-600',
      hoverColor: 'hover:border-emerald-300',
      isExternal: true
    },
    {
      icon: faWhatsappBrand,
      title: 'WhatsApp Secondary',
      value: '+237 6 86 09 08 63',
      href: 'https://wa.me/686090863',
      description: 'Alternative contact number',
      color: 'bg-emerald-50 text-emerald-600',
      hoverColor: 'hover:border-emerald-300',
      isExternal: true
    }
  ];

  const officeInfo = [
    {
      icon: faLocationDot,
      label: 'Headquarters',
      value: 'Yaoundé, Cameroon'
    },
    {
      icon: faClock,
      label: 'Office Hours',
      value: 'Mon — Fri, 8:00 AM — 6:00 PM (WAT)'
    },
    {
      icon: faHeadset,
      label: 'Response Time',
      value: 'Within 24 hours'
    }
  ];

  const faqs = [
    {
      question: 'How can I apply for a scholarship?',
      answer: 'You can apply for our scholarship programs by visiting the Programs page and filling out the online application form. Our team reviews all applications monthly.'
    },
    {
      question: 'Can I volunteer with AYSA Foundation?',
      answer: 'Absolutely! We welcome volunteers from all backgrounds. Visit our "Get Involved" section or contact us directly via WhatsApp to learn about current opportunities.'
    },
    {
      question: 'How do I make a donation?',
      answer: 'You can make a secure donation through our Donate page. We accept bank transfers, mobile money, and international card payments. Every contribution is tax-deductible where applicable.'
    },
    {
      question: 'In which countries do you operate?',
      answer: 'AYSA Foundation currently operates across 12 African countries, with our headquarters in Yaoundé, Cameroon. Contact us to learn about programs in your specific region.'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO CONTACT ==================== */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 border border-white/20">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {t('contact.title') || 'Contact Us'}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed max-w-2xl mx-auto">
              Have a question, idea, or want to partner with us? We'd love to hear from you. Reach out through any channel below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== CONTACT METHODS (REDESIGN COMPLET) ==================== */}
      <section className="py-20 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.isExternal ? '_blank' : undefined}
                rel={method.isExternal ? 'noopener noreferrer' : undefined}
                className={`group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100 ${method.hoverColor} flex flex-col items-center text-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <FontAwesomeIcon icon={method.icon} className="text-2xl" />
                </div>
                <h3 className="text-xl font-heading font-bold text-stone-800 mb-2">{method.title}</h3>
                <p className="text-lg font-semibold text-stone-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {method.value}
                </p>
                <p className="text-stone-500 text-sm">{method.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FontAwesomeIcon icon={faArrowRight} className="text-primary-500" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OFFICE INFO & FORM (REDESIGN COMPLET) ==================== */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left Column — Info & Details */}
              <motion.div 
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                    Our Office
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                    Visit or Write to Us
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-8">
                    Our team is based in Yaoundé and ready to assist you. Whether you prefer digital communication or a face-to-face meeting, we're here to help.
                  </p>
                </div>

                <div className="space-y-4">
                  {officeInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-200 hover:border-primary-300 transition-colors">
                      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon icon={info.icon} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-stone-500 font-medium">{info.label}</p>
                        <p className="text-stone-800 font-semibold">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick WhatsApp CTA */}
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <FontAwesomeIcon icon={faWhatsappBrand} className="text-2xl" />
                    <h3 className="font-bold text-lg">Prefer WhatsApp?</h3>
                  </div>
                  <p className="text-emerald-100 text-sm mb-4">
                    Get instant responses on WhatsApp. Click below to start a chat.
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="https://wa.me/653772125"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/30 transition-colors"
                    >
                      <span className="font-semibold">+237 6 53 77 21 25</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                    <a 
                      href="https://wa.me/686090863"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 hover:bg-white/30 transition-colors"
                    >
                      <span className="font-semibold">+237 6 86 09 08 63</span>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Right Column — Form */}
              <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-stone-100">
                  <div className="mb-8">
                    <h3 className="text-2xl font-heading font-bold text-stone-800 mb-2">Send a Message</h3>
                    <p className="text-stone-500">Fill out the form below and we'll respond within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                          {t('contact.name') || 'Full Name'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all duration-200"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                          {t('contact.email') || 'Email Address'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all duration-200"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">
                        {t('contact.subject') || 'Subject'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all duration-200"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-stone-700 mb-2">
                        {t('contact.message') || 'Message'} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all duration-200 resize-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-stone-300 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} />
                          {t('contact.send') || 'Send Message'}
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-stone-400 flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500" />
                      Your information is secure and never shared with third parties.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION (NOUVELLE) ==================== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider mb-2 block">
                Common Questions
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-600">
                Can't find what you're looking for? Reach out to us directly on WhatsApp.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border border-stone-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-semibold text-stone-800 pr-4">{faq.question}</span>
                    <FontAwesomeIcon 
                      icon={openFaq === index ? faChevronUp : faChevronDown} 
                      className={`text-stone-400 flex-shrink-0 transition-transform ${openFaq === index ? 'text-primary-500' : ''}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-stone-600 leading-relaxed border-t border-stone-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-stone-500 mb-4">Still have questions?</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a 
                  href="https://wa.me/653772125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FontAwesomeIcon icon={faWhatsappBrand} />
                  Chat on WhatsApp
                </a>
                <Link 
                  href="/programs"
                  className="inline-flex items-center gap-2 border-2 border-stone-200 hover:border-primary-500 text-stone-700 hover:text-primary-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  Explore Programs
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MAP / VISUAL SECTION (NOUVELLE) ==================== */}
      <section className="py-20 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FontAwesomeIcon icon={faMap} className="text-3xl text-accent-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Serving Communities Across Africa
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                From our headquarters in Yaoundé, we coordinate programs and partnerships across 12 African countries.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
                {['Cameroon', 'Nigeria', 'Ghana', 'Kenya', 'Uganda', 'Rwanda', 'Senegal', 'Ivory Coast'].map((country, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 text-white/80 font-medium border border-white/10">
                    {country}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://wa.me/653772125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <FontAwesomeIcon icon={faWhatsappBrand} />
                  +237 6 53 77 21 25
                </a>
                <a 
                  href="https://wa.me/686090863"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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