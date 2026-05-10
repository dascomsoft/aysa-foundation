

'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSpinner, faSave, faTrash, faImage } from '@fortawesome/free-solid-svg-icons';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false });

export default function ContentForm({ type, initialData, onSubmit, onCancel }) {
  const isArticle = type === 'article';
  const isEvent = type === 'event';
  const isAnnounce = type === 'announce';

  const [form, setForm] = useState({
    titleFr: initialData?.title?.fr || '',
    titleEn: initialData?.title?.en || '',
    contentFr: initialData?.content?.fr || initialData?.description?.fr || '',
    contentEn: initialData?.content?.en || initialData?.description?.en || '',
    location: initialData?.location || '',
    date: initialData?.date ? initialData.date.substring(0, 10) : '',
    type: initialData?.type || 'general',
    isPinned: initialData?.isPinned || false,
    image: initialData?.image || '',
  });

  const [images, setImages] = useState(
    initialData?.images?.map(url => ({ file: null, preview: url })) || 
    (initialData?.image ? [{ file: null, preview: initialData.image }] : [])
  );

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Choisir une image depuis le dossier
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image trop grande. Max 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => [...prev, { file, preview: ev.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!data.success && !data.url) throw new Error('Upload failed');
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.titleFr || !form.titleEn) {
      alert('Les titres FR et EN sont obligatoires.');
      return;
    }
    if (!form.contentFr && !form.contentEn) {
      alert('Le contenu est obligatoire.');
      return;
    }
    if (isEvent && (!form.location || !form.date)) {
      alert('Le lieu et la date sont obligatoires pour un événement.');
      return;
    }

    setUploading(true);

    try {
      // Upload des images vers Cloudinary
      let uploadedUrls = [];
      for (const img of images) {
        if (img.file) {
          const url = await uploadToCloudinary(img.file);
          uploadedUrls.push(url);
        } else {
          uploadedUrls.push(img.preview);
        }
      }

      // Construire les données selon le type
      let payload = {};
      if (isArticle) {
        payload = {
          title: { fr: form.titleFr, en: form.titleEn },
          content: { fr: form.contentFr, en: form.contentEn },
          image: uploadedUrls[0] || '',
        };
      } else if (isEvent) {
        payload = {
          title: { fr: form.titleFr, en: form.titleEn },
          description: { fr: form.contentFr, en: form.contentEn },
          location: form.location,
          date: form.date,
          images: uploadedUrls,
        };
      } else if (isAnnounce) {
        payload = {
          title: { fr: form.titleFr, en: form.titleEn },
          content: { fr: form.contentFr, en: form.contentEn },
          type: form.type,
          isPinned: form.isPinned,
        };
      }

      await onSubmit(payload);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la création. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Titres */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Titre (FR) *</label>
          <input
            value={form.titleFr}
            onChange={e => setForm({ ...form, titleFr: e.target.value })}
            className="input-field"
            placeholder="Titre en français"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Titre (EN) *</label>
          <input
            value={form.titleEn}
            onChange={e => setForm({ ...form, titleEn: e.target.value })}
            className="input-field"
            placeholder="Title in English"
            required
          />
        </div>
      </div>

      {/* Lieu et Date pour Événement */}
      {isEvent && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Lieu *</label>
            <input
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="input-field"
              placeholder="Lieu de l'événement"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>
      )}

      {/* Type et Épinglage pour Annonce */}
      {isAnnounce && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Type d'annonce</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="input-field"
            >
              <option value="general">Général</option>
              <option value="official">Officiel</option>
              <option value="press">Presse</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPinned}
                onChange={e => setForm({ ...form, isPinned: e.target.checked })}
                className="w-5 h-5 text-primary-500 rounded"
              />
              <span className="text-sm font-semibold">Épingler cette annonce</span>
            </label>
          </div>
        </div>
      )}

      {/* Contenu avec Tiptap */}
      <div>
        <label className="block text-sm font-semibold mb-2">Contenu (FR) *</label>
        <TiptapEditor
          content={form.contentFr}
          onChange={(html) => setForm({ ...form, contentFr: html })}
          placeholder="Contenu en français..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Contenu (EN)</label>
        <TiptapEditor
          content={form.contentEn}
          onChange={(html) => setForm({ ...form, contentEn: html })}
          placeholder="Content in English..."
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          {isArticle ? 'Image de couverture' : 'Images'}
        </label>

        {images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.preview}
                  className="w-full h-24 object-cover rounded-lg border"
                  alt=""
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full items-center justify-center text-xs hidden group-hover:flex"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all"
        >
          <FontAwesomeIcon icon={faImage} className="text-3xl text-stone-400 mb-2" />
          <p className="text-stone-600 font-medium">Cliquez pour choisir {isArticle ? 'une image' : 'des images'}</p>
          <p className="text-xs text-stone-400 mt-1">JPG, PNG, WebP - Max 5MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={!isArticle}
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-3 justify-end pt-4 border-t border-stone-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-stone-300 rounded-xl hover:bg-stone-50 font-semibold transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={uploading}
          className="btn-primary min-w-[150px]"
        >
          {uploading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Publication...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              {initialData ? 'Mettre à jour' : 'Publier'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
