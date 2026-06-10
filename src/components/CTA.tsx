import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Calendar, Sparkles, Building2 } from 'lucide-react';
import { Theme } from '../types';

interface CTAProps {
  theme: Theme;
}

export default function CTA({ theme }: CTAProps) {
  // Booking inquiry form states
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    budget: '$5k - $10k',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    // Simulate real database saving timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '$5k - $10k',
        message: ''
      });
    }, 1500);
  };

  return (
    <section 
      id="cta" 
      className={`py-20 md:py-32 relative overflow-hidden transition-colors duration-300 border-t ${
        theme === 'dark' 
          ? 'bg-brand-900 text-white border-brand-850' 
          : 'bg-white text-brand-900 border-brand-100'
      }`}
    >
      {/* Background visual graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-primary/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Informational Column */}
          <div className="lg:col-span-5 max-w-xl">
            <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4">
              06 / WORK WITH US
            </span>
            
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Let's create something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-orange-400 to-amber-500">
                uncommonly beautiful.
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base dark:text-brand-300 text-brand-700 leading-relaxed font-light mb-8">
              Whether you are an ambitious technical startup aiming to trigger series-A funding round parameters, or an established luxury brand ready for modern WebGL guidelines, we have the systems to guide you.
            </p>

            {/* Quick Benefits List */}
            <div className="space-y-4">
              {[
                'Comprehensive high-fidelity design audit',
                'Fully integrated reactive Framer components',
                'Complete SEO optimization & Core Web Vitals checks',
                'Tailored analytics & metadata packaging ready'
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="font-sans text-xs sm:text-sm text-brand-500 dark:text-brand-300 font-light">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Booking Request Mockup Column */}
          <div className="lg:col-span-7">
            <motion.div 
              whileHover={{ y: -2 }}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative ${
                theme === 'dark' 
                  ? 'bg-brand-850 border-brand-800' 
                  : 'bg-brand-50 border-brand-150'
              }`}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-brand-800/80 border-brand-200">
                <div>
                  <h3 className="font-display font-semibold text-lg">Send Dynamic Proposal</h3>
                  <p className="text-[11px] font-mono text-brand-400">RECIEVES RESPONSE IN WITH 12 HOURS</p>
                </div>
                <div className="p-2.5 rounded-full dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-100 flex items-center justify-center text-brand-primary">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 text-green-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl mb-2">Proposal Transmited!</h4>
                  <p className="font-sans text-sm dark:text-brand-400 text-brand-600 max-w-sm leading-relaxed mb-6 font-light">
                    Your agency inquiry was saved successfully. Our lead designer will ping your inbox shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2.5 border border-brand-primary rounded-full text-brand-primary font-mono text-xs font-semibold hover:bg-brand-primary hover:text-white transition-all cursor-pointer"
                  >
                    Send Another Proposal
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold tracking-wider text-brand-400 block uppercase">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary transition-all text-brand-800 dark:text-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold tracking-wider text-brand-400 block uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. john@yourcompany.com"
                        className="w-full px-4 py-3 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary transition-all text-brand-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold tracking-wider text-brand-400 block uppercase">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-4 py-3 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary transition-all text-brand-800 dark:text-white"
                      />
                    </div>

                    {/* Budget Tier selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-semibold tracking-wider text-brand-400 block uppercase">
                        Estimated Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-[13px] rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary transition-all text-brand-800 dark:text-white appearance-none cursor-pointer"
                      >
                        <option value="$5k - $10k">$5,000 – $10,000</option>
                        <option value="$10k - $25k">$10,000 – $25,000</option>
                        <option value="$25k - $50k">$25,000 – $50,000</option>
                        <option value="$50k+">$50,000+ Unlimited</option>
                      </select>
                    </div>
                  </div>

                  {/* Message details */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-semibold tracking-wider text-brand-400 block uppercase">
                      Brief Message
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Outline core project components, timing, or high-fidelity preferences..."
                      className="w-full px-4 py-3 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary transition-all resize-none text-brand-800 dark:text-white"
                    />
                  </div>

                  {/* Sumbit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-brand-primary text-white rounded-xl font-sans text-xs font-semibold tracking-wider uppercase hover:brightness-110 active:scale-[0.99] transform transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4.5 h-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Transmitting Database Parameters...
                      </>
                    ) : (
                      <>
                        Request Studio Call
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
