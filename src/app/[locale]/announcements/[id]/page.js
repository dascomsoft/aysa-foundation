

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faClock, faArrowLeft, faTrash, faPaperPlane, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AnnouncementDetail() {
  const { id, locale } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchAnnouncement();
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, [id]);

  const fetchAnnouncement = async () => {
    try {
      const { data } = await axios.get('/api/announcements');
      const found = data.find(a => a._id === id);
      setAnnouncement(found || null);
      const cRes = await axios.get(`/api/comments?type=announcement&parentId=${id}`);
      setComments(cRes.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return toast.error('Connectez-vous pour commenter');
    try {
      await axios.post('/api/comments', { type: 'announcement', parentId: id, message: newComment });
      toast.success('Commentaire ajouté');
      setNewComment('');
      fetchAnnouncement();
    } catch (err) { toast.error('Erreur'); }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Supprimer ce commentaire ?')) return;
    try {
      await axios.delete(`/api/comments/${commentId}`);
      toast.success('Supprimé');
      fetchAnnouncement();
    } catch (err) { toast.error('Erreur'); }
  };

  if (loading) return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>;
  if (!announcement) return <div className="py-32 text-center"><p className="text-stone-500">Annonce non trouvée</p></div>;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href={`/${locale}/announcements`} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 mb-8">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour aux annonces
        </Link>

        <motion.div className="card p-8 mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            {announcement.isPinned && <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium"><FontAwesomeIcon icon={faThumbtack} className="mr-1" />Épinglé</span>}
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              announcement.type === 'urgent' ? 'bg-red-100 text-red-700' : 
              announcement.type === 'official' ? 'bg-blue-100 text-blue-700' : 
              announcement.type === 'press' ? 'bg-purple-100 text-purple-700' : 
              'bg-stone-100 text-stone-600'
            }`}>{announcement.type?.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-heading font-bold mb-4">{announcement.title?.fr || announcement.title?.en}</h1>
          <p className="text-sm text-stone-400 mb-6">
            <FontAwesomeIcon icon={faClock} className="mr-1" />
            {new Date(announcement.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: announcement.content?.fr || announcement.content?.en || '' }} />
        </motion.div>

        {/* Commentaires */}
        <div className="card p-8">
          <h3 className="font-heading font-bold text-xl mb-6">Commentaires ({comments.length})</h3>
          {user ? (
            <form onSubmit={handleComment} className="flex gap-3 mb-8">
              <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Votre commentaire..." className="input-field flex-1" />
              <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
          ) : (
            <p className="text-stone-400 mb-8"><Link href={`/${locale}/auth`} className="text-primary-500">Connectez-vous</Link> pour commenter</p>
          )}
          {comments.length === 0 ? <p className="text-stone-400">Aucun commentaire</p> :
            comments.map(c => (
              <div key={c._id} className="flex items-start justify-between py-3 border-b border-stone-100 last:border-0">
                <div>
                  <p className="font-medium text-sm">{c.userId?.name || 'Anonyme'}</p>
                  <p className="text-stone-600">{c.message}</p>
                  <p className="text-xs text-stone-400 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                </div>
                {user && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' || user.role === 'PRESIDENT') && (
                  <button onClick={() => handleDeleteComment(c._id)} className="p-1 hover:bg-red-50 rounded text-red-400"><FontAwesomeIcon icon={faTrash} className="text-xs" /></button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
