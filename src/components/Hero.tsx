import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Theme } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  theme: Theme;
}

export default function Hero({ theme }: HeroProps) {
  const [localTime, setLocalTime] = React.useState<string>('14:51:34');
  const { t } = useLanguage();

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to HH:MM:SS with high precision
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen py-24 md:py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorators */}
      <div className={`absolute inset-0 z-0 transition-all duration-500 ${
        theme === 'dark' ? 'dot-matrix-dark bg-brand-900' : 'dot-matrix-light bg-brand-50'
      }`}>
        {/* Subtle radial shading */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(18,20,22,0.15))] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8))]" />
      </div>

      {/* Floating Light Accents */}
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />

      {/* Hero Outer Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center text-center">
        
        {/* Trust Ratings Indicator - Matched precisely to Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-col sm:flex-row items-center gap-3"
        >
          {/* Overlapping Avatars */}
          <div className="flex -space-x-3">
            <img 
              className="w-10 h-10 rounded-full border-2 border-brand-50 dark:border-brand-900 object-cover" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=85&crop=faces" 
              alt="Brand manager"
              referrerPolicy="no-referrer"
            />
            <img 
              className="w-10 h-10 rounded-full border-2 border-brand-50 dark:border-brand-900 object-cover" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=85&crop=faces" 
              alt="CEO"
              referrerPolicy="no-referrer"
            />
            <img 
              className="w-10 h-10 rounded-full border-2 border-brand-50 dark:border-brand-900 object-cover" 
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=85&crop=faces" 
              alt="Founder"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Star Rating and Metrics */}
          <div className="flex flex-col items-center sm:items-start text-left">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 text-brand-primary">
                {/* 5 solid stars */}
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary">4.9</span>
            </div>
            <p className="text-[11px] font-sans text-brand-500 dark:text-brand-400 mt-0.5 font-medium tracking-tight">
              {t('hero.metrics')}
            </p>
          </div>
        </motion.div>

        {/* Display Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-semibold tracking-tight dark:text-white text-brand-900 leading-[1.08] max-w-5xl"
          >
            {t('hero.title.part1')} <br />
            {t('hero.title.part2')} <span className="font-serif italic font-normal text-brand-primary dark:text-brand-primary">{t('hero.title.serif')}</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-6 font-sans text-base sm:text-lg md:text-xl dark:text-brand-300 text-brand-600 max-w-2xl leading-relaxed font-light"
          >
            {t('hero.desc')}
          </motion.p>

          {/* Action Callouts */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4 items-center justify-center"
          >
            <a
              href="#cta"
              className="px-8 py-3.5 bg-brand-primary text-white rounded-lg font-sans text-sm font-semibold tracking-wide hover:brightness-110 active:scale-[0.98] transform transition-all shadow-lg shadow-brand-primary/15 flex items-center justify-center cursor-pointer"
            >
              {t('hero.btn.book')}
            </a>
            
            <a
              href="#pricing"
              className="px-8 py-3.5 border border-brand-primary/40 text-brand-primary bg-transparent rounded-lg font-sans text-sm font-semibold tracking-wide hover:bg-brand-primary/5 active:scale-[0.98] transform transition-all flex items-center justify-center cursor-pointer"
            >
              {t('hero.btn.pricing')}
            </a>
          </motion.div>

          {/* Status Hub Matrix Grid */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 sm:mt-24 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl"
          >
            {/* Cell 1: Local Clock */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              theme === 'dark' ? 'bg-brand-900/60 border-brand-800' : 'bg-white border-brand-200'
            }`}>
              <div className="text-xs font-mono text-brand-primary font-semibold uppercase tracking-wider mb-2">
                {t('hero.clock.title')}
              </div>
              <div className="font-display font-medium text-2xl dark:text-white text-brand-900 tracking-tight flex items-center gap-2">
                {localTime}
                <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-brand-100 dark:bg-brand-800 text-brand-600 dark:text-brand-300">
                  UTC
                </span>
              </div>
              <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">
                {t('hero.clock.desc')}
              </p>
            </div>

            {/* Cell 2: Quality standard */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              theme === 'dark' ? 'bg-brand-900/60 border-brand-800' : 'bg-white border-brand-200'
            }`}>
              <div className="text-xs font-mono text-brand-primary font-semibold uppercase tracking-wider mb-2">
                {t('hero.design.title')}
              </div>
              <div className="font-display font-medium text-2xl dark:text-white text-brand-900 tracking-tight flex items-center gap-1.5">
                {t('hero.design.value')}
                <CheckCircle2 className="w-5 h-5 text-green-500 inline" />
              </div>
              <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">
                {t('hero.design.desc')}
              </p>
            </div>

            {/* Cell 3: Clients Served */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              theme === 'dark' ? 'bg-brand-900/60 border-brand-800' : 'bg-white border-brand-200'
            }`}>
              <div className="text-xs font-mono text-brand-primary font-semibold uppercase tracking-wider mb-2">
                {t('hero.partners.title')}
              </div>
              <div className="font-display font-medium text-2xl dark:text-white text-brand-900 tracking-tight flex items-center gap-1.5">
                {t('hero.partners.value')}
                <Users className="w-5 h-5 text-blue-500 inline" />
              </div>
              <p className="mt-1 text-xs text-brand-500 dark:text-brand-400">
                {t('hero.partners.desc')}
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Modern Wave Divider or Visual Asset */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 select-none">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[30px] dark:fill-brand-900 fill-brand-50"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,276.4,45.06,485,30.72c189.67-13,351.1-61.15,538-23.77,71.3,14.24,140.9,10.37,177,0V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c180-32,312-81.1,504.17-45.2C1048.09,10.18,1124.7,11.3,1200,5.63V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
