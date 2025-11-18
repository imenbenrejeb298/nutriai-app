import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Subscription({ onUpgrade }) {
  const { t, i18n } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  // Déterminer la devise en fonction de la langue
  const getCurrency = () => {
    switch (i18n.language) {
      case 'fr':
        return { symbol: '€', code: 'EUR' };
      case 'es':
        return { symbol: '€', code: 'EUR' };
      case 'ar':
        return { symbol: '$', code: 'USD' }; // Pour le moment, USD pour le monde arabe
      default:
        return { symbol: '$', code: 'USD' };
    }
  };

  const currency = getCurrency();

  // Plans de souscription avec prix adaptés par région
  const plans = {
    free: {
      name: t('plan_free'),
      price: t('price_free'),
      period: '',
      features: [
        t('feature_basic_tracking'),
        t('feature_5_recipes'),
        t('feature_basic_challenges'),
        t('feature_community_support')
      ],
      limited: true
    },
    monthly: {
      name: t('plan_premium'),
      price: currency.code === 'EUR' ? '9.99' : '9.99',
      period: t('per_month'),
      features: [
        t('feature_unlimited_tracking'),
        t('feature_unlimited_recipes'),
        t('feature_all_challenges'),
        t('feature_personal_coach'),
        t('feature_advanced_analytics'),
        t('feature_priority_support')
      ],
      limited: false
    },
    yearly: {
      name: t('plan_premium_yearly'),
      price: currency.code === 'EUR' ? '99.99' : '99.99',
      period: t('per_year'),
      features: [
        t('feature_unlimited_tracking'),
        t('feature_unlimited_recipes'),
        t('feature_all_challenges'),
        t('feature_personal_coach'),
        t('feature_advanced_analytics'),
        t('feature_priority_support'),
        t('feature_2_months_free')
      ],
      limited: false
    }
  };

  const handlePaymentSuccess = (plan) => {
    setIsProcessing(false);
    // Appeler la fonction de mise à niveau
    onUpgrade && onUpgrade(plan);
    // Afficher un message de succès
    alert(t('payment_success'));
  };

  const handlePaymentError = (error) => {
    setIsProcessing(false);
    console.error('Payment error:', error);
    alert(t('payment_error'));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('subscription_title')}</h1>
        <p className="text-lg text-gray-600">{t('subscription_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Plan Gratuit */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{plans.free.name}</h2>
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">{plans.free.price}</span>
          </div>
          <ul className="space-y-3 mb-8">
            {plans.free.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            disabled
            className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
          >
            {t('current_plan')}
          </button>
        </div>

        {/* Plan Mensuel */}
        <div className="border-2 border-emerald-500 rounded-2xl p-6 bg-white relative">
          {selectedPlan === 'monthly' && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full">
              {t('popular')}
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 mb-2">{plans.monthly.name}</h2>
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">{currency.symbol}{plans.monthly.price}</span>
            <span className="text-gray-600">/{plans.monthly.period}</span>
          </div>
          <ul className="space-y-3 mb-8">
            {plans.monthly.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          
          <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "test" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: plans.monthly.price,
                        currency_code: currency.code
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess('monthly');
                });
              }}
              onError={(err) => {
                handlePaymentError(err);
              }}
            />
          </PayPalScriptProvider>
        </div>

        {/* Plan Annuel */}
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{plans.yearly.name}</h2>
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">{currency.symbol}{plans.yearly.price}</span>
            <span className="text-gray-600">/{plans.yearly.period}</span>
          </div>
          <ul className="space-y-3 mb-8">
            {plans.yearly.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
          
          <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "test" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: plans.yearly.price,
                        currency_code: currency.code
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePaymentSuccess('yearly');
                });
              }}
              onError={(err) => {
                handlePaymentError(err);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('why_upgrade')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('secure_payments')}</h3>
            <p className="text-gray-600">{t('secure_payments_desc')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('cancel_anytime')}</h3>
            <p className="text-gray-600">{t('cancel_anytime_desc')}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{t('instant_access')}</h3>
            <p className="text-gray-600">{t('instant_access_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;