

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faMapMarkerAlt, faClock, faArrowLeft, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EventDetail() {
  const { id, locale } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchEvent();
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get('/api/events');
      const found = data.find(e => e._id === id);
      setEvent(found || null);
      // Fetch comments for this event
      const cRes = await axios.get(`/api/comments?type=event&parentId=${id}`);
      setComments(cRes.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return toast.error('Connectez-vous pour commenter');
    try {
      await axios.post('/api/comments', { type: 'event', parentId: id, message: newComment });
      toast.success('Commentaire ajouté');
      setNewComment('');
      fetchEvent();
    } catch (err) { toast.error('Erreur'); }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Supprimer ce commentaire ?')) return;
    try {
      await axios.delete(`/api/comments/${commentId}`);
      toast.success('Supprimé');
      fetchEvent();
    } catch (err) { toast.error('Erreur'); }
  };

  if (loading) return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>;
  if (!event) return <div className="py-32 text-center"><p className="text-stone-500">Événement non trouvé</p></div>;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href={`/${locale}/events`} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 mb-8"><FontAwesomeIcon icon={faArrowLeft} /> Retour aux événements</Link>

        <motion.div className="card overflow-hidden mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          {event.images?.[0] && <img src={event.images[0]} alt="" className="w-full h-64 object-cover rounded-t-xl" />}
          <div className="p-8">
            <h1 className="text-3xl font-heading font-bold mb-4">{event.title?.fr}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-6">
              <span><FontAwesomeIcon icon={faCalendarCheck} className="mr-1 text-primary-400" />{new Date(event.date).toLocaleDateString()}</span>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-primary-400" />{event.location}</span>
            </div>
            <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: event.description?.fr || '' }} />
          </div>
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
                {user && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
                  <button onClick={() => handleDeleteComment(c._id)} className="p-1 hover:bg-red-50 rounded text-red-400"><FontAwesomeIcon icon={faTrash} className="text-xs" /></button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
