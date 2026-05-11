
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faCalendar, faCamera,
  faMapMarkerAlt, faSave, faSpinner, faUpload
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', bio: '', location: '' });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) { router.push('/auth'); return; }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    setForm({
      name: parsed.name || '',
      email: parsed.email || '',
      bio: parsed.bio || '',
      location: parsed.location || '',
    });
    setAvatarPreview(parsed.avatar || '');
  }, []);

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const { data } = await axios.post('/api/upload', fd);
    return data.url;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let avatarUrl = avatarPreview;
      if (avatarFile) {
        setUploading(true);
        avatarUrl = await uploadToCloudinary(avatarFile);
        setUploading(false);
      }

      // Mettre à jour localStorage
      const updatedUser = {
        ...user,
        name: form.name,
        email: form.email,
        bio: form.bio,
        location: form.location,
        avatar: avatarUrl,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setAvatarPreview(avatarUrl);

      toast.success('Profil mis à jour !');
      setEditMode(false);
    } catch (err) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="py-32 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} className="w-full h-full object-cover" alt="" />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="text-4xl text-primary-500" />
                )}
              </div>
              {editMode && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600"
                >
                  <FontAwesomeIcon icon={faUpload} className="text-xs" />
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarSelect} className="hidden" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-between mb-2">
                <h1 className="text-3xl font-heading font-bold">{user.name}</h1>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="md:flex items-center gap-2 px-4 py-2 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors hidden"
                >
                  <FontAwesomeIcon icon={editMode ? faSave : faCamera} />
                  {editMode ? 'Annuler' : 'Modifier le profil'}
                </button>
              </div>
              <p className="text-stone-500 flex items-center justify-center md:justify-start gap-2 mb-1">
                <FontAwesomeIcon icon={faEnvelope} />
                {user.email}
              </p>
              {user.location && (
                <p className="text-stone-500 flex items-center justify-center md:justify-start gap-2 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  {user.location}
                </p>
              )}
              {user.bio && <p className="text-stone-600">{user.bio}</p>}

              {/* Badge rôle */}
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                  {user.role}
                </span>
                <span className="text-sm text-stone-400 flex items-center gap-1">
                  <FontAwesomeIcon icon={faCalendar} />
                  Membre depuis {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Edit Form */}
        {editMode && (
          <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-heading font-bold mb-6">Modifier le Profil</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                  className="input-field h-24"
                  placeholder="Parlez de vous..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Localisation</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="input-field"
                  placeholder="Ville, Pays"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setEditMode(false)} className="px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-50 font-medium">
                  Annuler
                </button>
                <button type="submit" disabled={loading || uploading} className="btn-primary min-w-[150px]">
                  {(loading || uploading) ? (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      {uploading ? 'Upload...' : 'Enregistrement...'}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faSave} />
                      Enregistrer
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Stats */}
        <div className="card p-8">
          <h2 className="text-xl font-heading font-bold mb-6">Mon Activité</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-500">0</p>
              <p className="text-sm text-stone-500">Commentaires</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-primary-500">0</p>
              <p className="text-sm text-stone-500">Événements participés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}