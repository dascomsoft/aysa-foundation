
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faHandHoldingHeart, faShield, faLock,
  faCreditCard, faMobile, faGlobe,
  faCheckCircle, faArrowRight, faCopy, faUniversity
} from '@fortawesome/free-solid-svg-icons';
import { faPaypal, faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
import toast from 'react-hot-toast';

export default function DonatePage() {
  const t = useTranslations();
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [showBankInfo, setShowBankInfo] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];
  const finalAmount = customAmount ? Number(customAmount) : amount;

  const bankInfo = {
    bankName: 'United Bank for Africa (UBA)',
    accountName: 'AYSA Foundation',
    accountNumber: 'XXXXXXXXXX',
    swift: 'UNAFCMCX',
    country: 'Cameroun',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié !');
  };

  const handleDonate = () => {
    if (finalAmount < 1) {
      toast.error('Le montant minimum est de 1$');
      return;
    }

    if (selectedMethod === 'paypal') {
      window.open('https://www.paypal.com/donate/?hosted_button_id=AYSA_FOUNDATION_ID', '_blank');
    } else if (selectedMethod === 'bank') {
      setShowBankInfo(true);
    } else {
      // Message pour carte bancaire
      toast.success('Redirection vers le paiement sécurisé...');
    }
  };

  return (
    <div className="py-16 bg-stone-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FontAwesomeIcon icon={faHandHoldingHeart} className="text-4xl text-primary-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t('donate.title')}</h1>
            <p className="text-xl text-stone-600 max-w-lg mx-auto">{t('donate.subtitle')}</p>
          </div>

          {/* Donation Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            
            {/* Donation Type */}
            <div className="flex gap-3 mb-8 bg-stone-100 rounded-xl p-1.5">
              <button
                onClick={() => setDonationType('one-time')}
                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                  donationType === 'one-time'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                Don unique
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                  donationType === 'monthly'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                🌱 Don mensuel
              </button>
            </div>

            {/* Amount */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-4 text-stone-700">
                💰 Montant (USD)
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { setAmount(preset); setCustomAmount(''); }}
                    className={`py-4 rounded-xl font-bold text-lg transition-all border-2 ${
                      amount === preset && !customAmount
                        ? 'border-primary-500 bg-primary-50 text-primary-600 shadow-md'
                        : 'border-transparent bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-5 top-4 text-stone-400 text-lg font-bold">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                  className="input-field pl-10 py-4 text-lg font-bold"
                  placeholder="Montant personnalisé"
                  min="1"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-4 text-stone-700">
                🌍 Mode de paiement
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faGlobe} className="text-xl text-blue-500" />
                      <div>
                        <p className="font-bold text-sm">Carte bancaire (International)</p>
                        <p className="text-xs text-stone-400">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <FontAwesomeIcon icon={faCcVisa} className="text-lg text-stone-400" />
                      <FontAwesomeIcon icon={faCcMastercard} className="text-lg text-stone-400" />
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('paypal')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMethod === 'paypal'
                      ? 'border-blue-800 bg-blue-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faPaypal} className="text-xl text-blue-800" />
                      <div>
                        <p className="font-bold text-sm">PayPal</p>
                        <p className="text-xs text-stone-400">Paiement sécurisé PayPal</p>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('mobile')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMethod === 'mobile'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faMobile} className="text-xl text-orange-500" />
                      <div>
                        <p className="font-bold text-sm">Mobile Money (Afrique)</p>
                        <p className="text-xs text-stone-400">Orange Money, MTN, Moov</p>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setSelectedMethod('bank'); setShowBankInfo(true); }}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMethod === 'bank'
                      ? 'border-green-500 bg-green-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faUniversity} className="text-xl text-green-500" />
                      <div>
                        <p className="font-bold text-sm">Virement bancaire</p>
                        <p className="text-xs text-stone-400">Transfert direct sur notre compte</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Bank Info */}
            {showBankInfo && selectedMethod === 'bank' && (
              <motion.div 
                className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <h4 className="font-bold text-green-800 mb-3">Informations bancaires</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Banque', value: bankInfo.bankName },
                    { label: 'Compte', value: bankInfo.accountName },
                    { label: 'N° de compte', value: bankInfo.accountNumber },
                    { label: 'SWIFT', value: bankInfo.swift },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center bg-white rounded-lg p-2">
                      <span className="text-stone-500">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{item.value}</span>
                        <button onClick={() => copyToClipboard(item.value)} className="text-green-500 hover:text-green-700">
                          <FontAwesomeIcon icon={faCopy} className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Total */}
            {!showBankInfo && (
              <div className="bg-stone-50 rounded-xl p-5 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-stone-600 font-medium">Votre don</span>
                    {donationType === 'monthly' && (
                      <span className="text-xs text-primary-500 block mt-0.5">🌱 Don mensuel récurrent</span>
                    )}
                  </div>
                  <span className="text-3xl font-bold text-primary-600">${finalAmount} USD</span>
                </div>
              </div>
            )}

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-5 rounded-xl font-bold text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faHeart} className="animate-pulse" />
                {showBankInfo && selectedMethod === 'bank' ? "J'ai effectué le virement" : `${t('donate.donate_button')} - $${finalAmount}`}
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { icon: faLock, label: 'SSL', color: 'text-green-500' },
              { icon: faShield, label: 'Sécurisé', color: 'text-blue-500' },
              { icon: faGlobe, label: 'Mondial', color: 'text-primary-500' },
              { icon: faCheckCircle, label: 'Fiscal', color: 'text-purple-500' },
            ].map((badge, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm text-center">
                <FontAwesomeIcon icon={badge.icon} className={`text-lg ${badge.color} mb-1`} />
                <p className="text-xs text-stone-500 font-medium">{badge.label}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <p className="text-center text-sm text-stone-400">
            Des questions ?{' '}
            <a href="mailto:donations@aysafoundation.org" className="text-primary-500 hover:underline font-medium">
              donations@aysafoundation.org
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
