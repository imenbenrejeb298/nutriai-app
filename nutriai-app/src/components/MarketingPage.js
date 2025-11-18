import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Utensils, TrendingUp, Users, Star, CheckCircle, Globe } from 'lucide-react';

function MarketingPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t('feature_ai_nutrition'),
      description: t('feature_ai_nutrition_desc')
    },
    {
      icon: Utensils,
      title: t('feature_personalized_recipes'),
      description: t('feature_personalized_recipes_desc')
    },
    {
      icon: TrendingUp,
      title: t('feature_progress_tracking'),
      description: t('feature_progress_tracking_desc')
    },
    {
      icon: Users,
      title: t('feature_expert_support'),
      description: t('feature_expert_support_desc')
    },
    {
      icon: Globe,
      title: t('feature_worldwide_access'),
      description: t('feature_worldwide_access_desc')
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: t('testimonial_role_1'),
      content: t('testimonial_1'),
      rating: 5,
      country: "🇫🇷"
    },
    {
      name: "Jean Martin",
      role: t('testimonial_role_2'),
      content: t('testimonial_2'),
      rating: 5,
      country: "🇫🇷"
    },
    {
      name: "Sophie Laurent",
      role: t('testimonial_role_3'),
      content: t('testimonial_3'),
      rating: 5,
      country: "🇫🇷"
    },
    {
      name: "John Smith",
      role: t('testimonial_role_4'),
      content: t('testimonial_4'),
      rating: 5,
      country: "🇺🇸"
    },
    {
      name: "Maria Garcia",
      role: t('testimonial_role_5'),
      content: t('testimonial_5'),
      rating: 5,
      country: "🇪🇸"
    },
    {
      name: "Ahmed Hassan",
      role: t('testimonial_role_6'),
      content: t('testimonial_6'),
      rating: 5,
      country: "🇸🇦"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">{t('hero_title_1')}</span>
                  <span className="block text-emerald-200">{t('hero_title_2')}</span>
                </h1>
                <p className="mt-3 text-base text-emerald-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {t('hero_subtitle')}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      {t('get_started')}
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                    >
                      {t('live_demo')}
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            alt="Healthy food"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">{t('features')}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('features_title')}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t('features_subtitle')}
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">{t('testimonials')}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t('testimonials_title')}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t('testimonials_subtitle')}
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-2xl">{testimonial.country}</span>
                  </div>
                  <blockquote className="mt-4">
                    <p className="text-lg text-gray-600">"{testimonial.content}"</p>
                  </blockquote>
                  <div className="mt-6 flex items-center">
                    <div className="ml-4">
                      <div className="text-base font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-base text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">{t('cta_title')}</span>
            <span className="block text-emerald-200">{t('cta_subtitle')}</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50"
              >
                {t('get_started')}
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 bg-opacity-60 hover:bg-opacity-70"
              >
                {t('learn_more')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingPage;