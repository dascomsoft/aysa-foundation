'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

export default function DonatePage() {
  const t = useTranslations();
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState(25);

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <FontAwesomeIcon icon={faHandHoldingHeart} className="text-6xl text-primary-500 mb-4" />
            <h1 className="text-4xl font-heading font-bold mb-4">{t('donate.title')}</h1>
            <p className="text-xl text-stone-600">{t('donate.subtitle')}</p>
          </div>

          <div className="card p-8">
            {/* Donation Type */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setDonationType('one-time')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  donationType === 'one-time'
                    ? 'bg-primary-500 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {t('donate.one_time')}
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  donationType === 'monthly'
                    ? 'bg-primary-500 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {t('donate.monthly')}
              </button>
            </div>

            {/* Amount Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-4">{t('donate.amount')}</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      amount === preset
                        ? 'bg-primary-500 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3 text-stone-500 text-lg">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="input-field pl-8"
                  placeholder={t('donate.custom')}
                />
              </div>
            </div>

            {/* Donate Button */}
            <button className="btn-primary w-full py-4 text-lg">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              {t('donate.donate_button')} - ${amount}
            </button>

            <p className="text-center text-sm text-stone-500 mt-4">
              Your donation is secure and encrypted. All donations are tax-deductible where applicable.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}