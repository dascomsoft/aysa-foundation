'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSpinner, faSave, faUser } from '@fortawesome/free-solid-svg-icons';

export default function MemberForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    role: initialData?.role || 'MEMBER',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(initialData?.avatar || '');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    await onSubmit({ ...form, avatar: avatar, avatarPreview });
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-stone-200 flex items-center justify-center cursor-pointer" onClick={() => fileRef.current?.click()}>
            {avatarPreview ? (
              <img src={avatarPreview} className="w-full h-full object-cover" alt="Avatar" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="text-3xl text-stone-400" />
            )}
          </div>
          <button type="button" onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs">
            <FontAwesomeIcon icon={faUpload} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarSelect} className="hidden" />
        </div>
      </div>

      {!initialData && (
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-2">Nom complet*</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" required /></div>
          <div><label className="block text-sm font-medium mb-2">Email*</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" required /></div>
        </div>
      )}

      {!initialData && (
        <div><label className="block text-sm font-medium mb-2">Mot de passe* (min 6 caractères)</label><input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="input-field" required minLength={6} /></div>
      )}

      {initialData && (
        <div><label className="block text-sm font-medium mb-2">Rôle</label><select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field"><option value="SUPER_ADMIN">SUPER_ADMIN</option><option value="PRESIDENT">PRESIDENT</option><option value="ADMIN">ADMIN</option><option value="MEMBER">MEMBER</option></select></div>
      )}

      <div className="flex gap-3 justify-end pt-4 border-t border-stone-200">
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-50 font-medium">Annuler</button>
        <button type="submit" disabled={uploading} className="btn-primary">
          <FontAwesomeIcon icon={uploading ? faSpinner : faSave} className={uploading ? 'animate-spin mr-2' : 'mr-2'} />
          {initialData ? 'Mettre à jour' : 'Créer le membre'}
        </button>
      </div>
    </form>
  );
}
