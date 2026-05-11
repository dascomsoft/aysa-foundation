
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faUser, 
  faEye, 
  faEyeSlash,
  faSignInAlt,
  faUserPlus,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const t = useTranslations();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'SUPER_ADMIN': return '/admin/super-admin';
      case 'PRESIDENT': return '/admin/super-admin';
      case 'ADMIN': return '/admin/executive';
      case 'MEMBER': return '/admin/volunteer';
      default: return '/';
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Bienvenue ${user.name} !`);

      // Redirection IMMÉDIATE (sans setTimeout)
      const route = getDashboardRoute(user.role);
      router.push(route);

    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.error || 'Erreur de connexion';
      toast.error(message);
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Bienvenue ${user.name} !`);

      const route = getDashboardRoute(user.role);
      router.push(route);

    } catch (error) {
      console.error('Register error:', error);
      const message = error.response?.data?.error || 'Erreur d\'inscription';
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4 bg-stone-200">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-stone-800">
            {isLogin ? t('auth.login_title') : t('auth.register_title')}
          </h1>
          <p className="text-stone-500 mt-1">
            {isLogin ? 'Connectez-vous à votre compte' : 'Rejoignez la communauté AYSA'}
          </p>
        </div>

        {/* Formulaire */}
        <div className="card p-8">
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">{t('auth.name')}</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUser} className="absolute left-4 top-3.5 text-stone-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field pl-10" placeholder="Votre nom complet" required disabled={loading} />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">{t('auth.email')}</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-3.5 text-stone-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field pl-10" placeholder="votre@email.com" required disabled={loading} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">{t('auth.password')}</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-4 top-3.5 text-stone-400" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="input-field pl-10 pr-10" placeholder="••••••••" required disabled={loading} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-600" disabled={loading}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">{t('auth.confirm_password')}</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-4 top-3.5 text-stone-400" />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field pl-10" placeholder="••••••••" required disabled={loading} />
                </div>
              </div>
            )}

            {/* Bouton avec loader TRÈS VISIBLE */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg mt-6 relative overflow-hidden"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl" />
                  <span>Connexion en cours...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={isLogin ? faSignInAlt : faUserPlus} />
                  {isLogin ? t('common.login') : t('common.register')}
                </span>
              )}
            </button>

            {/* Message pendant le chargement */}
            {loading && (
              <p className="text-center text-sm text-stone-400 animate-pulse">
                Redirection vers votre espace...
              </p>
            )}
          </form>

          <div className="text-center mt-6 pt-6 border-t border-stone-200">
            <p className="text-stone-500 text-sm">
              {isLogin ? t('auth.no_account') : t('auth.has_account')}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-primary-600 hover:text-primary-700 font-semibold"
                disabled={loading}
              >
                {isLogin ? t('common.register') : t('common.login')}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
