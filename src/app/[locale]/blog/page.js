'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function BlogPage() {
  const t = useTranslations();
  const { locale } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    try { const { data } = await axios.get('/api/articles'); setArticles(data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const stripHtml = (html, max = 120) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    return text.length > max ? text.substring(0, max) + '...' : text;
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-stone-500">Les dernières actualités de la fondation</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="card animate-pulse"><div className="bg-stone-200 h-48 rounded-lg mb-4"></div><div className="h-6 bg-stone-200 rounded mb-2"></div></div>)}
          </div>
        ) : articles.length === 0 ? (
          <div className="card text-center py-16"><p className="text-stone-500 text-lg">{t('blog.no_articles')}</p></div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link key={article._id} href={`/${locale}/blog/${article._id}`}>
                <motion.article className="card overflow-hidden group cursor-pointer h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  {article.image ? (
                    <img src={article.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-48 bg-stone-100 rounded-lg mb-4 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendar} className="text-3xl text-stone-300" />
                    </div>
                  )}
                  <div className="text-sm text-stone-400 mb-3">
                    <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                  <h2 className="font-heading font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">{article.title?.fr || article.title?.en}</h2>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-3">{stripHtml(article.content?.fr || article.content?.en)}</p>
                  <span className="text-primary-500 font-medium text-sm flex items-center gap-1">
                    {t('common.read_more')}
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </span>
                </motion.article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}