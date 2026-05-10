
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar, faCalendarCheck, faComments,
  faSignOutAlt, faBars, faTimes, faUser, faHeart
} from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function VolunteerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) { router.push('/auth'); return; }
    setUserData(JSON.parse(user));
  }, []);

  const handleLogout = () => { localStorage.clear(); router.push('/'); };

  const sidebarLinks = [
    { id: 'overview', icon: faChartBar, label: 'Accueil' },
    { id: 'events', icon: faCalendarCheck, label: 'Événements' },
    { id: 'chat', icon: faComments, label: 'Chat' },
    { id: 'profile', icon: faUser, label: 'Mon Profil' },
  ];

  return (
    <div className="min-h-screen bg-stone-200">
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2"><FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} /></button>
          <h2 className="font-bold text-primary-600">Membre</h2>
          <button onClick={handleLogout} className="p-2 text-red-500"><FontAwesomeIcon icon={faSignOutAlt} /></button>
        </div>
      </div>
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>}

      <div className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-40 transition-transform overflow-y-auto lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="mb-6 p-4 bg-gradient-to-r from-green-600 to-green-800 rounded-xl text-white">
            <h2 className="font-bold">Bénévole</h2>
            <p className="text-xs text-white/70">{userData?.email}</p>
          </div>
          <nav className="space-y-1">
            {sidebarLinks.map(l => (
              <button key={l.id} onClick={() => { setActiveTab(l.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === l.id ? 'bg-green-50 text-green-600 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
                <FontAwesomeIcon icon={l.icon} className="w-5" /><span>{l.label}</span>
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 mt-4">
            <FontAwesomeIcon icon={faSignOutAlt} /><span>Déconnexion</span>
          </button>
        </div>
      </div>

      <div className="lg:ml-64 pt-20 lg:pt-16 p-4 lg:p-8">
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Bienvenue, {userData?.name} !</h1>
            <p className="text-stone-500 mb-8">Merci pour votre engagement dans la communauté AYSA Foundation.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card text-center"><FontAwesomeIcon icon={faCalendarCheck} className="text-3xl text-green-500 mb-2" /><p className="font-bold text-xl">0</p><p className="text-sm text-stone-500">Événements participés</p></div>
              <div className="card text-center"><FontAwesomeIcon icon={faComments} className="text-3xl text-blue-500 mb-2" /><p className="font-bold text-xl">0</p><p className="text-sm text-stone-500">Commentaires</p></div>
              <div className="card text-center"><FontAwesomeIcon icon={faHeart} className="text-3xl text-red-500 mb-2" /><p className="font-bold text-xl">0</p><p className="text-sm text-stone-500">Contributions</p></div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
            <div className="card p-8 max-w-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-2xl text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-lg">{userData?.name}</p>
                  <p className="text-stone-500">{userData?.email}</p>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">{userData?.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!['overview', 'profile'].includes(activeTab) && (
          <div className="card text-center py-16"><p className="text-stone-500">Section en développement</p></div>
        )}
      </div>
    </div>
  );
}
