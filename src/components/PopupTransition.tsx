import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PopupTransitionProps {
  triggerRef: React.MutableRefObject<((targetId: string) => void) | null>;
  theme: 'dark' | 'light';
}

export default function PopupTransition({ triggerRef, theme }: PopupTransitionProps) {
  const [isActive, setIsActive] = React.useState(false);
  const [progressVal, setProgressVal] = React.useState(0);

  React.useEffect(() => {
    // Expose the trigger action
    triggerRef.current = (targetId: string) => {
      document.body.style.overflow = 'hidden';
      setIsActive(true);
      setProgressVal(0);

      // Animate the simulated progress value
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 100) {
          setProgressVal(100);
          clearInterval(interval);
          
          // Under the cover, change the scroll position instantly
          const element = targetId === '#' || targetId === '' ? document.body : document.querySelector(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'auto' });
          }

          // Delay for high-end cinematic hold, then fade/implode popup
          setTimeout(() => {
            setIsActive(false);
            document.body.style.overflow = '';
          }, 350);
        } else {
          setProgressVal(currentProgress);
        }
      }, 40);
    };

    return () => {
      triggerRef.current = null;
    };
  }, [triggerRef]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-[110] w-full h-full flex items-center justify-center bg-black/65 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.65, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 1.15, opacity: 0, filter: 'blur(10px)' }}
            transition={{ 
              initial: { type: 'spring', damping: 20, stiffness: 220 },
              exit: { duration: 0.35, ease: 'easeIn' }
            }}
            className={`w-[90%] max-w-sm rounded-[32px] p-8 border shadow-2xl flex flex-col items-center justify-center text-center transition-all ${
              theme === 'dark' 
                ? 'glass-effect-dark border-brand-800' 
                : 'glass-effect-light border-brand-200'
            }`}
            style={{ perspective: 1000 }}
          >
            {/* Animated Brand Symbol */}
            <div className="relative mb-5 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg shadow-brand-primary/20">
                A
              </span>
              <div className="absolute -inset-2 rounded-full border border-dashed border-brand-primary/40 animate-spin-slow" />
            </div>

            <h3 className="font-display font-extrabold text-2xl tracking-tight dark:text-white text-brand-900 leading-tight">
              AURA<span className="text-brand-primary">.DS</span>
            </h3>
            
            <p className="mt-2 font-mono text-[9px] tracking-widest uppercase dark:text-brand-400 text-brand-600">
              Syncing Experience Parameters
            </p>

            {/* Simulated loading bar wrapper */}
            <div className="w-36 h-[2.5px] bg-brand-primary/10 rounded-full mt-6 overflow-hidden relative">
              <motion.div 
                className="h-full bg-brand-primary rounded-full absolute left-0 top-0 bottom-0"
                style={{ width: `${progressVal}%` }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
