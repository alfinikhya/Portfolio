import React from 'react';
import { CLIENTS_MARQUEE } from '../data/mockData';
import { Theme } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MarqueeProps {
  theme: Theme;
}

export default function Marquee({ theme }: MarqueeProps) {
  const { t } = useLanguage();
  // Triple the marquee items to ensure the visual queue is full on massive monitors
  const tripledClients = [...CLIENTS_MARQUEE, ...CLIENTS_MARQUEE, ...CLIENTS_MARQUEE];

  return (
    <section 
      id="marquee"
      className={`py-8 select-none overflow-hidden border-y transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-brand-900 border-brand-850' 
          : 'bg-white border-brand-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-between">
        <span className="text-[11px] font-mono font-medium tracking-widest text-brand-400 uppercase">
          {t('marquee.title')}
        </span>
        <span className="text-[10px] font-mono text-brand-primary font-medium uppercase px-2 py-0.5 rounded border border-brand-primary/20">
          GLOBAL REACH
        </span>
      </div>

      <div className="relative flex items-center w-full overflow-hidden">
        {/* Left Gradient Shadow */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 md:w-44 z-10 pointer-events-none bg-gradient-to-r ${
          theme === 'dark' ? 'from-brand-900 to-transparent' : 'from-white to-transparent'
        }`} />

        {/* Floating slider wrapper */}
        <div className="flex whitespace-nowrap animate-marquee-left">
          {tripledClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex items-center mx-10 md:mx-16 font-display font-semibold tracking-widest text-sm sm:text-base md:text-lg transition-colors cursor-default"
            >
              {/* Bullet divider */}
              <span className="inline-block w-2 h-2 rounded-full bg-brand-primary mr-3 opacity-80" />
              <span className="dark:text-brand-400 dark:hover:text-white text-brand-600 hover:text-brand-900 duration-200">
                {client.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Gradient Shadow */}
        <div className={`absolute right-0 top-0 bottom-0 w-16 md:w-44 z-10 pointer-events-none bg-gradient-to-l ${
          theme === 'dark' ? 'from-brand-900 to-transparent' : 'from-white to-transparent'
        }`} />
      </div>
    </section>
  );
}
