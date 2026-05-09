'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success(t('contact.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-heading font-bold mb-8">{t('contact.title')}</h1>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card text-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-primary-500 mb-3" />
              <h3 className="font-heading font-bold mb-1">Email</h3>
              <p className="text-stone-600">contact@aysafoundation.org</p>
            </div>
            <div className="card text-center">
              <FontAwesomeIcon icon={faPhone} className="text-3xl text-primary-500 mb-3" />
              <h3 className="font-heading font-bold mb-1">Phone</h3>
              <p className="text-stone-600">+225 00 00 00 00</p>
            </div>
            <div className="card text-center">
              <FontAwesomeIcon icon={faLocationDot} className="text-3xl text-primary-500 mb-3" />
              <h3 className="font-heading font-bold mb-1">Address</h3>
              <p className="text-stone-600">Abidjan, Côte d'Ivoire</p>
            </div>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.subject')}</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                <textarea
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                {loading ? 'Sending...' : t('contact.send')}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}