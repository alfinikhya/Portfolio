import React from 'react';
import { Mail, ArrowUpRight, Github, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
}

export default function Footer({ theme }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [subEmail, setSubEmail] = React.useState('');
  const [subscribing, setSubscribing] = React.useState(false);
  const [subSuccess, setSubSuccess] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubSuccess(true);
      setSubEmail('');
    }, 1000);
  };

  return (
    <footer 
      className={`py-16 md:py-20 transition-colors duration-300 border-t ${
        theme === 'dark' 
          ? 'bg-brand-900 border-brand-850 text-white' 
          : 'bg-brand-50 border-brand-200 text-brand-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Core grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Col 1 Brand details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="max-w-sm">
              {/* Logo Branding */}
              <a href="#" className="flex items-center gap-2 group mb-6">
                <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-display font-bold text-lg select-none">
                  A
                </span>
                <span className="font-display font-bold text-lg tracking-tight dark:text-white text-brand-900">
                  AURA<span className="text-brand-primary">.DS</span>
                </span>
              </a>

              <p className="font-sans text-xs sm:text-sm dark:text-brand-400 text-brand-600 leading-relaxed mb-6 font-light">
                Handcrafting premium design systems, physical typography structures, and rapid corporate front-ends optimized for visionary companies worldwide.
              </p>
            </div>

            {/* Social handles */}
            <div className="flex gap-3">
              {[
                { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com' },
                { icon: <Instagram className="w-4 h-4" />, href: 'https://instagram.com' },
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com' },
                { icon: <Github className="w-4 h-4" />, href: 'https://github.com' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full dark:bg-brand-850 dark:hover:bg-brand-800 bg-white border border-brand-200 dark:border-brand-800 text-brand-400 hover:text-brand-primary dark:hover:text-white transition-all shadow-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-brand-400 uppercase mb-6">
              QUICK SECTIONS
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Studio', href: '#about' },
                { name: 'Our Services', href: '#services' },
                { name: 'Case Studies', href: '#portfolio' },
                { name: 'Testimonials', href: '#testimonials' },
                { name: 'Faq Inquiries', href: '#faq' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-sans font-light dark:text-brand-300 text-brand-700 hover:text-brand-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all text-brand-primary" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 Newsletter Subscription */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs font-semibold tracking-wider text-brand-400 uppercase mb-6">
              NEWSLETTER INBOX
            </h4>
            
            <p className="font-sans text-xs dark:text-brand-400 text-brand-600 leading-relaxed mb-6 font-light">
              Get raw, non-spam design essays, typography logs, and updates about open partnerships directly.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                required
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs outline-none focus:border-brand-primary transition-all text-brand-800 dark:text-white pr-12"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="absolute right-2.5 top-1.5 p-1.5 rounded-lg bg-brand-primary hover:brightness-110 active:scale-95 transition-all text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
              >
                {subscribing ? (
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20 border-t-white animate-spin" />
                ) : (
                  <Mail className="w-3.5 h-3.5" />
                )}
              </button>
            </form>

            {subSuccess && (
              <p className="text-[11px] font-mono text-green-500 font-medium mt-2 leading-none">
                ✓ Saved to the local subscribers database!
              </p>
            )}
          </div>

        </div>

        {/* Dynamic copyrights and terms banner */}
        <div className="pt-8 border-t dark:border-brand-800/80 border-brand-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-brand-450 dark:text-brand-400">
          <span>
            © {currentYear} Aura Design Studio Ltd. All rights reserved.
          </span>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-brand-primary transition-colors">Privacy Rules</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Client Agreements</a>
            <span className="flex items-center gap-1">
              Handcrafted with <Heart className="w-3 h-3 text-brand-primary fill-brand-primary inline" /> in Switzerland
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
