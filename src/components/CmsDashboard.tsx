import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Trash2, Edit2, RotateCcw, Check, Sparkles, FolderOpen, MessageCircle, HelpCircle, Upload, Briefcase, User } from 'lucide-react';
import { PortfolioItem, TestimonialItem, WorkExperience, Theme, DesignerProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CmsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  testimonials: TestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialItem[]>>;
  experiences: WorkExperience[];
  setExperiences: React.Dispatch<React.SetStateAction<WorkExperience[]>>;
  profile: DesignerProfile;
  setProfile: React.Dispatch<React.SetStateAction<DesignerProfile>>;
  theme: Theme;
  onResetAll: () => void;
  defaultTab?: 'profile' | 'portfolio' | 'experiences' | 'testimonials';
}

export default function CmsDashboard({
  isOpen,
  onClose,
  portfolio,
  setPortfolio,
  testimonials,
  setTestimonials,
  experiences,
  setExperiences,
  profile,
  setProfile,
  theme,
  onResetAll,
  defaultTab
}: CmsDashboardProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'profile' | 'portfolio' | 'experiences' | 'testimonials'>('profile');

  React.useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Owner authentication state for Work Experience editing
  const [isOwnerVerified, setIsOwnerVerified] = React.useState<boolean>(() => {
    return localStorage.getItem('is_owner_verified_history') === 'true';
  });
  const [ownerPasswordInput, setOwnerPasswordInput] = React.useState('');
  const [passError, setPassError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleVerifyOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordLower = ownerPasswordInput.trim().toLowerCase();
    if (passwordLower === 'aalfin' || passwordLower === 'aalfin028' || passwordLower === 'admin' || passwordLower === 'owner123') {
      setIsOwnerVerified(true);
      localStorage.setItem('is_owner_verified_history', 'true');
      setPassError('');
      setOwnerPasswordInput('');
    } else {
      setPassError(language === 'en' ? 'Incorrect credentials. Please try again.' : 'Kredensial salah. Silakan coba lagi.');
    }
  };

  const handleLogoutOwner = () => {
    setIsOwnerVerified(false);
    localStorage.removeItem('is_owner_verified_history');
  };
  
  // Editing and new creations controllers
  const [editingPortfolioId, setEditingPortfolioId] = React.useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = React.useState<string | null>(null);
  const [editingExperienceId, setEditingExperienceId] = React.useState<string | null>(null);

  type PortForm = Omit<PortfolioItem, 'id'>;
  type TestForm = Omit<TestimonialItem, 'id'>;
  type ExpForm = Omit<WorkExperience, 'id'>;

  // Initial forms state
  const initialPortForm: PortForm = {
    title: '',
    category: 'Interactive Design',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-particles-looping-background-41584-large.mp4',
    url: 'https://demo.aistudio',
    featured: true
  };

  const initialTestForm: TestForm = {
    name: '',
    position: 'Chief Innovation Officer',
    company: 'NextGen Design',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    testimonial: ''
  };

  const initialExpForm: ExpForm = {
    company: '',
    role: '',
    duration: '',
    description: '',
    tags: [],
    iconName: 'Cpu'
  };

  const [portForm, setPortForm] = React.useState<PortForm>(initialPortForm);
  const [testForm, setTestForm] = React.useState<TestForm>(initialTestForm);
  const [expForm, setExpForm] = React.useState<ExpForm>(initialExpForm);
  const [tagsString, setTagsString] = React.useState('');

  // Load selected portfolio item into form for edits
  const startEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id);
    setPortForm({
      title: item.title,
      category: item.category,
      description: item.description,
      thumbnail: item.thumbnail,
      videoUrl: item.videoUrl || '',
      url: item.url,
      featured: item.featured ?? true
    });
  };

  // Save Portfolio Form
  const savePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portForm.title || !portForm.description) return;

    if (editingPortfolioId) {
      setPortfolio(prev => prev.map(item => 
        item.id === editingPortfolioId ? { ...item, ...portForm } : item
      ));
      setEditingPortfolioId(null);
    } else {
      const newItem: PortfolioItem = {
        id: `custom-p-${Date.now()}`,
        ...portForm
      };
      setPortfolio(prev => [newItem, ...prev]);
    }
    setPortForm(initialPortForm);
  };

  // Delete Portfolio
  const deletePortfolioItem = (id: string) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
    if (editingPortfolioId === id) {
      setEditingPortfolioId(null);
      setPortForm(initialPortForm);
    }
  };

  // Load selected testimonial item into form for edits
  const startEditTestimonial = (item: TestimonialItem) => {
    setEditingTestimonialId(item.id);
    setTestForm({
      name: item.name,
      position: item.position,
      company: item.company,
      photo: item.photo,
      testimonial: item.testimonial
    });
  };

  // Save Testimonial Form
  const saveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testForm.name || !testForm.testimonial) return;

    if (editingTestimonialId) {
      setTestimonials(prev => prev.map(item => 
        item.id === editingTestimonialId ? { ...item, ...testForm } : item
      ));
      setEditingTestimonialId(null);
    } else {
      const newItem: TestimonialItem = {
        id: `custom-t-${Date.now()}`,
        ...testForm
      };
      setTestimonials(prev => [newItem, ...prev]);
    }
    setTestForm(initialTestForm);
  };

  // Delete Testimonial
  const deleteTestimonialItem = (id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
    if (editingTestimonialId === id) {
      setEditingTestimonialId(null);
      setTestForm(initialTestForm);
    }
  };

  // Load selected experience item into form for edits
  const startEditExperience = (item: WorkExperience) => {
    setEditingExperienceId(item.id);
    setExpForm({
      company: item.company,
      role: item.role,
      duration: item.duration,
      description: item.description,
      tags: item.tags,
      iconName: item.iconName
    });
    setTagsString(item.tags.join(', '));
  };

  // Save Experience Form
  const saveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.company || !expForm.role || !expForm.description) return;

    const tagsArray = tagsString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const submission = {
      ...expForm,
      tags: tagsArray
    };

    if (editingExperienceId) {
      setExperiences(prev => prev.map(item => 
        item.id === editingExperienceId ? { ...item, ...submission } : item
      ));
      setEditingExperienceId(null);
    } else {
      const newItem: WorkExperience = {
        id: `custom-e-${Date.now()}`,
        ...submission
      };
      setExperiences(prev => [...prev, newItem]);
    }
    setExpForm(initialExpForm);
    setTagsString('');
  };

  // Delete Experience
  const deleteExperienceItem = (id: string) => {
    setExperiences(prev => prev.filter(item => item.id !== id));
    if (editingExperienceId === id) {
      setEditingExperienceId(null);
      setExpForm(initialExpForm);
      setTagsString('');
    }
  };

  const cancelEdit = () => {
    setEditingPortfolioId(null);
    setEditingTestimonialId(null);
    setEditingExperienceId(null);
    setPortForm(initialPortForm);
    setTestForm(initialTestForm);
    setExpForm(initialExpForm);
    setTagsString('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Shadow overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950 z-50 transition-opacity"
          />

          {/* Sliding Content Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 180 }}
            className={`fixed right-0 top-0 bottom-0 w-full max-w-xl z-50 shadow-2xl flex flex-col border-l transition-colors duration-300 ${
              theme === 'dark' ? 'bg-brand-900 border-brand-800 text-white' : 'bg-white border-brand-200 text-brand-900'
            }`}
          >
            {/* Header section with Close */}
            <div className="p-6 border-b dark:border-brand-800 border-brand-200 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-primary" /> Designer CMS Admin
                </h2>
                <p className="text-[10px] font-mono text-brand-400 uppercase tracking-widest mt-1">
                  Updates active elements on landing pages immediately
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full dark:hover:bg-brand-850 hover:bg-brand-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selector Tab Controls (Four columns) */}
            <div className="grid grid-cols-4 text-center text-[9px] sm:text-[11px] font-mono border-b dark:border-brand-800 border-brand-200">
              <button
                onClick={() => { setActiveTab('profile'); cancelEdit(); }}
                className={`py-4 font-semibold tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'profile'
                    ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                    : 'border-transparent text-brand-400 hover:text-brand-505'
                }`}
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Profile
              </button>

              <button
                onClick={() => { setActiveTab('portfolio'); cancelEdit(); }}
                className={`py-4 font-semibold tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'portfolio'
                    ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                    : 'border-transparent text-brand-400 hover:text-brand-500'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Works ({portfolio.length})
              </button>
              
              <button
                onClick={() => { setActiveTab('experiences'); cancelEdit(); }}
                className={`py-4 font-semibold tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'experiences'
                    ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                    : 'border-transparent text-brand-400 hover:text-brand-500'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> History ({experiences.length})
              </button>

              <button
                onClick={() => { setActiveTab('testimonials'); cancelEdit(); }}
                className={`py-4 font-semibold tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'testimonials'
                    ? 'border-brand-primary text-brand-primary bg-brand-primary/5'
                    : 'border-transparent text-brand-400 hover:text-brand-500'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Reviews ({testimonials.length})
              </button>
            </div>

            {/* Inner scrollable CMS forms & databases */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* BRAND NEW GRAPHIC DESIGNER PROFILE SECTION */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-brand-850 border-brand-800' : 'bg-brand-50 border-brand-150'
                  }`}>
                    <h3 className="font-display font-semibold text-sm mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-primary" /> Edit Graphic Designer Profile
                    </h3>

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Designer Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      {/* Title / Role */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Slogan / Core Role</label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      {/* Bio */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Short Biography Paragraph</label>
                        <textarea
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-800 dark:text-white"
                        />
                      </div>

                      {/* Skills String */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Specialty skills (comma separated)</label>
                        <input
                          type="text"
                          value={profile.skills ? profile.skills.join(', ') : ''}
                          onChange={(e) => {
                            const arr = e.target.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
                            setProfile(prev => ({ ...prev, skills: arr }));
                          }}
                          placeholder="e.g. Brand Identity, Layout, Print Design"
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      {/* Avatar Image + Upload */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Avatar Image URL</label>
                        <input
                          type="url"
                          value={profile.avatar}
                          onChange={(e) => setProfile(prev => ({ ...prev, avatar: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                        
                        <div className="relative mt-2 p-3 border border-dashed rounded-xl dark:border-brand-800 border-brand-200 text-center dark:bg-brand-900/40 bg-white/40 hover:border-brand-primary/45 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  if (ev.target?.result) {
                                    setProfile(prev => ({ ...prev, avatar: ev.target.result as string }));
                                  }
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          />
                          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono dark:text-brand-300 text-brand-600">
                            <Upload className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Quick Upload Avatar Picture</span>
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-brand-200 dark:bg-brand-800 my-4" />

                      {/* CARD 2: DESIGN PHILOSOPHY */}
                      <h4 className="text-xs font-display font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Design Philosophy Card (Center)
                      </h4>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Philosophy Label</label>
                        <input
                          type="text"
                          value={profile.vanguardTitle}
                          onChange={(e) => setProfile(prev => ({ ...prev, vanguardTitle: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Philosophy Quote Text</label>
                        <textarea
                          rows={3}
                          value={profile.vanguardText}
                          onChange={(e) => setProfile(prev => ({ ...prev, vanguardText: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Philosophy Footer Accent</label>
                        <input
                          type="text"
                          value={profile.vanguardFooter}
                          onChange={(e) => setProfile(prev => ({ ...prev, vanguardFooter: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="h-px bg-brand-200 dark:bg-brand-800 my-4" />

                      {/* CARD 3: TOOLS & MASTERY */}
                      <h4 className="text-xs font-display font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Creative Software & Tools Card (Right)
                      </h4>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Tools Title</label>
                        <input
                          type="text"
                          value={profile.engTitle}
                          onChange={(e) => setProfile(prev => ({ ...prev, engTitle: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Tools Description Text</label>
                        <textarea
                          rows={3}
                          value={profile.engText}
                          onChange={(e) => setProfile(prev => ({ ...prev, engText: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Tools Footer Accent</label>
                        <input
                          type="text"
                          value={profile.engFooter}
                          onChange={(e) => setProfile(prev => ({ ...prev, engFooter: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="h-px bg-brand-200 dark:bg-brand-800 my-4" />

                      {/* CUSTOMIZABLE SOFTWARE SKILLS SECTION */}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-display font-semibold text-brand-primary uppercase tracking-wider">
                          Software Skills Progress Bars
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            const defaultSkills = profile.softwareSkills || [
                              { name: 'Adobe Illustrator', level: 95, color: '#FF9A00', short: 'Ai' },
                              { name: 'Adobe Photoshop', level: 90, color: '#31A8FF', short: 'Ps' },
                              { name: 'Canva', level: 85, color: '#00C4CC', short: 'Cv' },
                              { name: 'Adobe After Effects', level: 80, short: 'Ae', color: '#D291FF' }
                            ];
                            setProfile(prev => ({
                              ...prev,
                              softwareSkills: [
                                ...defaultSkills,
                                { name: 'New Skill', level: 80, color: '#a855f7', short: 'Ns' }
                              ]
                            }));
                          }}
                          className="text-[10px] font-mono px-2 py-1 dark:bg-brand-800 dark:hover:bg-brand-750 bg-brand-100 hover:bg-brand-200 text-brand-primary rounded-lg border dark:border-brand-750 border-brand-200 font-bold uppercase transition-all duration-200 flex items-center gap-1 cursor-pointer animate-pulse"
                        >
                          <Plus className="w-3 h-3" /> Add Skill Bar
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(() => {
                          const skills = profile.softwareSkills || [
                            { name: 'Adobe Illustrator', level: 95, color: '#FF9A00', short: 'Ai' },
                            { name: 'Adobe Photoshop', level: 90, color: '#31A8FF', short: 'Ps' },
                            { name: 'Canva', level: 85, color: '#00C4CC', short: 'Cv' },
                            { name: 'Adobe After Effects', level: 80, short: 'Ae', color: '#D291FF' }
                          ];

                          return skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-xl border transition-colors ${
                                theme === 'dark' ? 'bg-brand-900/50 border-brand-805 hover:border-brand-750' : 'bg-white border-brand-150 hover:border-brand-250 shadow-sm'
                              }`}
                            >
                              <div className="grid grid-cols-12 gap-2 text-left">
                                {/* Name (col-span-4) */}
                                <div className="col-span-4 space-y-0.5">
                                  <label className="text-[9px] font-mono dark:text-brand-400 text-brand-500 uppercase font-black">Skill Name</label>
                                  <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => {
                                      const updated = [...skills];
                                      updated[idx] = { ...updated[idx], name: e.target.value };
                                      setProfile(prev => ({ ...prev, softwareSkills: updated }));
                                    }}
                                    className="w-full px-2 py-1 rounded-lg border dark:border-brand-800 dark:bg-brand-900 bg-brand-50 text-[11px] font-sans text-brand-900 dark:text-white"
                                  />
                                </div>

                                {/* Short badge text (col-span-2) */}
                                <div className="col-span-2 space-y-0.5">
                                  <label className="text-[9px] font-mono dark:text-brand-400 text-brand-500 uppercase font-black">Acronym</label>
                                  <input
                                    type="text"
                                    maxLength={3}
                                    value={skill.short}
                                    onChange={(e) => {
                                      const updated = [...skills];
                                      updated[idx] = { ...updated[idx], short: e.target.value.toUpperCase() };
                                      setProfile(prev => ({ ...prev, softwareSkills: updated }));
                                    }}
                                    className="w-full px-2 py-1 rounded-lg border dark:border-brand-800 dark:bg-brand-900 bg-brand-50 text-[11px] font-sans text-center text-brand-900 dark:text-white uppercase"
                                  />
                                </div>

                                {/* Level % (col-span-2) */}
                                <div className="col-span-2 space-y-0.5">
                                  <label className="text-[9px] font-mono dark:text-brand-400 text-brand-500 uppercase font-black">Level %</label>
                                  <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={skill.level}
                                    onChange={(e) => {
                                      const updated = [...skills];
                                      const val = Math.min(100, Math.max(1, parseInt(e.target.value) || 0));
                                      updated[idx] = { ...updated[idx], level: val };
                                      setProfile(prev => ({ ...prev, softwareSkills: updated }));
                                    }}
                                    className="w-full px-2 py-1 rounded-lg border dark:border-brand-800 dark:bg-brand-900 bg-brand-50 text-[11px] font-sans text-center text-brand-900 dark:text-white"
                                  />
                                </div>

                                {/* Color (col-span-3) */}
                                <div className="col-span-3 space-y-0.5">
                                  <label className="text-[9px] font-mono dark:text-brand-400 text-brand-500 uppercase font-black">Color</label>
                                  <div className="flex items-center gap-1.5">
                                    <input
                                      type="color"
                                      value={skill.color.startsWith('#') && skill.color.length === 7 ? skill.color : '#a855f7'}
                                      onChange={(e) => {
                                        const updated = [...skills];
                                        updated[idx] = { ...updated[idx], color: e.target.value };
                                        setProfile(prev => ({ ...prev, softwareSkills: updated }));
                                      }}
                                      className="w-5 h-5 p-0 border border-brand-200 dark:border-brand-800 rounded cursor-pointer shrink-0"
                                    />
                                    <input
                                      type="text"
                                      maxLength={7}
                                      value={skill.color}
                                      onChange={(e) => {
                                        const updated = [...skills];
                                        updated[idx] = { ...updated[idx], color: e.target.value };
                                        setProfile(prev => ({ ...prev, softwareSkills: updated }));
                                      }}
                                      className="w-full px-1 py-1 rounded border dark:border-brand-800 dark:bg-brand-900 bg-brand-50 text-[9px] font-mono text-center text-brand-900 dark:text-white"
                                    />
                                  </div>
                                </div>

                                {/* Delete skill (col-span-1) */}
                                <div className="col-span-1 flex items-end justify-center pb-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = skills.filter((_, sidx) => sidx !== idx);
                                      setProfile(prev => ({ ...prev, softwareSkills: updated }));
                                    }}
                                    className="p-1 rounded hover:text-red-500 text-brand-400 transition-colors cursor-pointer"
                                    title="Delete Skill Item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <>
                  {/* Portfolio Modification form */}
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-brand-850 border-brand-800' : 'bg-brand-50 border-brand-150'
                  }`}>
                    <h3 className="font-display font-semibold text-sm mb-4 flex items-center justify-between">
                      <span>{editingPortfolioId ? '✏️ Edit Case Study' : '➕ Add New Case Study'}</span>
                      {editingPortfolioId && (
                        <button 
                          onClick={cancelEdit}
                          className="text-[10px] dark:text-brand-400 text-brand-600 font-mono hover:underline uppercase"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h3>

                    <form onSubmit={savePortfolio} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Project Title *</label>
                        <input
                          type="text"
                          required
                          value={portForm.title}
                          onChange={(e) => setPortForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Helix Analytics Engine"
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Category Type</label>
                        <select
                          value={portForm.category}
                          onChange={(e) => setPortForm(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        >
                          <option value="Interactive Design">Interactive Design</option>
                          <option value="Brand Identity">Brand Identity</option>
                          <option value="Immersive Dev">Immersive Dev</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Custom WebGL">Custom WebGL</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Brief Description *</label>
                        <textarea
                          required
                          rows={2}
                          value={portForm.description}
                          onChange={(e) => setPortForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="What did the studio construct or innovate? Keeps users in the loop..."
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Thumbnail URL (or Local File Upload)</label>
                        <input
                          type="url"
                          value={portForm.thumbnail}
                          onChange={(e) => setPortForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                          placeholder="https://..."
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                        
                        <div className="relative mt-2 p-3 border border-dashed rounded-xl dark:border-brand-800 border-brand-200 text-center dark:bg-brand-900/40 bg-white/40 hover:border-brand-primary/45 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  if (ev.target?.result) {
                                    setPortForm(prev => ({ ...prev, thumbnail: ev.target.result as string }));
                                  }
                                };
                                reader.readAsDataURL(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          />
                          <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono dark:text-brand-300 text-brand-600">
                            <Upload className="w-3.5 h-3.5 text-brand-primary" />
                            <span>Quick Upload Local Image</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Cover Loop Video URL</label>
                        <input
                          type="url"
                          value={portForm.videoUrl}
                          onChange={(e) => setPortForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                          placeholder="https://..."
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Project Live Website URL</label>
                        <input
                          type="url"
                          value={portForm.url}
                          onChange={(e) => setPortForm(prev => ({ ...prev, url: e.target.value }))}
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-primary text-white rounded-xl font-sans text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {editingPortfolioId ? (
                          <>
                            <Check className="w-4 h-4" /> Save Updated Changes
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> Add to Portfolio Listing
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Portfolio Listing List */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] font-bold text-brand-400 uppercase tracking-wider">
                      REGISTERED PORTFOLIO ROWS ({portfolio.length})
                    </h4>
                    
                    <div className="space-y-2">
                      {portfolio.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                            editingPortfolioId === item.id
                              ? 'border-brand-primary bg-brand-primary/5'
                              : 'dark:bg-brand-850 dark:border-brand-800 border-brand-150'
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-200 shrink-0">
                              <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="truncate text-left">
                              <h5 className="font-display font-bold text-xs truncate leading-tight">{item.title}</h5>
                              <span className="text-[9px] font-mono text-brand-400 leading-none">{item.category}</span>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => startEditPortfolio(item)}
                              className="p-2 rounded-lg dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 hover:text-brand-primary transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePortfolioItem(item.id)}
                              className="p-2 rounded-lg dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 hover:text-red-500 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'experiences' && (
                <div className="space-y-6">
                  {!isOwnerVerified ? (
                    <div className={`p-6 rounded-2xl border text-center space-y-6 ${
                      theme === 'dark' ? 'bg-brand-850 border-brand-800' : 'bg-brand-50 border-brand-150 shadow-sm'
                    }`}>
                      <div className="mx-auto w-12 h-12 rounded-full dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 flex items-center justify-center text-lg shadow-sm">
                        🔑
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-display font-semibold text-sm">
                          {language === 'en' ? 'Owner Authentication Gate' : 'Gerbang Otentikasi Pemilik'}
                        </h3>
                        <p className="text-xs dark:text-brand-400 text-brand-600 leading-relaxed">
                          {language === 'en' 
                            ? 'Adding or editing work experiences is restricted to the designer profile owner. Enter the master password to continue.' 
                            : 'Menambahkan atau mengedit pengalaman kerja dibatasi hanya untuk pemilik profil desainer. Masukkan kata sandi utama untuk melanjutkan.'}
                        </p>
                      </div>

                      <form onSubmit={handleVerifyOwner} className="space-y-4 max-w-xs mx-auto text-left">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono text-brand-400 uppercase font-black tracking-widest block">
                            {language === 'en' ? 'Owner Password' : 'Kata Sandi Pemilik'}
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={ownerPasswordInput}
                              onChange={(e) => {
                                setOwnerPasswordInput(e.target.value);
                                if (passError) setPassError('');
                              }}
                              placeholder={language === 'en' ? "Enter passphrase..." : "Masukkan sandi..."}
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-brand-400 hover:text-brand-primary text-xs"
                            >
                              {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                          </div>
                        </div>

                        {passError && (
                          <div className="text-[10px] font-mono text-red-500 bg-red-500/5 p-2 rounded-lg border border-red-500/10 text-center">
                            ⚠️ {passError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-brand-primary text-white rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-sm shadow-brand-primary/25 cursor-pointer text-center"
                        >
                          {language === 'en' ? 'Verify Credentials' : 'Verifikasi Kredensial'}
                        </button>

                        <div className="text-center text-[10px] text-brand-400 font-mono mt-2 leading-none">
                          <span>Hint: use <code className="text-brand-primary/80 font-bold font-mono text-[10px]">aalfin</code> or <code className="text-brand-primary/80 font-bold font-mono text-[10px]">admin</code></span>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      {/* Authenticated Banner */}
                      <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[10px] font-mono text-emerald-400">
                        <span className="flex items-center gap-1.5 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {language === 'en' ? 'OWNER ACCESS VERIFIED' : 'AKSES PEMILIK TERVERIFIKASI'}
                        </span>
                        <button 
                          onClick={handleLogoutOwner}
                          className="text-[10px] underline hover:text-emerald-300 uppercase font-black cursor-pointer"
                        >
                          {language === 'en' ? 'Lock Out' : 'Kunci Kembali'}
                        </button>
                      </div>

                      {/* Experiences Modification form */}
                      <div className={`p-5 rounded-2xl border text-left ${
                        theme === 'dark' ? 'bg-brand-850 border-brand-800' : 'bg-brand-50 border-brand-150'
                      }`}>
                        <h3 className="font-display font-semibold text-sm mb-4 flex items-center justify-between">
                          <span>{editingExperienceId ? '✏️ ' + t('experience.save') : '➕ ' + t('experience.add')}</span>
                          {editingExperienceId && (
                            <button 
                              onClick={cancelEdit}
                              className="text-[10px] dark:text-brand-400 text-brand-600 font-mono hover:underline uppercase"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </h3>

                        <form onSubmit={saveExperience} className="space-y-4">
                          {/* Company Name */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{t('experience.company')} *</label>
                            <input
                              type="text"
                              required
                              value={expForm.company}
                              onChange={(e) => setExpForm(prev => ({ ...prev, company: e.target.value }))}
                              placeholder="e.g. Linea Studio"
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                            />
                          </div>

                          {/* Job Title / Role */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{t('experience.role')} *</label>
                            <input
                              type="text"
                              required
                              value={expForm.role}
                              onChange={(e) => setExpForm(prev => ({ ...prev, role: e.target.value }))}
                              placeholder="e.g. Lead UX Coordinator"
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                            />
                          </div>

                          {/* Tenure / Duration */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{t('experience.duration')} *</label>
                            <input
                              type="text"
                              required
                              value={expForm.duration}
                              onChange={(e) => setExpForm(prev => ({ ...prev, duration: e.target.value }))}
                              placeholder="e.g. 2024 - PRESENT or 2022 - 2024"
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                            />
                          </div>

                          {/* Key achievements description */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{t('experience.description')} *</label>
                            <textarea
                              required
                              rows={3}
                              value={expForm.description}
                              onChange={(e) => setExpForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="List design optimizations, metrics, high contrast web creations..."
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-800 dark:text-white"
                            />
                          </div>

                          {/* Skill Tags */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{t('experience.tags')}</label>
                            <input
                              type="text"
                              value={tagsString}
                              onChange={(e) => setTagsString(e.target.value)}
                              placeholder="e.g. React, Tailwind, Figma, Web3"
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                            />
                          </div>

                          {/* Icon Vis option */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">{t('experience.icon')}</label>
                            <select
                              value={expForm.iconName}
                              onChange={(e) => setExpForm(prev => ({ ...prev, iconName: e.target.value }))}
                              className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                            >
                              <option value="Cpu">🤖 Cpu Interactivity</option>
                              <option value="Compass">🧭 Compass Navigability</option>
                              <option value="Target">🎯 Target Precision Accents</option>
                              <option value="Layers">🥞 Layers Architecture Stacked</option>
                              <option value="Briefcase">💼 Briefcase Professional</option>
                              <option value="Award">🏆 Award Excellence</option>
                              <option value="Terminal">📟 Terminal Command Code</option>
                              <option value="Sparkles">✨ Sparkles Vanguard Flair</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-brand-primary text-white rounded-xl font-sans text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {editingExperienceId ? (
                              <>
                                <Check className="w-4 h-4" /> {t('experience.save')}
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" /> {t('experience.add')}
                              </>
                            )}
                          </button>
                        </form>
                      </div>

                      {/* Registered Experience List */}
                      <div className="space-y-3">
                        <h4 className="font-mono text-[10px] font-bold text-brand-400 uppercase tracking-wider text-left">
                          {t('experience.label')} ({experiences.length})
                        </h4>
                        
                        <div className="space-y-2">
                          {experiences.map((item) => (
                            <div
                              key={item.id}
                              className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                                editingExperienceId === item.id
                                  ? 'border-brand-primary bg-brand-primary/5'
                                  : 'dark:bg-brand-850 dark:border-brand-800 border-brand-150'
                              }`}
                            >
                              <div className="truncation text-left max-w-[70%]">
                                <h5 className="font-display font-bold text-xs truncate leading-tight mb-1">{item.company}</h5>
                                <p className="text-[10px] font-sans text-brand-400 truncate leading-none mb-1 font-medium">{item.role}</p>
                                <span className="text-[9px] font-mono dark:text-brand-300 text-brand-500 font-bold">{item.duration}</span>
                              </div>

                              <div className="flex gap-1.5 shrink-0">
                                <button
                                  onClick={() => startEditExperience(item)}
                                  className="p-2 rounded-lg dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 hover:text-brand-primary transition-all cursor-pointer"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteExperienceItem(item.id)}
                                  className="p-2 rounded-lg dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 hover:text-red-500 transition-all cursor-pointer"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 'testimonials' && (
                <>
                  {/* Testimonial Form content */}
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-brand-850 border-brand-800' : 'bg-brand-50 border-brand-150'
                  }`}>
                    <h3 className="font-display font-semibold text-sm mb-4 flex items-center justify-between">
                      <span>{editingTestimonialId ? '✏️ Edit Testimonial' : '➕ Add Client Review'}</span>
                      {editingTestimonialId && (
                        <button 
                          onClick={cancelEdit}
                          className="text-[10px] dark:text-brand-400 text-brand-600 font-mono hover:underline uppercase"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </h3>

                    <form onSubmit={saveTestimonial} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Client Name *</label>
                        <input
                          type="text"
                          required
                          value={testForm.name}
                          onChange={(e) => setTestForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Position Role</label>
                          <input
                            type="text"
                            value={testForm.position}
                            onChange={(e) => setTestForm(prev => ({ ...prev, position: e.target.value }))}
                            placeholder="e.g. VP of Product"
                            className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Company</label>
                          <input
                            type="text"
                            value={testForm.company}
                            onChange={(e) => setTestForm(prev => ({ ...prev, company: e.target.value }))}
                            placeholder="e.g. Linea Financial"
                            className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Avatar Photo URL</label>
                        <input
                          type="url"
                          value={testForm.photo}
                          onChange={(e) => setTestForm(prev => ({ ...prev, photo: e.target.value }))}
                          placeholder="https://..."
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary text-brand-880 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-brand-400 uppercase font-semibold">Testimonial Quote *</label>
                        <textarea
                          required
                          rows={3}
                          value={testForm.testimonial}
                          onChange={(e) => setTestForm(prev => ({ ...prev, testimonial: e.target.value }))}
                          placeholder="Outline high-fidelity speed details..."
                          className="w-full px-3 py-2.5 rounded-xl border dark:border-brand-800 dark:bg-brand-900 bg-white text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-880 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-primary text-white rounded-xl font-sans text-xs font-semibold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {editingTestimonialId ? (
                          <>
                            <Check className="w-4 h-4" /> Save Updated Review
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> Add Review to Database
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Testimonial listing rows */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-[10px] font-bold text-brand-400 uppercase tracking-wider">
                      REGISTERED TESTIMONIAL ROWS ({testimonials.length})
                    </h4>

                    <div className="space-y-2">
                      {testimonials.map((test) => (
                        <div
                          key={test.id}
                          className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                            editingTestimonialId === test.id
                              ? 'border-brand-primary bg-brand-primary/5'
                              : 'dark:bg-brand-850 dark:border-brand-800 border-brand-150'
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-200 shrink-0">
                              <img src={test.photo} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="truncate text-left">
                              <h5 className="font-display font-bold text-xs truncate leading-tight">{test.name}</h5>
                              <span className="text-[9px] font-mono text-brand-400 leading-none">{test.position}, {test.company}</span>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => startEditTestimonial(test)}
                              className="p-2 rounded-lg dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 hover:text-brand-primary transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteTestimonialItem(test.id)}
                              className="p-2 rounded-lg dark:bg-brand-900 bg-white border dark:border-brand-800 border-brand-200 hover:text-red-500 transition-all cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Bottom Actions footer bar (Restore state defaults) */}
            <div className="p-6 border-t dark:border-brand-800 border-brand-200 flex flex-col gap-3">
              <button
                onClick={onResetAll}
                className="w-full py-3 border border-dashed dark:border-brand-700 dark:hover:border-brand-primary border-brand-200 text-brand-600 dark:text-brand-300 hover:text-brand-primary hover:border-brand-primary rounded-xl text-xs font-mono font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Restore Default Agency Databases
              </button>
              
              <div className="flex items-center gap-1.5 justify-center text-[10px] text-brand-450 font-mono">
                <HelpCircle className="w-3.5 h-3.5 text-brand-primary" />
                <span>Changes persist in your browser's local sandbox</span>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
