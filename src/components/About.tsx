import React from 'react';
import { motion } from 'motion/react';
import { Target, Award, Layers, Cpu, Compass, Briefcase, Sparkles, Terminal, User, Palette } from 'lucide-react';
import { Theme, WorkExperience, DesignerProfile } from '../types';
import { useLanguage, experienceTranslations } from '../context/LanguageContext';

interface AboutProps {
  theme: Theme;
  experiences: WorkExperience[];
  profile: DesignerProfile;
}

const getIconComponent = (name: string) => {
  switch (name) {
    case 'Cpu': return <Cpu className="w-5 h-5 text-brand-primary" />;
    case 'Compass': return <Compass className="w-5 h-5 text-blue-500 animate-spin-slow" />;
    case 'Target': return <Target className="w-5 h-5 text-red-500" />;
    case 'Layers': return <Layers className="w-5 h-5 text-purple-500" />;
    case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-500" />;
    case 'Award': return <Award className="w-5 h-5 text-yellow-500" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500 font-bold" />;
    case 'Terminal': return <Terminal className="w-5 h-5 text-indigo-500" />;
    default: return <Briefcase className="w-5 h-5 text-brand-primary" />;
  }
};

export default function About({ theme, experiences, profile }: AboutProps) {
  const { language, t } = useLanguage();

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const getTranslatedValue = (id: string, field: 'company' | 'role' | 'duration' | 'description', fallback: string) => {
    const group = (experienceTranslations as any)[language];
    if (group && group[`${id}.${field}`]) {
      return group[`${id}.${field}`];
    }
    return fallback;
  };

  return (
    <section 
      id="about" 
      className={`py-20 md:py-28 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-brand-900 text-white' : 'bg-brand-50 text-brand-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Indicator */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scrollRevealVariants}
          className="mb-12 max-w-2xl"
        >
          <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4">
            {language === 'en' ? '01 / CREATIVE PROFILE' : '01 / PROFIL KREATIF'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {language === 'en' ? 'Refining brand stories with geometric precision.' : 'Penyempurnaan kisah merek dengan presisi geometris.'}
          </h2>
          <div className="h-0.5 w-12 bg-brand-primary" />
        </motion.div>

        {/* Bento Grid Layout - Graphic Designer Core Profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Card: Profile Biography (Colspan 1 or 2 depending on layout - let's make it colspace 1 to match a perfect 3-column grid) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`rounded-3xl border p-8 flex flex-col justify-between gap-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-brand-800/40 border-brand-800 hover:border-brand-700/70' 
                : 'bg-white border-brand-200 hover:border-[#8E9A9B]/40 hover:shadow-lg hover:shadow-brand-100'
            }`}
          >
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border dark:border-brand-700 border-brand-200 shrink-0">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base leading-tight">
                    {profile.name}
                  </h4>
                  <p className="text-xs font-mono font-medium text-brand-primary mt-1">
                    {profile.role}
                  </p>
                </div>
              </div>
              
              <p className="font-sans text-sm dark:text-brand-300 text-brand-700 leading-relaxed font-light">
                {profile.bio}
              </p>

              {/* Skills tags */}
              {profile.skills && profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-5">
                  {profile.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md dark:bg-brand-900/60 bg-brand-100 dark:text-brand-300 text-brand-600"
                    >
                      #{skill.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="text-[10px] font-mono font-semibold tracking-wider text-brand-400 border-t dark:border-brand-800 border-brand-100 pt-4 mt-auto uppercase">
              {language === 'en' ? 'CREATIVE DIRECTOR & DESIGNER' : 'DIREKTUR KREATIF & DESAINER'}
            </div>
          </motion.div>

          {/* Card 2: Vanguard Philosophy (Tailored to graphic design philosophy requested in screen) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`rounded-3xl border p-8 flex flex-col justify-between gap-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-brand-800/40 border-brand-800 hover:border-brand-700/70' 
                : 'bg-white border-brand-200 hover:border-[#8E9A9B]/40 hover:shadow-lg hover:shadow-brand-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-brand-400">
                  {profile.vanguardTitle}
                </h4>
                <div className="p-2 rounded-full dark:bg-brand-900 bg-brand-50 border dark:border-brand-800 border-brand-100 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-blue-500 animate-spin-slow" />
                </div>
              </div>
              
              <p className="font-sans text-sm sm:text-base dark:text-brand-300 text-brand-700 leading-relaxed font-light">
                {profile.vanguardText}
              </p>
            </div>

            <div className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-brand-primary border-t dark:border-brand-800 border-brand-100 pt-4 mt-auto uppercase">
              {profile.vanguardFooter}
            </div>
          </motion.div>

          {/* Card 3: Creative Mastery & Tools (Adobe + Figma customized) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0, scale: 0.97, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`rounded-3xl border p-8 flex flex-col justify-between gap-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-brand-800/40 border-brand-800 hover:border-brand-700/70' 
                : 'bg-white border-brand-200 hover:border-[#8E9A9B]/40 hover:shadow-lg hover:shadow-brand-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-brand-400">
                  {profile.engTitle}
                </h4>
                <div className="p-2 rounded-full dark:bg-brand-900 bg-brand-50 border dark:border-brand-800 border-brand-100 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-brand-primary" />
                </div>
              </div>
              
              <p className="font-sans text-sm sm:text-base dark:text-brand-300 text-brand-700 leading-relaxed font-light">
                {profile.engText}
              </p>
            </div>

            <div className="text-[10px] sm:text-xs font-mono font-medium tracking-widest text-brand-primary border-t dark:border-brand-800 border-brand-100 pt-4 mt-auto uppercase">
              {profile.engFooter}
            </div>
          </motion.div>

        </div>

        {/* Software Skill Bars Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0, y: 25 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1]
              } 
            }
          }}
          className={`mt-6 rounded-3xl border p-8 transition-colors duration-300 ${
            theme === 'dark' 
              ? 'bg-brand-800/40 border-brand-800/80' 
              : 'bg-white border-brand-200 hover:shadow-lg'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block mb-1">
                {language === 'en' ? '01.1 / TECHNICAL SOFTWARE EXCELLENCE' : '01.1 / KEMAMPUAN PERANGKAT LUNAK UTAMA'}
              </span>
              <h3 className="font-display text-base font-bold tracking-wider uppercase text-brand-900 dark:text-white">
                {language === 'en' ? 'Core Creative Interface Command' : 'Penguasaan Antarmuka Kreatif Utama'}
              </h3>
            </div>
            <p className="text-[11px] font-mono dark:text-brand-400 text-brand-600 max-w-sm leading-relaxed md:text-right">
              {language === 'en' 
                ? 'Rigorously calibrated production-level speeds across industry standard branding suite.' 
                : 'Kecepatan tingkat produksi yang dikalibrasi secara ketat di seluruh rangkaian standar industri.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(profile.softwareSkills && profile.softwareSkills.length > 0 ? profile.softwareSkills : [
              { name: 'Adobe Illustrator', level: 95, color: '#FF9A00', short: 'Ai' },
              { name: 'Adobe Photoshop', level: 90, color: '#31A8FF', short: 'Ps' },
              { name: 'Canva', level: 85, color: '#00C4CC', short: 'Cv' },
              { name: 'Adobe After Effects', level: 80, short: 'Ae', color: '#D291FF' },
            ]).map((skill, index) => (
              <div 
                key={skill.name}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-brand-900/40 border-brand-800 hover:border-brand-750' 
                    : 'bg-brand-50 border-brand-100 hover:border-[#8E9A9B]/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-extrabold text-[11px] border shadow-sm shrink-0 uppercase"
                      style={{ 
                        backgroundColor: `${skill.color}1a`, 
                        color: skill.color, 
                        borderColor: `${skill.color}33` 
                      }}
                    >
                      {skill.short}
                    </div>
                    <span className="font-display font-medium text-xs tracking-tight text-brand-900 dark:text-white">{skill.name}</span>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-brand-primary">{skill.level}%</span>
                </div>

                {/* Elegantly minimal progress track */}
                <div className="w-full h-1 bg-brand-200/40 dark:bg-brand-800 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Experience Timeline Section (Under designer profile) */}
        {experiences && experiences.length > 0 && (
          <div className="mt-20 md:mt-24 pt-16 border-t dark:border-brand-800 border-brand-200/60">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollRevealVariants}
              className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block mb-2">
                  {language === 'en' ? '01.2 / EXPERIENCE HISTORY' : '01.2 / RIWAYAT PENGALAMAN'}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                  {language === 'en' ? 'Professional tenure and career milestones' : 'Masa jabatan profesional dan tonggak karir'}
                </h3>
              </div>

              <button
                onClick={() => {
                  if ((window as any).openCmsTab) {
                    (window as any).openCmsTab('experiences');
                  }
                }}
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-xl font-sans text-xs font-semibold transform active:scale-95 transition-all flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer shadow-sm shadow-brand-primary/15"
                title={language === 'en' ? 'Add or Edit Work Experience' : 'Tambah atau Ubah Pengalaman Kerja'}
              >
                <span>💼 {language === 'en' ? 'Customize Experiences (Owner Only)' : 'Kustomisasi Pengalaman (Khusus Pemilik)'}</span>
              </button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {experiences.map((item, index) => {
                const company = getTranslatedValue(item.id, 'company', item.company);
                const role = getTranslatedValue(item.id, 'role', item.role);
                const duration = getTranslatedValue(item.id, 'duration', item.duration);
                const description = getTranslatedValue(item.id, 'description', item.description);

                return (
                  <motion.div
                    key={item.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.08 } }
                    }}
                    className={`rounded-2xl border p-6 flex flex-col justify-between gap-5 transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-brand-850/50 border-brand-800 hover:bg-brand-850' 
                        : 'bg-white border-brand-150 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-bold dark:text-brand-400 text-brand-500 uppercase tracking-widest">
                          {company}
                        </span>
                        <div className="p-1.5 rounded-full dark:bg-brand-900 bg-brand-50 border dark:border-brand-800 border-brand-150">
                          {getIconComponent(item.iconName)}
                        </div>
                      </div>
                      <h5 className="font-display font-semibold text-xs sm:text-sm mb-2">{role}</h5>
                      <p className="font-sans text-xs dark:text-brand-300 text-brand-600 leading-relaxed font-light">
                        {description}
                      </p>
                    </div>
                    
                    <div className="text-[9px] font-mono font-semibold tracking-wider text-brand-400 border-t dark:border-brand-800 border-brand-100 pt-3 mt-auto">
                      {duration}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Highlight Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scrollRevealVariants}
          className={`mt-14 p-8 md:p-10 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
            theme === 'dark' ? 'bg-brand-800/20 border-brand-800' : 'bg-white border-brand-200'
          }`}
        >
          <div>
            <h3 className="font-display font-semibold text-lg dark:text-white text-brand-900 mb-2">
              {language === 'en' ? 'Interested in specifying my professional parameters in real-time?' : 'Tertarik menentukan parameter profesional saya secara real-time?'}
            </h3>
            <p className="text-sm dark:text-brand-400 text-brand-600 max-w-xl">
              {language === 'en' 
                ? 'Launch the Live CMS Customized controller from the navigation bar to update my biography, avatar photo, creative principles, and career milestones instantly.' 
                : 'Luncurkan pengontrol CMS Kustom langsung dari bilah navigasi untuk memperbarui biografi, foto avatar, filosofi kreatif, dan tonggak karir saya secara instan.'}
            </p>
          </div>
          <button
            onClick={() => {
              const cmsBtn = document.querySelector('[title="Open Portfolio CMS Admin"]') as HTMLButtonElement;
              if (cmsBtn) cmsBtn.click();
            }}
            className="px-6 py-3 bg-brand-900 dark:bg-brand-100 dark:text-brand-900 text-white rounded-full font-sans text-xs font-semibold hover:opacity-90 transform active:scale-95 transition-all text-center w-full md:w-auto cursor-pointer"
          >
            {language === 'en' ? 'Launch Live Profile CMS' : 'Luncurkan CMS Profil Langsung'}
          </button>
        </motion.div>

      </div>
    </section>
  );
}
