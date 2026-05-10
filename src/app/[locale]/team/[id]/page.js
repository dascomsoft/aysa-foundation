
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Link from 'next/link';

export default function TeamMemberDetail() {
  const { id, locale } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    fetchMember(); 
  }, [id]);

  const fetchMember = async () => {
    try {
      const { data } = await axios.get('/api/team');
      const found = data.find(m => m._id === id);
      console.log('Membre trouvé:', found); // DEBUG
      setMember(found || null);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return (
    <div className="py-32 text-center">
      <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
    </div>
  );

  if (!member) return (
    <div className="py-32 text-center">
      <p className="text-stone-500">Membre non trouvé</p>
      <Link href={`/${locale}/team`} className="text-primary-500 mt-2 inline-block">Retour à l'équipe</Link>
    </div>
  );

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href={`/${locale}/team`} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 mb-8">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour à l'équipe
        </Link>

        <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          {/* Photo */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-stone-200 border-4 border-primary-100">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-50">
                  <span className="text-3xl font-bold text-primary-400">{member.name?.charAt(0)}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-heading font-bold mb-2">{member.name}</h1>
            <p className="text-primary-500 font-semibold text-lg">{member.role}</p>
          </div>

          {/* Description - AFFICHAGE CORRIGÉ */}
          {member.description && (member.description.fr || member.description.en) ? (
            <div className="prose prose-stone max-w-none mb-8">
              <h3 className="font-heading font-bold text-lg mb-3">À propos</h3>
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                {member.description.fr || member.description.en}
              </p>
            </div>
          ) : (
            <p className="text-center text-stone-400 mb-8">Aucune description disponible</p>
          )}

          {/* Contact */}
          <div className="flex justify-center gap-4 border-t border-stone-200 pt-6">
            {member.email && (
              <a href={`mailto:${member.email}`} className="flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-xl hover:bg-primary-50 transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
                <span className="text-sm">{member.email}</span>
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <FontAwesomeIcon icon={faLinkedin} className="text-blue-600" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
