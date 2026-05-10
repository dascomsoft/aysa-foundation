
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
  faUserPlus
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

      // Sauvegarder le token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Bienvenue ${user.name} !`);

      // Redirection selon le rôle
      setTimeout(() => {
        switch (user.role) {
          case 'SUPER_ADMIN':
            router.push('/admin/super-admin');
            break;
          case 'PRESIDENT':
            router.push('/admin/super-admin');
            break;
          case 'ADMIN':
            router.push('/admin/executive');
            break;
          case 'MEMBER':
            router.push('/admin/volunteer');
            break;
          default:
            router.push('/');
        }
      }, 1000);

    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.error || 'Erreur de connexion';
      toast.error(message);
    } finally {
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

      // Sauvegarder le token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Bienvenue ${user.name} ! Votre compte a été créé.`);

      // Redirection vers le dashboard volunteer (MEMBER)
      setTimeout(() => {
        router.push('/admin/volunteer');
      }, 1000);

    } catch (error) {
      console.error('Register error:', error);
      const message = error.response?.data?.error || 'Erreur d\'inscription';
      toast.error(message);
    } finally {
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
            {/* Nom (register seulement) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t('auth.name')}
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faUser} 
                    className="absolute left-4 top-3.5 text-stone-400" 
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="absolute left-4 top-3.5 text-stone-400" 
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="absolute left-4 top-3.5 text-stone-400" 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-600"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            {/* Confirmation mot de passe (register seulement) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  {t('auth.confirm_password')}
                </label>
                <div className="relative">
                  <FontAwesomeIcon 
                    icon={faLock} 
                    className="absolute left-4 top-3.5 text-stone-400" 
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            {/* Bouton Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Chargement...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={isLogin ? faSignInAlt : faUserPlus} />
                  {isLogin ? t('common.login') : t('common.register')}
                </span>
              )}
            </button>
          </form>

          {/* Switch Login/Register */}
          <div className="text-center mt-6 pt-6 border-t border-stone-200">
            <p className="text-stone-500 text-sm">
              {isLogin ? t('auth.no_account') : t('auth.has_account')}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                {isLogin ? t('common.register') : t('common.login')}
              </button>
            </p>
          </div>
        </div>

        {/* Info rôles */}
        <div className="mt-6 p-4 bg-stone-100 rounded-xl text-sm text-stone-500">
          <p className="font-medium text-stone-700 mb-2">Comptes de test :</p>
          <div className="space-y-1">
            <p>🔑 <strong>Super Admin :</strong> admin@aysafoundation.org</p>
            <p>🔑 <strong>Mot de passe :</strong> Admin123!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
