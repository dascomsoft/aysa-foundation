

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarCheck, faMapMarkerAlt, faClock, faArrowLeft, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import Link from 'next/link';
// import toast from 'react-hot-toast';

// export default function EventDetail() {
//   const { id, locale } = useParams();
//   const [event, setEvent] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetchEvent();
//     const u = localStorage.getItem('user');
//     if (u) setUser(JSON.parse(u));
//   }, [id]);

//   const fetchEvent = async () => {
//     try {
//       const { data } = await axios.get('/api/events');
//       const found = data.find(e => e._id === id);
//       setEvent(found || null);
//       // Fetch comments for this event
//       const cRes = await axios.get(`/api/comments?type=event&parentId=${id}`);
//       setComments(cRes.data || []);
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   const handleComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim() || !user) return toast.error('Connectez-vous pour commenter');
//     try {
//       await axios.post('/api/comments', { type: 'event', parentId: id, message: newComment });
//       toast.success('Commentaire ajouté');
//       setNewComment('');
//       fetchEvent();
//     } catch (err) { toast.error('Erreur'); }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!confirm('Supprimer ce commentaire ?')) return;
//     try {
//       await axios.delete(`/api/comments/${commentId}`);
//       toast.success('Supprimé');
//       fetchEvent();
//     } catch (err) { toast.error('Erreur'); }
//   };

//   if (loading) return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>;
//   if (!event) return <div className="py-32 text-center"><p className="text-stone-500">Événement non trouvé</p></div>;

//   return (
//     <div className="py-16">
//       <div className="container mx-auto px-4 max-w-3xl">
//         <Link href={`/${locale}/events`} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 mb-8"><FontAwesomeIcon icon={faArrowLeft} /> Retour aux événements</Link>

//         <motion.div className="card overflow-hidden mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
//           {event.images?.[0] && <img src={event.images[0]} alt="" className="w-full h-64 object-cover rounded-t-xl" />}
//           <div className="p-8">
//             <h1 className="text-3xl font-heading font-bold mb-4">{event.title?.fr}</h1>
//             <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-6">
//               <span><FontAwesomeIcon icon={faCalendarCheck} className="mr-1 text-primary-400" />{new Date(event.date).toLocaleDateString()}</span>
//               <span><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-primary-400" />{event.location}</span>
//             </div>
//             <div className="prose prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: event.description?.fr || '' }} />
//           </div>
//         </motion.div>

//         {/* Commentaires */}
//         <div className="card p-8">
//           <h3 className="font-heading font-bold text-xl mb-6">Commentaires ({comments.length})</h3>
          
//           {user ? (
//             <form onSubmit={handleComment} className="flex gap-3 mb-8">
//               <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Votre commentaire..." className="input-field flex-1" />
//               <button type="submit" className="btn-primary"><FontAwesomeIcon icon={faPaperPlane} /></button>
//             </form>
//           ) : (
//             <p className="text-stone-400 mb-8"><Link href={`/${locale}/auth`} className="text-primary-500">Connectez-vous</Link> pour commenter</p>
//           )}

//           {comments.length === 0 ? <p className="text-stone-400">Aucun commentaire</p> :
//             comments.map(c => (
//               <div key={c._id} className="flex items-start justify-between py-3 border-b border-stone-100 last:border-0">
//                 <div>
//                   <p className="font-medium text-sm">{c.userId?.name || 'Anonyme'}</p>
//                   <p className="text-stone-600">{c.message}</p>
//                   <p className="text-xs text-stone-400 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
//                 </div>
//                 {user && (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
//                   <button onClick={() => handleDeleteComment(c._id)} className="p-1 hover:bg-red-50 rounded text-red-400"><FontAwesomeIcon icon={faTrash} className="text-xs" /></button>
//                 )}
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }









'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faMapMarkerAlt, faClock, faArrowLeft, faTrash, faPaperPlane, faUser, faEllipsisV, faEdit } from '@fortawesome/free-solid-svg-icons';
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
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    fetchEvent();
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, [id]);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get('/api/events');
      const found = data.find(e => e._id.toString() === id);
      setEvent(found || null);
      const cRes = await axios.get(`/api/comments?type=event&parentId=${id}`);
      setComments(cRes.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return toast.error('Connectez-vous pour commenter');
    try {
      await axios.post('/api/comments', { type: 'event', parentId: id, message: newComment, userId: user.id });
      toast.success('Commentaire ajouté');
      setNewComment('');
      fetchEvent();
    } catch (err) { toast.error('Erreur'); }
  };

  const isOwner = (comment) => user && (user.id === comment.userId?._id || user.id === comment.userId);
  const isAdmin = () => user && ['SUPER_ADMIN', 'PRESIDENT', 'ADMIN'].includes(user.role);
  const canDelete = (comment) => isOwner(comment) || isAdmin();
  const canEdit = (comment) => isOwner(comment);

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Supprimer ce commentaire ?')) return;
    try { await axios.delete(`/api/comments/${commentId}`); toast.success('Supprimé'); setOpenMenuId(null); fetchEvent(); }
    catch (err) { toast.error('Erreur'); }
  };

  const handleEditComment = async (commentId) => {
    try { await axios.put(`/api/comments/${commentId}`, { message: editText }); toast.success('Modifié'); setEditingComment(null); setOpenMenuId(null); fetchEvent(); }
    catch (err) { toast.error('Erreur'); }
  };

  if (loading) return <div className="py-32 text-center"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>;
  if (!event) return <div className="py-32 text-center"><p className="text-stone-500">Événement non trouvé</p></div>;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href={`/${locale}/events`} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 mb-8">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour aux événements
        </Link>

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

        {/* COMMENTAIRES STYLE FACEBOOK */}
        <div className="card p-8">
          <h3 className="font-heading font-bold text-xl mb-6">Commentaires ({comments.length})</h3>
          {user ? (
            <form onSubmit={handleComment} className="flex gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0">
                {user.avatar ? <img src={user.avatar} className="w-full h-full rounded-full object-cover" alt="" /> : <FontAwesomeIcon icon={faUser} className="text-stone-400" />}
              </div>
              <div className="flex-1 relative">
                <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Écrivez un commentaire..." className="input-field pr-12" />
                <button type="submit" className="absolute right-2 top-2 text-primary-500 hover:text-primary-600 p-1"><FontAwesomeIcon icon={faPaperPlane} /></button>
              </div>
            </form>
          ) : (
            <p className="text-stone-400 mb-8 text-center bg-stone-50 rounded-xl p-4"><Link href={`/${locale}/auth`} className="text-primary-500 font-medium">Connectez-vous</Link> pour commenter</p>
          )}
          {comments.length === 0 ? <p className="text-center text-stone-400 py-8">Aucun commentaire</p> :
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c._id} className="flex gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                    {c.userId?.avatar ? <img src={c.userId.avatar} className="w-full h-full rounded-full object-cover" alt="" /> : <span className="text-sm font-bold text-primary-500">{c.userId?.name?.charAt(0) || 'A'}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="bg-stone-50 rounded-2xl px-4 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm">{c.userId?.name || 'Anonyme'}</p>
                        {canDelete(c) && (
                          <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setOpenMenuId(openMenuId === c._id ? null : c._id)} className="p-1 hover:bg-stone-200 rounded-full"><FontAwesomeIcon icon={faEllipsisV} className="text-stone-400 text-xs" /></button>
                            {openMenuId === c._id && (
                              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-stone-200 py-1 z-10 min-w-[120px]">
                                {canEdit(c) && <button onClick={() => { setEditingComment(c._id); setEditText(c.message); setOpenMenuId(null); }} className="w-full text-left px-4 py-2 text-sm hover:bg-stone-50 flex items-center gap-2"><FontAwesomeIcon icon={faEdit} className="text-stone-400 text-xs" /> Modifier</button>}
                                <button onClick={() => handleDeleteComment(c._id)} className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-500 flex items-center gap-2"><FontAwesomeIcon icon={faTrash} className="text-xs" /> Supprimer</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {editingComment === c._id ? (
                        <div className="flex gap-2 mt-1"><input value={editText} onChange={e => setEditText(e.target.value)} className="input-field text-sm flex-1" /><button onClick={() => handleEditComment(c._id)} className="text-primary-500 text-sm font-medium">Enregistrer</button><button onClick={() => setEditingComment(null)} className="text-stone-400 text-sm">Annuler</button></div>
                      ) : (
                        <p className="text-stone-700 text-sm">{c.message}</p>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-1 ml-1">{new Date(c.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
