
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faClock, faThumbtack, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AnnouncementsPage() {
  const { locale } = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAnnouncements(); }, []);

  const fetchAnnouncements = async () => {
    try { const { data } = await axios.get('/api/announcements'); setAnnouncements(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Annonces Officielles</h1>
          <p className="text-stone-500">Communiqués et annonces de la direction</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="card animate-pulse"><div className="h-6 bg-stone-200 rounded mb-2"></div><div className="h-4 bg-stone-200 rounded w-3/4"></div></div>)}
          </div>
        ) : announcements.length === 0 ? (
          <div className="card text-center py-16">
            <FontAwesomeIcon icon={faBullhorn} className="text-6xl text-stone-300 mb-4" />
            <p className="text-stone-500 text-lg">Aucune annonce pour le moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map(a => (
              <Link key={a._id} href={`/${locale}/announcements/${a._id}`}>
                <motion.div className="card group cursor-pointer hover:shadow-lg transition-shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      a.type === 'urgent' ? 'bg-red-100' : a.type === 'official' ? 'bg-blue-100' : 'bg-primary-100'
                    }`}>
                      <FontAwesomeIcon icon={a.isPinned ? faThumbtack : faBullhorn} className={a.type === 'urgent' ? 'text-red-500' : a.type === 'official' ? 'text-blue-500' : 'text-primary-500'} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {a.isPinned && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Épinglé</span>}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          a.type === 'urgent' ? 'bg-red-100 text-red-700' : a.type === 'official' ? 'bg-blue-100 text-blue-700' : a.type === 'press' ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-600'
                        }`}>{a.type?.toUpperCase()}</span>
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">{a.title?.fr || a.title?.en}</h3>
                      <div className="text-stone-600 text-sm line-clamp-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: a.content?.fr?.substring(0, 200) || '' }} />
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-sm text-stone-400"><FontAwesomeIcon icon={faClock} className="mr-1" />{new Date(a.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <span className="text-primary-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Lire plus <FontAwesomeIcon icon={faArrowRight} className="text-xs" /></span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
