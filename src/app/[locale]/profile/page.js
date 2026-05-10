


'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faCalendar,
  faComments,
  faHeart,
  faEdit,
  faCamera,
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
  const t = useTranslations();
  const [editMode, setEditMode] = useState(false);

  const userInfo = {
    name: 'Jean Kouassi',
    email: 'jean@example.com',
    role: 'MEMBER',
    joinDate: 'Janvier 2024',
    location: 'Abidjan, Côte d\'Ivoire',
    bio: 'Passionné par le développement communautaire et l\'éducation des jeunes.',
    activities: 8,
    comments: 23,
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <motion.div 
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-4xl text-primary-500" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faCamera} className="text-xs" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-between mb-2">
                <h1 className="text-3xl font-heading font-bold">{userInfo.name}</h1>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Modifier le profil
                </button>
              </div>
              <p className="text-stone-500 flex items-center justify-center md:justify-start gap-2 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {userInfo.location}
              </p>
              <p className="text-stone-600">{userInfo.bio}</p>
              
              <div className="flex gap-6 mt-4 justify-center md:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-500">{userInfo.activities}</p>
                  <p className="text-sm text-stone-500">Activités</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-500">{userInfo.comments}</p>
                  <p className="text-sm text-stone-500">Commentaires</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        {editMode && (
          <motion.div 
            className="card p-8 mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <h2 className="text-xl font-heading font-bold mb-6">Modifier le Profil</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom complet</label>
                  <input type="text" defaultValue={userInfo.name} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" defaultValue={userInfo.email} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea defaultValue={userInfo.bio} className="input-field h-24"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Localisation</label>
                <input type="text" defaultValue={userInfo.location} className="input-field" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setEditMode(false)} className="px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-50">
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Recent Activity */}
        <div className="card p-8">
          <h2 className="text-xl font-heading font-bold mb-6">Activité Récente</h2>
          <div className="space-y-4">
            {[
              { action: 'A commenté un article', target: 'Programme Éducation 2026', time: 'Il y a 2h' },
              { action: 'A participé à l\'événement', target: 'Atelier de Formation', time: 'Hier' },
              { action: 'A rejoint le projet', target: 'Campagne de Sensibilisation', time: 'Il y a 3 jours' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-0">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faComments} className="text-stone-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-stone-500">{activity.target}</p>
                </div>
                <span className="text-sm text-stone-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
