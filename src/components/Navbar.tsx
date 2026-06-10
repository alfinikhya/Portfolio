import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Settings, Menu, X, Globe } from 'lucide-react';
import { Theme } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onOpenCms: () => void;
  cmsCount: number;
  onNavigate: (href: string) => void;
}

export default function Navbar({ theme, setTheme, onOpenCms, cmsCount, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  const menuItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.testimonials'), href: '#testimonials' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.faq'), href: '#faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-colors duration-300 animate-slide-down">
      <div 
        id="navbar-container" 
        className={`max-w-7xl mx-auto rounded-full px-6 py-3 transition-all duration-300 flex items-center justify-between ${
          theme === 'dark' ? 'glass-effect-dark' : 'glass-effect-light'
        }`}
      >
        {/* Logo Branding - Matched to Screenshot */}
        <a 
          href="#" 
          onClick={(e) => handleLinkClick(e, '#')}
          className="flex items-center gap-1.5 group font-display"
        >
          <span className="text-2xl font-normal tracking-tight transition-colors duration-300 dark:text-white text-brand-900 group-hover:text-brand-primary select-none">
            lin<span className="font-extrabold text-brand-primary">ea</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, '#')}
            className="text-sm font-sans font-medium hover:text-brand-primary transition-colors duration-200 dark:text-brand-300 text-brand-700"
          >
            {t('nav.home')}
          </a>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-sm font-sans font-medium hover:text-brand-primary transition-colors duration-200 dark:text-brand-300 text-brand-700"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Utility Suite */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="px-3 py-1.5 rounded-full hover:bg-brand-100 dark:hover:bg-brand-800 transition-all duration-300 font-mono text-[10.5px] font-bold tracking-wider text-brand-700 dark:text-brand-300 flex items-center gap-1.5 cursor-pointer border dark:border-brand-800 border-brand-200 select-none shadow-sm active:scale-95"
            title={language === 'en' ? 'Ubah ke Bahasa Indonesia' : 'Switch to English'}
          >
            <Globe className="w-3 h-3 text-brand-primary animate-pulse" />
            <span className={language === 'en' ? 'text-brand-primary font-extrabold' : ''}>EN</span>
            <span className="text-brand-300 dark:text-brand-700">|</span>
            <span className={language === 'id' ? 'text-brand-primary font-extrabold' : ''}>ID</span>
          </button>

          {/* CMS Admin Button */}
          <button
            onClick={onOpenCms}
            className="relative px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide border transition-all duration-300 flex items-center gap-1.5 dark:border-brand-700 dark:hover:border-brand-primary dark:text-brand-300 dark:hover:text-brand-primary border-brand-200 hover:border-brand-primary text-brand-700 hover:text-brand-primary cursor-pointer"
            title="Open Portfolio CMS Admin"
          >
            <Settings className="w-3.5 h-3.5 animate-spin-slow" />
            <span className="hidden sm:inline">CMS Panel</span>
            <span className="inline-flex items-center justify-center bg-brand-primary text-white font-sans font-semibold rounded-full text-[10px] w-4.5 h-4.5">
              {cmsCount}
            </span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-brand-100 dark:hover:bg-brand-800 transition-all duration-300 cursor-pointer text-brand-700 dark:text-brand-350"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>



          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-full hover:bg-brand-100 dark:hover:bg-brand-800 transition-all duration-300 cursor-pointer text-brand-700 dark:text-brand-300"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`absolute top-20 left-4 right-4 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border md:hidden ${
              theme === 'dark' ? 'glass-effect-dark' : 'glass-effect-light'
            }`}
          >
            <div className="flex flex-col gap-4">
              <a
                href="#"
                onClick={(e) => {
                  setIsOpen(false);
                  handleLinkClick(e, '#');
                }}
                className="font-display font-medium text-lg leading-relaxed dark:text-brand-200 text-brand-800 hover:text-brand-primary transition-colors"
              >
                {t('nav.home')}
              </a>
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={item.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleLinkClick(e, item.href);
                  }}
                  className="font-display font-medium text-lg leading-relaxed dark:text-brand-200 text-brand-800 hover:text-brand-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <hr className="border-brand-200 dark:border-brand-850" />
              <div className="flex flex-col gap-3 py-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCms();
                  }}
                  className="w-full justify-center px-4 py-3 border border-brand-200 dark:border-brand-750 text-xs font-mono rounded-xl text-brand-800 dark:text-brand-200 hover:border-brand-primary flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" /> {t('nav.ownerStudio')} ({cmsCount} {t('nav.cmsItems')})
                </button>
                <a
                  href="#cta"
                  onClick={(e) => {
                    setIsOpen(false);
                    handleLinkClick(e, '#cta');
                  }}
                  className="w-full text-center px-4 py-3 bg-brand-primary text-white font-sans text-sm font-semibold rounded-xl"
                >
                  {t('hero.btn.book')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
