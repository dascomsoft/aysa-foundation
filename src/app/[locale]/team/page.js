
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Link from 'next/link';

export default function TeamPage() {
  const { locale } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get('/api/team');
      setMembers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Notre Équipe</h1>
          <p className="text-stone-500 text-lg">L'équipe exécutive AYSA Foundation</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <div key={i} className="card animate-pulse text-center"><div className="w-24 h-24 bg-stone-200 rounded-full mx-auto mb-4"></div><div className="h-5 bg-stone-200 rounded mb-2 w-3/4 mx-auto"></div></div>)}
          </div>
        ) : members.length === 0 ? (
          <div className="card text-center py-16"><p className="text-stone-500 text-lg">Aucun membre</p></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <motion.div key={member._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link href={`/${locale}/team/${member._id}`} className="card text-center p-6 hover:shadow-lg transition-shadow block group">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-stone-200 border-4 border-primary-100 group-hover:border-primary-300 transition-colors">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-50">
                        <span className="text-2xl font-bold text-primary-400">{member.name?.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-1 group-hover:text-primary-500 transition-colors">{member.name}</h3>
                  <p className="text-primary-500 font-semibold text-sm mb-3">{member.role}</p>
                  {member.description?.fr && (
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">{member.description.fr}</p>
                  )}
                  <span className="text-primary-500 text-sm font-medium flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir le profil <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
