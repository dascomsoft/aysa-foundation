

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AuthPage() {
  const t = useTranslations();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-md">
        <div className="card p-8">
          <h1 className="text-3xl font-heading font-bold mb-6 text-center">
            {isLogin ? t('auth.login_title') : t('auth.register_title')}
          </h1>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('auth.name')}
                </label>
                <input type="text" className="input-field" required />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('auth.email')}
              </label>
              <input type="email" className="input-field" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('auth.password')}
              </label>
              <input type="password" className="input-field" required />
            </div>

            <button type="submit" className="btn-primary w-full">
              {isLogin ? t('common.login') : t('common.register')}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            {isLogin ? (
              <>
                {t('auth.no_account')}{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary-600 hover:underline font-medium"
                >
                  {t('common.register')}
                </button>
              </>
            ) : (
              <>
                {t('auth.has_account')}{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary-600 hover:underline font-medium"
                >
                  {t('common.login')}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
