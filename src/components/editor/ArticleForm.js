

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faImage } from '@fortawesome/free-solid-svg-icons';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), {
  ssr: false,
  loading: () => <div className="h-64 bg-stone-100 animate-pulse rounded-xl"></div>
});

export default function ArticleForm({ initialData, onSubmit, onCancel }) {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    titleFr: initialData?.title?.fr || '',
    titleEn: initialData?.title?.en || '',
    contentFr: initialData?.content?.fr || '',
    contentEn: initialData?.content?.en || '',
    image: initialData?.image || '',
    excerptFr: initialData?.excerpt?.fr || '',
    excerptEn: initialData?.excerpt?.en || '',
  });
  const [activeLang, setActiveLang] = useState('fr');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const articleData = {
      title: {
        fr: formData.titleFr,
        en: formData.titleEn,
      },
      content: {
        fr: formData.contentFr,
        en: formData.contentEn,
      },
      excerpt: {
        fr: formData.excerptFr,
        en: formData.excerptEn,
      },
      image: formData.image,
    };

    await onSubmit(articleData);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sélecteur de langue */}
      <div className="flex gap-2 bg-stone-100 rounded-lg p-1 w-fit">
        {['fr', 'en'].map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setActiveLang(lang)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeLang === lang
                ? 'bg-white shadow text-primary-600'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {lang === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
          </button>
        ))}
      </div>

      {/* Titre */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Titre ({activeLang.toUpperCase()})
        </label>
        {activeLang === 'fr' ? (
          <input
            type="text"
            value={formData.titleFr}
            onChange={(e) => setFormData({ ...formData, titleFr: e.target.value })}
            className="input-field text-lg font-bold"
            placeholder="Titre de l'article en français"
            required
          />
        ) : (
          <input
            type="text"
            value={formData.titleEn}
            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
            className="input-field text-lg font-bold"
            placeholder="Article title in English"
            required
          />
        )}
      </div>

      {/* Extrait */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Extrait / Résumé ({activeLang.toUpperCase()})
        </label>
        {activeLang === 'fr' ? (
          <textarea
            value={formData.excerptFr}
            onChange={(e) => setFormData({ ...formData, excerptFr: e.target.value })}
            className="input-field h-24"
            placeholder="Bref résumé de l'article..."
          ></textarea>
        ) : (
          <textarea
            value={formData.excerptEn}
            onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
            className="input-field h-24"
            placeholder="Brief summary of the article..."
          ></textarea>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-2">Image de couverture</label>
        <div className="flex gap-4 items-start">
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="input-field flex-1"
            placeholder="https://exemple.com/image.jpg"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Contenu riche */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Contenu ({activeLang.toUpperCase()})
        </label>
        {activeLang === 'fr' ? (
          <TiptapEditor
            content={formData.contentFr}
            onChange={(html) => setFormData({ ...formData, contentFr: html })}
            placeholder="Contenu de l'article en français..."
          />
        ) : (
          <TiptapEditor
            content={formData.contentEn}
            onChange={(html) => setFormData({ ...formData, contentEn: html })}
            placeholder="Article content in English..."
          />
        )}
      </div>

      {/* Boutons */}
      <div className="flex gap-4 justify-end pt-4 border-t border-stone-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-medium"
        >
          <FontAwesomeIcon icon={faTimes} className="mr-2" />
          Annuler
        </button>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary"
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          {saving ? 'Enregistrement...' : 'Publier l\'article'}
        </button>
      </div>
    </form>
  );
}
