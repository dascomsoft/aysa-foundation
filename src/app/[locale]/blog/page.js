'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import { formatDate } from '@/lib/utils';

export default function BlogPage() {
  const t = useTranslations();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await axios.get('/api/articles');
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold mb-8">{t('blog.title')}</h1>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-stone-200 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-stone-200 rounded mb-2"></div>
                <div className="h-4 bg-stone-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center text-stone-500 py-12">{t('blog.no_articles')}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={article._id}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendar} />
                    {formatDate(article.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faUser} />
                    {article.author?.name || 'AYSA'}
                  </span>
                </div>
                <h2 className="text-xl font-heading font-bold mb-2">
                  {article.title.en}
                </h2>
                <p className="text-stone-600 mb-4 line-clamp-3">
                  {article.content.en.substring(0, 150)}...
                </p>
                <Link
                  href={`/blog/${article._id}`}
                  className="text-primary-500 font-medium hover:text-primary-600 flex items-center gap-1"
                >
                  {t('common.read_more')}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}