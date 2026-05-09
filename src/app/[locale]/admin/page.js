'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faCalendarCheck,
  faUsers,
  faComments,
  faPlus,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    articles: 0,
    activities: 0,
    users: 0,
    comments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [articles, activities] = await Promise.all([
        axios.get('/api/articles'),
        axios.get('/api/activities'),
      ]);
      setStats({
        articles: articles.data.length,
        activities: activities.data.length,
        users: 0,
        comments: 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const sidebarLinks = [
    { id: 'dashboard', icon: faCalendarCheck, label: t('admin.dashboard') },
    { id: 'articles', icon: faNewspaper, label: t('admin.manage_articles') },
    { id: 'activities', icon: faCalendarCheck, label: t('admin.manage_activities') },
    { id: 'users', icon: faUsers, label: t('admin.manage_users') },
    { id: 'comments', icon: faComments, label: t('admin.manage_comments') },
  ];

  const statCards = [
    { label: t('admin.total_articles'), value: stats.articles, icon: faNewspaper },
    { label: t('admin.total_activities'), value: stats.activities, icon: faCalendarCheck },
    { label: t('admin.total_users'), value: stats.users, icon: faUsers },
    { label: t('admin.total_comments'), value: stats.comments, icon: faComments },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-stone-200 p-4">
        <div className="mb-8 p-4">
          <h2 className="font-heading font-bold text-xl text-primary-600">AYSA Admin</h2>
        </div>
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`admin-sidebar-link w-full ${
                activeTab === link.id ? 'active' : ''
              }`}
            >
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-heading font-bold mb-8">{t('admin.dashboard')}</h1>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={index}
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={stat.icon} className="text-primary-500 text-xl" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-stone-500">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">{t('admin.manage_articles')}</h2>
              <button className="btn-primary">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                {t('common.create')}
              </button>
            </div>
            <p className="text-stone-500">Article management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'activities' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">{t('admin.manage_activities')}</h2>
              <button className="btn-primary">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                {t('common.create')}
              </button>
            </div>
            <p className="text-stone-500">Activity management interface coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}