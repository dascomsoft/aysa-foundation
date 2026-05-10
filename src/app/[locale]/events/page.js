
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EventsPage() {
  const t = useTranslations();
  const { locale } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try { const { data } = await axios.get('/api/events'); setEvents(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const stripHtml = (html, max = 100) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    return text.length > max ? text.substring(0, max) + '...' : text;
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">Événements</h1>
          <p className="text-stone-500">Découvrez nos conférences, forums et ateliers</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="card animate-pulse"><div className="bg-stone-200 h-48 rounded-lg mb-4"></div><div className="h-6 bg-stone-200 rounded mb-2"></div></div>)}
          </div>
        ) : events.length === 0 ? (
          <div className="card text-center py-16">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-6xl text-stone-300 mb-4" />
            <p className="text-stone-500 text-lg">Aucun événement pour le moment</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <Link key={event._id} href={`/${locale}/events/${event._id}`}>
                <motion.div className="card overflow-hidden group cursor-pointer h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {event.images?.[0] ? (
                    <img src={event.images[0]} alt="" className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-48 bg-stone-100 rounded-lg mb-4 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl text-stone-300" />
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary-500 transition-colors">{event.title?.fr || event.title?.en}</h3>
                  <p className="text-stone-600 text-sm mb-3 line-clamp-3">{stripHtml(event.description?.fr || event.description?.en)}</p>
                  <div className="flex items-center gap-4 text-sm text-stone-400">
                    <span><FontAwesomeIcon icon={faCalendarCheck} className="mr-1 text-primary-400" />{new Date(event.date).toLocaleDateString()}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-primary-400" />{event.location}</span>
                  </div>
                  <div className="mt-3 text-primary-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir les détails <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
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
