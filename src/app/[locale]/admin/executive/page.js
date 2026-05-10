
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar, faNewspaper, faCalendarCheck, faBullhorn,
  faSignOutAlt, faPlus, faBars, faTimes, faEdit, faTrash,
  faTimesCircle, faComments, faUser
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContentForm = dynamic(() => import('@/components/editor/ContentForm'), { ssr: false });

export default function ExecutiveDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const [articles, setArticles] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [showForm, setShowForm] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/auth'); return; }
    setUserData(JSON.parse(user));
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const results = await Promise.allSettled([
      axios.get('/api/articles'),
      axios.get('/api/events'),
      axios.get('/api/announcements'),
    ]);
    setArticles(results[0].value?.data || []);
    setEvents(results[1].value?.data || []);
    setAnnouncements(results[2].value?.data || []);
  };

  const handleCreate = async (type, payload) => {
    try {
      const endpoints = { article: 'articles', event: 'events', announce: 'announcements' };
      if (editingItem) {
        await axios.put(`/api/${endpoints[type]}/${editingItem._id}`, payload);
        toast.success('Mis à jour !');
      } else {
        await axios.post(`/api/${endpoints[type]}`, payload);
        toast.success('Créé avec succès !');
      }
      setShowForm(null); setEditingItem(null); fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || 'Erreur'); }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Confirmer la suppression ?')) return;
    try { await axios.delete(`/api/${type}/${id}`); toast.success('Supprimé'); fetchAll(); }
    catch (err) { toast.error('Erreur'); }
  };

  const handleLogout = () => { localStorage.clear(); router.push('/'); };

  const sidebarLinks = [
    { id: 'overview', icon: faChartBar, label: 'Accueil' },
    { id: 'articles', icon: faNewspaper, label: 'Actualités' },
    { id: 'events', icon: faCalendarCheck, label: 'Événements' },
    { id: 'announcements', icon: faBullhorn, label: 'Annonces' },
    { id: 'profile', icon: faUser, label: 'Mon Profil' },
  ];

  return (
    <div className="min-h-screen bg-stone-200">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2"><FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} /></button>
          <h2 className="font-bold text-primary-600">Admin</h2>
          <button onClick={handleLogout} className="p-2 text-red-500"><FontAwesomeIcon icon={faSignOutAlt} /></button>
        </div>
      </div>
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-40 transition-transform overflow-y-auto lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white">
            <h2 className="font-bold">Administrateur</h2>
            <p className="text-xs text-white/70">{userData?.email}</p>
            <p className="text-xs text-white/50 mt-1">{userData?.role}</p>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map(l => (
              <button key={l.id} onClick={() => { setActiveTab(l.id); setSidebarOpen(false); setShowForm(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === l.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
                <FontAwesomeIcon icon={l.icon} className="w-5" /><span>{l.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 mt-4">
            <FontAwesomeIcon icon={faSignOutAlt} /><span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 lg:pt-16 p-4 lg:p-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold mb-8">Tableau de Bord</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Actualités', value: articles.length, color: 'bg-purple-500' },
                { label: 'Événements', value: events.length, color: 'bg-green-500' },
                { label: 'Annonces', value: announcements.length, color: 'bg-orange-500' },
              ].map((s, i) => (
                <div key={i} className="card"><div className="flex items-center gap-3"><div className={`w-10 h-10 ${s.color} rounded-xl`}></div><div><p className="text-xl font-bold">{s.value}</p><p className="text-xs text-stone-500">{s.label}</p></div></div></div>
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <button onClick={() => { setActiveTab('articles'); setShowForm('article'); }} className="card hover:border-purple-500 text-center p-4"><FontAwesomeIcon icon={faPlus} className="text-xl text-purple-500 mb-1" /><p className="text-sm font-medium">Nouvelle Actualité</p></button>
              <button onClick={() => { setActiveTab('events'); setShowForm('event'); }} className="card hover:border-green-500 text-center p-4"><FontAwesomeIcon icon={faPlus} className="text-xl text-green-500 mb-1" /><p className="text-sm font-medium">Nouvel Événement</p></button>
              <button onClick={() => { setActiveTab('announcements'); setShowForm('announce'); }} className="card hover:border-orange-500 text-center p-4"><FontAwesomeIcon icon={faPlus} className="text-xl text-orange-500 mb-1" /><p className="text-sm font-medium">Nouvelle Annonce</p></button>
            </div>
          </div>
        )}

        {/* Articles */}
        {activeTab === 'articles' && (
          <div>
            <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Actualités ({articles.length})</h2><button onClick={() => { setShowForm('article'); setEditingItem(null); }} className="btn-primary"><FontAwesomeIcon icon={faPlus} className="mr-2" />Nouvelle</button></div>
            {showForm === 'article' && (
              <div className="card mb-8">
                <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-lg">{editingItem ? 'Modifier' : 'Nouvelle Actualité'}</h3><button onClick={() => { setShowForm(null); setEditingItem(null); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FontAwesomeIcon icon={faTimesCircle} /></button></div>
                <ContentForm type="article" initialData={editingItem} onSubmit={(data) => handleCreate('article', data)} onCancel={() => { setShowForm(null); setEditingItem(null); }} />
              </div>
            )}
            {articles.map(a => (<div key={a._id} className="card flex items-center justify-between mb-3"><div><p className="font-bold">{a.title?.fr}</p><p className="text-xs text-stone-500">{new Date(a.createdAt).toLocaleDateString()}</p></div><div className="flex gap-1"><button onClick={() => { setEditingItem(a); setShowForm('article'); }} className="p-2 hover:bg-stone-100 rounded-lg text-primary-500"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => handleDelete('articles', a._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div></div>))}
          </div>
        )}

        {/* Events */}
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Événements ({events.length})</h2><button onClick={() => { setShowForm('event'); setEditingItem(null); }} className="btn-primary"><FontAwesomeIcon icon={faPlus} className="mr-2" />Nouveau</button></div>
            {showForm === 'event' && (
              <div className="card mb-8">
                <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-lg">{editingItem ? 'Modifier' : 'Nouvel Événement'}</h3><button onClick={() => { setShowForm(null); setEditingItem(null); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FontAwesomeIcon icon={faTimesCircle} /></button></div>
                <ContentForm type="event" initialData={editingItem} onSubmit={(data) => handleCreate('event', data)} onCancel={() => { setShowForm(null); setEditingItem(null); }} />
              </div>
            )}
            {events.map(ev => (<div key={ev._id} className="card flex items-center justify-between mb-3"><div className="flex items-center gap-3">{ev.images?.[0] && <img src={ev.images[0]} className="w-12 h-12 object-cover rounded-lg" alt="" />}<div><p className="font-bold">{ev.title?.fr}</p><p className="text-xs text-stone-500">{ev.location} - {ev.date && new Date(ev.date).toLocaleDateString()}</p></div></div><div className="flex gap-1"><button onClick={() => { setEditingItem(ev); setShowForm('event'); }} className="p-2 hover:bg-stone-100 rounded-lg text-primary-500"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => handleDelete('events', ev._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div></div>))}
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div>
            <div className="flex items-center justify-between mb-6"><h2 className="text-2xl font-bold">Annonces ({announcements.length})</h2><button onClick={() => { setShowForm('announce'); setEditingItem(null); }} className="btn-primary"><FontAwesomeIcon icon={faPlus} className="mr-2" />Nouvelle</button></div>
            {showForm === 'announce' && (
              <div className="card mb-8">
                <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-lg">{editingItem ? 'Modifier' : 'Nouvelle Annonce'}</h3><button onClick={() => { setShowForm(null); setEditingItem(null); }} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FontAwesomeIcon icon={faTimesCircle} /></button></div>
                <ContentForm type="announce" initialData={editingItem} onSubmit={(data) => handleCreate('announce', data)} onCancel={() => { setShowForm(null); setEditingItem(null); }} />
              </div>
            )}
            {announcements.map(a => (<div key={a._id} className="card flex items-center justify-between mb-3"><div><div className="flex items-center gap-2 mb-1"><p className="font-bold">{a.title?.fr}</p><span className={`text-xs px-2 py-0.5 rounded-full ${a.type==='urgent'?'bg-red-100 text-red-600':'bg-stone-100 text-stone-600'}`}>{a.type}</span></div><p className="text-xs text-stone-500">{new Date(a.createdAt).toLocaleDateString()}</p></div><div className="flex gap-1"><button onClick={() => { setEditingItem(a); setShowForm('announce'); }} className="p-2 hover:bg-stone-100 rounded-lg text-primary-500"><FontAwesomeIcon icon={faEdit} /></button><button onClick={() => handleDelete('announcements', a._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><FontAwesomeIcon icon={faTrash} /></button></div></div>))}
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
            <div className="card p-8 max-w-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-2xl text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">{userData?.name}</p>
                  <p className="text-stone-500">{userData?.email}</p>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{userData?.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
