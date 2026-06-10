import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { Theme } from '../types';

interface FAQProps {
  theme: Theme;
}

export default function FAQ({ theme }: FAQProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className={`py-20 md:py-28 transition-colors duration-300 border-t ${
        theme === 'dark' 
          ? 'bg-brand-900 text-white border-brand-850' 
          : 'bg-brand-50 text-brand-900 border-brand-200'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4">
            05 / FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Resolving clarity & inquiries.
          </h2>
          <p className="font-sans text-sm dark:text-brand-400 text-brand-600 font-light max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our high-to-low fidelity workflow pipeline, fees, and operational capabilities.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? theme === 'dark'
                      ? 'bg-brand-850 border-brand-primary/40'
                      : 'bg-white border-brand-primary/30 shadow-md shadow-brand-1050/10'
                    : theme === 'dark'
                      ? 'bg-brand-850/45 border-brand-800 hover:border-brand-700'
                      : 'bg-white border-brand-150 hover:border-brand-250'
                }`}
              >
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                >
                  <div className="flex gap-4 items-center pr-4">
                    <HelpCircle className={`w-4.5 h-4.5 shrink-0 ${isOpen ? 'text-brand-primary' : 'text-brand-400'}`} />
                    <span className="font-display font-semibold text-sm sm:text-base dark:text-white text-brand-900">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Chevron Toggle */}
                  <div className={`p-1.5 rounded-full ${
                    isOpen 
                      ? 'bg-brand-primary text-white' 
                      : 'dark:bg-brand-900 bg-brand-100 text-brand-500'
                  } transition-colors duration-200`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated Inner Drawer (AnimatePresence height transition) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm dark:text-brand-300 text-brand-700 font-sans font-light leading-relaxed border-t dark:border-brand-800/80 border-brand-100 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className={`mt-12 p-6 rounded-2xl border text-center text-xs font-mono font-medium ${
          theme === 'dark' ? 'bg-brand-850/30 border-brand-800' : 'bg-transparent border-dashed border-brand-250'
        }`}>
          <span>Got more technical inquiries? Reach out directly via </span>
          <a href="mailto:aalfin028@gmail.com" className="text-brand-primary underline hover:opacity-85 font-semibold">
            aalfin028@gmail.com
          </a>
        </div>

      </div>
    </section>
  );
}
