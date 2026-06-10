import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, Building, Star } from 'lucide-react';
import { TestimonialItem, Theme } from '../types';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  theme: Theme;
}

export default function Testimonials({ testimonials, theme }: TestimonialsProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 25 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    },
  };

  return (
    <section 
      id="testimonials" 
      className={`py-20 md:py-28 transition-colors duration-300 border-t ${
        theme === 'dark' 
          ? 'bg-brand-900 text-white border-brand-850' 
          : 'bg-white text-brand-900 border-brand-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Indicator */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4">
            04 / VERIFIED TRUST
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Words from our creative partners.
          </h2>
          <p className="font-sans text-sm dark:text-brand-400 text-brand-600 font-light max-w-lg mx-auto leading-relaxed">
            We operate as a deeply integrated branch of our clients' core engines. Here is what leading creative heads say about our speed.
          </p>
        </div>

        {/* Highlighted Review Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((test, index) => (
            <motion.div
              key={test.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between h-full relative group ${
                theme === 'dark' 
                  ? 'bg-brand-850 border-brand-800 hover:border-brand-primary/50 hover:bg-brand-800' 
                  : 'bg-brand-50 border-brand-150 hover:border-brand-primary/45 hover:bg-white hover:shadow-xl hover:shadow-brand-200/50'
              }`}
            >
              {/* Floating Quote Accent */}
              <Quote className="absolute top-6 right-8 w-12 h-12 text-brand-primary/10 group-hover:text-brand-primary/15 transition-colors pointer-events-none" />

              <div>
                {/* 5-Star Indicator */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-brand-primary text-brand-primary" />
                  ))}
                </div>

                <p className="font-sans text-sm sm:text-base dark:text-brand-300 text-brand-700 leading-relaxed mb-8 font-light italic">
                  "{test.testimonial}"
                </p>
              </div>

              {/* Client Info Bar */}
              <div className="flex items-center gap-4 pt-6 border-t dark:border-brand-800/80 border-brand-200/60 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-200 dark:bg-brand-800 border-2 border-white dark:border-brand-900 shadow-md">
                  <img
                    src={test.photo}
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // fallback representation if photo string is broken
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(test.name)}&background=ff5722&color=fff`;
                    }}
                  />
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm dark:text-white text-brand-900 leading-none mb-1">
                    {test.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-brand-500 dark:text-brand-400 font-mono">
                    <Building className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{test.position}, <strong className="font-mono font-semibold">{test.company}</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State when test array is purged */}
        {testimonials.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed dark:border-brand-800 border-brand-250 rounded-3xl">
            <p className="text-brand-500 font-mono text-sm leading-relaxed">No reviews registered in the CMS database.</p>
            <p className="text-xs text-brand-400 font-mono mt-1">Open the CMS panel above and click "Create Mock Entries" to replenish!</p>
          </div>
        )}

      </div>
    </section>
  );
}
