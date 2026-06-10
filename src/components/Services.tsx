import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Fingerprint, Orbit, Smartphone, ArrowRight, CheckCircle } from 'lucide-react';
import { INITIAL_SERVICES } from '../data/mockData';
import { Theme } from '../types';
import { useLanguage, serviceTranslations } from '../context/LanguageContext';

interface ServicesProps {
  theme: Theme;
}

// Simple Helper to return correct Lucide icon
function getServiceIcon(iconName: string) {
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-brand-primary" />;
    case 'Fingerprint':
      return <Fingerprint className="w-5 h-5 text-indigo-500" />;
    case 'Orbit':
      return <Orbit className="w-5 h-5 text-amber-500 animate-spin-slow" />;
    case 'Smartphone':
      return <Smartphone className="w-5 h-5 text-rose-500" />;
    default:
      return <Sparkles className="w-5 h-5 text-brand-primary" />;
  }
}

export default function Services({ theme }: ServicesProps) {
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section 
      id="services" 
      className={`py-20 md:py-28 transition-colors duration-300 border-t ${
        theme === 'dark' 
          ? 'bg-brand-900 text-white border-brand-850' 
          : 'bg-white text-brand-900 border-brand-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4">
              {t('services.indicator')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {t('services.heading')}
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm sm:text-base dark:text-brand-400 text-brand-600 font-light leading-relaxed">
            {t('services.desc')}
          </p>
        </div>

        {/* Services List / Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {INITIAL_SERVICES.map((service) => {
            // Get translation lookup fallback
            const translatedTitle = (serviceTranslations[language] as any)?.[`${service.id}.title`] || service.title;
            const translatedDesc = (serviceTranslations[language] as any)?.[`${service.id}.description`] || service.description;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ scale: 1.01, y: -4 }}
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between h-full group ${
                  theme === 'dark' 
                    ? 'bg-brand-850 border-brand-800 hover:border-brand-primary/50 hover:bg-brand-800/50' 
                    : 'bg-brand-50 border-brand-150 hover:border-brand-primary/45 hover:bg-brand-100/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-2xl dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 flex items-center justify-center">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-medium text-brand-400 tracking-wider">
                      {service.id.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl mb-4 group-hover:text-brand-primary transition-colors">
                    {translatedTitle}
                  </h3>
                  
                  <p className="font-sans text-sm dark:text-brand-300 text-brand-700 leading-relaxed mb-6 font-light">
                    {translatedDesc}
                  </p>
                </div>

                <div>
                  {/* Embedded tags list */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t dark:border-brand-800/80 border-brand-200">
                    {service.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full dark:bg-brand-900 bg-white border dark:border-brand-800/60 border-brand-250 text-brand-500 dark:text-brand-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process Steps */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4">
              {t('services.process.indicator')}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {t('services.process.heading')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: t('services.step1.title'), text: t('services.step1.text') },
              { num: '02', title: t('services.step2.title'), text: t('services.step2.text') },
              { num: '03', title: t('services.step3.title'), text: t('services.step3.text') },
              { num: '04', title: t('services.step4.title'), text: t('services.step4.text') }
            ].map((step, idx) => (
              <div 
                key={step.num}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark' ? 'bg-brand-850/50 border-brand-800' : 'bg-brand-50 border-brand-150'
                }`}
              >
                <div className="text-2xl font-display font-extrabold text-brand-primary mb-4">
                  {step.num}
                </div>
                <h4 className="font-display font-semibold text-base mb-2">
                  {step.title}
                </h4>
                <p className="font-sans text-xs dark:text-brand-400 text-brand-600 leading-relaxed font-light">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
