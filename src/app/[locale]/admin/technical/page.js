
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer, faDatabase, faShield, faCogs,
  faChartLine, faTerminal, faDownload, faRocket, faSignOutAlt, faBars, faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function TechnicalDashboard() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { id: 'monitoring', icon: faChartLine, label: 'Monitoring' },
    { id: 'database', icon: faDatabase, label: 'Base de données' },
    { id: 'security', icon: faShield, label: 'Sécurité' },
    { id: 'maintenance', icon: faCogs, label: 'Maintenance' },
    { id: 'deployment', icon: faRocket, label: 'Déploiement' },
    { id: 'logs', icon: faTerminal, label: 'Logs' },
  ];

  const systemStatus = [
    { name: 'Serveur Web', status: 'online', uptime: '99.9%' },
    { name: 'Base de données', status: 'online', uptime: '99.7%' },
    { name: 'API', status: 'online', uptime: '99.8%' },
    { name: 'Stockage', status: 'online', uptime: '99.5%' },
  ];

  return (
    <div className="min-h-screen bg-stone-200">
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2"><FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} /></button>
          <h2 className="font-bold text-stone-700">Tech Admin</h2>
        </div>
      </div>
      {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)}></div>}

      <div className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r z-40 transition-transform overflow-y-auto lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="mb-6 p-4 bg-stone-700 rounded-xl text-white"><h2 className="font-bold">Tech Admin</h2><p className="text-xs text-white/70">Système</p></div>
          <nav className="space-y-1">
            {sidebarLinks.map(l => (
              <button key={l.id} onClick={() => { setActiveTab(l.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === l.id ? 'bg-stone-100 font-medium' : 'text-stone-600 hover:bg-stone-50'}`}>
                <FontAwesomeIcon icon={l.icon} className="w-5" /><span>{l.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="lg:ml-64 pt-20 lg:pt-16 p-4 lg:p-8">
        {activeTab === 'monitoring' && (
          <div>
            <h1 className="text-2xl font-bold mb-8">Monitoring Système</h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {systemStatus.map((s, i) => (
                <motion.div key={i} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-center justify-between mb-2"><h3 className="font-bold">{s.name}</h3><span className="w-3 h-3 bg-green-500 rounded-full"></span></div>
                  <p className="text-sm text-stone-500">Uptime: {s.uptime}</p>
                  <div className="w-full bg-stone-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div></div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {activeTab !== 'monitoring' && (
          <div className="card text-center py-16"><p className="text-stone-500">Section en développement</p></div>
        )}
      </div>
    </div>
  );
}
