
'use client';

import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSpinner, faSave, faUser } from '@fortawesome/free-solid-svg-icons';

export default function TeamMemberForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    descFr: initialData?.description?.fr || '',
    descEn: initialData?.description?.en || '',
    email: initialData?.email || '',
    linkedin: initialData?.linkedin || '',
    order: initialData?.order || 0,
  });
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return alert('Nom et rôle obligatoires');
    setUploading(true);
    
    let imageUrl = imagePreview;
    if (imageFile) {
      const fd = new FormData();
      fd.append('file', imageFile);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) imageUrl = data.url;
    }

    await onSubmit({
      name: form.name,
      role: form.role,
      description: { fr: form.descFr, en: form.descEn },
      image: imageUrl,
      email: form.email,
      linkedin: form.linkedin,
      order: form.order,
    });
    setUploading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div 
            className="w-28 h-28 rounded-full overflow-hidden bg-stone-200 flex items-center justify-center cursor-pointer border-4 border-white shadow"
            onClick={() => fileRef.current?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} className="w-full h-full object-cover" alt="" />
            ) : (
              <FontAwesomeIcon icon={faUser} className="text-4xl text-stone-400" />
            )}
          </div>
          <button type="button" onClick={() => fileRef.current?.click()} className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs shadow">
            <FontAwesomeIcon icon={faUpload} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Nom complet *</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Rôle / Titre *</label>
          <input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field" placeholder="Ex: Directeur Exécutif, Coordinateur..." required />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">LinkedIn (URL)</label>
          <input value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} className="input-field" placeholder="https://linkedin.com/in/..." />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description / Bio (FR)</label>
        <textarea value={form.descFr} onChange={e => setForm({...form, descFr: e.target.value})} className="input-field h-24" placeholder="Description en français..."></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description / Bio (EN)</label>
        <textarea value={form.descEn} onChange={e => setForm({...form, descEn: e.target.value})} className="input-field h-24" placeholder="Description in English..."></textarea>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Ordre d'affichage</label>
        <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="input-field w-32" />
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-stone-200">
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-50 font-semibold">Annuler</button>
        <button type="submit" disabled={uploading} className="btn-primary min-w-[150px]">
          {uploading ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />...</> : <><FontAwesomeIcon icon={faSave} className="mr-2" />{initialData ? 'Mettre à jour' : 'Ajouter'}</>}
        </button>
      </div>
    </form>
  );
}
