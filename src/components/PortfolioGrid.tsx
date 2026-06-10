import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Trash2, Sliders, Play, ExternalLink, 
  Settings2, HelpCircle, RefreshCw, Layers, Sparkles, Check, Info, ZoomIn, Eye,
  Plus, Trash, Lock, Unlock
} from 'lucide-react';
import { PortfolioItem, Theme } from '../types';
import { useLanguage, portfolioTranslations } from '../context/LanguageContext';

interface PortfolioGridProps {
  portfolioItems: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  theme: Theme;
}

export default function PortfolioGrid({ portfolioItems, setPortfolio, theme }: PortfolioGridProps) {
  const { t, language } = useLanguage();
  
  // Localized helper to read initial item translations vs custom uploaded ones
  const getTranslatedFields = (item: any) => {
    const trans = (portfolioTranslations[language] as any) || {};
    return {
      title: trans[`${item.id}.title`] || item.title,
      description: trans[`${item.id}.description`] || item.description,
      category: trans[`${item.id}.category`] || item.category,
    };
  };

  // Customizer Mode state
  const [isWorkspaceOpen, setIsWorkspaceOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<PortfolioItem | null>(null);

  // Marquee Speed modifier state (multipliers)
  const [speedTop, setSpeedTop] = React.useState<number>(35); // seconds to loop row 1
  const [speedBottom, setSpeedBottom] = React.useState<number>(40); // seconds to loop row 2

  // Upload Form local states
  const [upTitle, setUpTitle] = React.useState('');
  const [upCategory, setUpCategory] = React.useState('Interactive Design');
  const [upDescription, setUpDescription] = React.useState('');
  const [upUrl, setUpUrl] = React.useState('https://demo.aistudio');
  const [upRatio, setUpRatio] = React.useState<string>('aspect-[16/9]'); // defaults to widescreen
  const [upImageBase64, setUpImageBase64] = React.useState<string>('');
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState('');

  const [hoveredItem, setHoveredItem] = React.useState<PortfolioItem | null>(null);

  // Dynamic custom running grid tracks state
  interface CustomTrack {
    id: string;
    title: string;
    direction: 'left' | 'right';
    speed: number;
    ratio: string;
    items: PortfolioItem[];
  }

  const [customTracks, setCustomTracks] = React.useState<CustomTrack[]>(() => {
    const saved = localStorage.getItem('custom_running_tracks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem('custom_running_tracks', JSON.stringify(customTracks));
  }, [customTracks]);

  // Track creator local state
  const [isTrackCreatorOpen, setIsTrackCreatorOpen] = React.useState(false);
  const [newTrackTitle, setNewTrackTitle] = React.useState('');
  const [newTrackDirection, setNewTrackDirection] = React.useState<'left' | 'right'>('left');
  const [newTrackSpeed, setNewTrackSpeed] = React.useState<number>(35);
  const [newTrackRatio, setNewTrackRatio] = React.useState<string>('aspect-[16/9]');
  const [newTrackUploadedImages, setNewTrackUploadedImages] = React.useState<string[]>([]);
  const [newTrackUrlInput, setNewTrackUrlInput] = React.useState('');
  const [newTrackDragActive, setNewTrackDragActive] = React.useState(false);

  // Owner validation state for adding/editing running grids
  const [isOwnerVerified, setIsOwnerVerified] = React.useState<boolean>(() => {
    return localStorage.getItem('is_owner_verified_history') === 'true';
  });
  const [gridOwnerPassword, setGridOwnerPassword] = React.useState('');
  const [gridOwnerError, setGridOwnerError] = React.useState('');

  React.useEffect(() => {
    const checkState = () => {
      const val = localStorage.getItem('is_owner_verified_history') === 'true';
      if (val !== isOwnerVerified) {
        setIsOwnerVerified(val);
      }
    };
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, [isOwnerVerified]);

  const handleVerifyOwnerGrid = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordLower = gridOwnerPassword.trim().toLowerCase();
    if (passwordLower === 'aalfin' || passwordLower === 'aalfin028' || passwordLower === 'admin' || passwordLower === 'owner123') {
      setIsOwnerVerified(true);
      localStorage.setItem('is_owner_verified_history', 'true');
      setGridOwnerError('');
      setGridOwnerPassword('');
    } else {
      setGridOwnerError(language === 'en' ? 'Incorrect credentials.' : 'Kredensial salah.');
    }
  };

  const handleAddNewTrackImageFromFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewTrackUploadedImages(prev => [...prev, event.target!.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTrackImageFromUrl = () => {
    if (newTrackUrlInput.trim().startsWith('http')) {
      setNewTrackUploadedImages(prev => [...prev, newTrackUrlInput.trim()]);
      setNewTrackUrlInput('');
    }
  };

  const handleSeedAestheticImages = () => {
    const presets = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
    ];
    setNewTrackUploadedImages(presets);
  };

  const handlePublishCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (localStorage.getItem('is_owner_verified_history') !== 'true') {
      setGridOwnerError(language === 'en' ? 'Unauthorized action. Please verify owner credentials first.' : 'Tindakan tidak sah. Silakan verifikasi kredensial pemilik terlebih dahulu.');
      return;
    }
    const title = newTrackTitle.trim() || (language === 'en' ? 'Inspiration Feed' : 'Koleksi Inspirasi');
    
    const finalImages = newTrackUploadedImages.length > 0 ? newTrackUploadedImages : [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80'
    ];

    const trackId = `custom-track-${Date.now()}`;
    const generatedItems: PortfolioItem[] = finalImages.map((img, index) => ({
      id: `ct-item-${trackId}-${index}-${Math.random().toString(36).substr(2, 4)}`,
      title: `${title} - Part ${index + 1}`,
      category: title,
      description: language === 'en' 
        ? 'Immersive design concept dynamically rendered into the customized scrolling carousel.' 
        : 'Konsep desain imersif yang dirender secara dinamis ke dalam baris berjalan yang disesuaikan.',
      thumbnail: img,
      url: 'https://demo.aistudio',
      videoUrl: ''
    }));

    const newTrack: CustomTrack = {
      id: trackId,
      title,
      direction: newTrackDirection,
      speed: newTrackSpeed,
      ratio: newTrackRatio,
      items: generatedItems
    };

    setCustomTracks(prev => [...prev, newTrack]);

    setNewTrackTitle('');
    setNewTrackDirection('left');
    setNewTrackSpeed(35);
    setNewTrackRatio('aspect-[16/9]');
    setNewTrackUploadedImages([]);
    setIsTrackCreatorOpen(false);
  };

  const handleDeleteCustomTrack = (id: string) => {
    if (localStorage.getItem('is_owner_verified_history') !== 'true') {
      return;
    }
    if (window.confirm(language === 'en' ? 'Are you sure you want to delete this running image track?' : 'Apakah Anda yakin ingin menghapus baris gambar berjalan ini?')) {
      setCustomTracks(prev => prev.filter(track => track.id !== id));
    }
  };

  // Drag-and-drop utilities for the local file uploader
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadStatus('❌ Error: Only image files are permitted.');
      return;
    }
    setUploadStatus('⚡ Reading asset...');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUpImageBase64(event.target.result as string);
        setUploadStatus('✅ Asset uploaded successfully under localized instance.');
      }
    };
    reader.onerror = () => {
      setUploadStatus('❌ Failed to read image asset.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Submit active customized portfolio item
  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upTitle || !upDescription) {
      setUploadStatus('❌ Please fill in the Title and Brief Description.');
      return;
    }

    // Default high-performance fallback layout template if no custom image base64 exists
    const finalImage = upImageBase64 || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

    const newItem: PortfolioItem & { customRatio?: string } = {
      id: `custom-p-${Date.now()}`,
      title: upTitle,
      category: upCategory,
      description: upDescription,
      thumbnail: finalImage,
      url: upUrl,
      featured: true,
      // We store ratio on the object so the flexible aspect ratio renders elegantly!
      videoUrl: '' // can be expanded by editing in the CMS drawer later
    };

    // Stash custom ratio metadata locally by attaching to our database
    (newItem as any).customRatio = upRatio;

    setPortfolio(prev => [newItem, ...prev]);

    // Reset Form fields
    setUpTitle('');
    setUpDescription('');
    setUpImageBase64('');
    setUploadStatus('✨ Portfolio item published into the running tracks!');

    setTimeout(() => {
      setUploadStatus('');
    }, 5000);
  };

  // Delete live item from layout
  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this case study from the active running track?')) {
      setPortfolio(prev => prev.filter(item => item.id !== id));
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  // Inline layout update for presets
  const handleUpdateItemRatio = (id: string, ratio: string) => {
    setPortfolio(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, customRatio: ratio } as any;
      }
      return item;
    }));
  };

  // Divide portfolio items between two rows to build a dual-pass luxury layout
  // We double/triple items if the count is small to guarantee seamless looping without gaps!
  const distributeRow = (rowNumber: 1 | 2) => {
    const items = portfolioItems.filter((_, i) => (rowNumber === 1 ? i % 2 === 0 : i % 2 !== 0));
    
    if (items.length === 0) return [];
    
    // Looping filler factor to make sure it stretches beyond viewport width
    let list = [...items];
    while (list.length < 10) {
      list = [...list, ...items];
    }
    return list;
  };

  const row1Items = distributeRow(1);
  const row2Items = distributeRow(2);

  // Aspect ratio class mapper
  const getRatioClass = (item: any) => {
    if (item.customRatio) {
      return item.customRatio;
    }
    // Infer beautiful varied ratios based on initial IDs for high-fashion bento flow
    const defaults = [
      'aspect-[16/9]', 
      'aspect-[3/4]', 
      'aspect-square', 
      'aspect-[21/9]', 
      'aspect-[4/5]', 
      'aspect-[16/10]'
    ];
    // Simple hash to assign deterministic initial ratios to default mock case studies
    const hash = item.id.charCodeAt(item.id.length - 1) || 0;
    return defaults[hash % defaults.length];
  };

  return (
    <section 
      id="portfolio" 
      className={`py-20 md:py-32 transition-colors duration-300 relative overflow-hidden border-t ${
        theme === 'dark' 
          ? 'bg-brand-900 border-brand-850 text-white' 
          : 'bg-brand-50 border-brand-200 text-brand-900'
      }`}
    >
      {/* Decorative Dot Matrix Accent commonly seen in high-end design catalogs */}
      <div className={`absolute inset-0 z-0 opacity-40 pointer-events-none ${
        theme === 'dark' ? 'dot-matrix-dark' : 'dot-matrix-light'
      }`} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 mb-16 header-anchor">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono font-semibold text-brand-primary uppercase tracking-widest block mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse text-brand-primary" />
              {t('portfolio.indicator')} ({portfolioItems.length})
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none">
              {t('portfolio.heading')}
            </h2>
            <p className="mt-4 font-sans text-sm md:text-base max-w-xl dark:text-brand-400 text-brand-600 leading-relaxed font-light">
              {t('portfolio.desc')}
            </p>
          </div>

          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className={`px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border shadow-lg transition-all transform active:scale-95 cursor-pointer ${
              isWorkspaceOpen 
                ? 'bg-brand-primary border-brand-primary text-white hover:brightness-110 shadow-brand-primary/20' 
                : theme === 'dark'
                  ? 'bg-brand-850 border-brand-800 text-brand-300 hover:border-brand-700 hover:text-white'
                  : 'bg-white border-brand-200 text-brand-700 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            {isWorkspaceOpen ? t('portfolio.btn.owner.close') : t('portfolio.btn.owner')}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION B: OWNER STUDY WORKSPACE (INLINE UPLOAD DASH) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isWorkspaceOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`border-y mb-16 overflow-hidden ${
              theme === 'dark' ? 'bg-brand-850/40 border-brand-800' : 'bg-brand-100/40 border-brand-200'
            }`}
          >
            <div className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Creator segment-uploader */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="font-display font-black text-lg flex items-center gap-2 text-brand-primary">
                    <Upload className="w-5 h-5" /> {t('portfolio.publisher.title')}
                  </h3>
                  <p className="text-[11px] font-mono dark:text-brand-400 text-brand-600 mt-1 uppercase tracking-widest">
                    {t('portfolio.publisher.desc')}
                  </p>
                </div>

                <form onSubmit={handleCreateNewItem} className="space-y-4">
                  {/* Local Asset Drag-and-drop Zone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono dark:text-brand-400 text-brand-600 uppercase font-semibold">{t('portfolio.label.image')}</label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative flex flex-col items-center justify-center min-h-[140px] cursor-pointer ${
                        dragActive 
                          ? 'border-brand-primary bg-brand-primary/5 scale-[0.99]' 
                          : upImageBase64
                            ? 'border-brand-primary/60 dark:bg-brand-900/60 bg-white/60'
                            : 'dark:border-brand-800 border-brand-300 dark:bg-brand-900/30 bg-white/30 hover:border-brand-primary/45'
                      }`}
                    >
                      {upImageBase64 ? (
                        <div className="space-y-3 w-full">
                          <div className="w-16 h-10 mx-auto rounded-lg overflow-hidden border border-brand-primary shadow-sm bg-black">
                            <img src={upImageBase64} alt="Thumb" className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[10px] font-mono text-green-500 font-semibold uppercase">{t('portfolio.dragdrop.synced')}</p>
                          <button
                            type="button"
                            onClick={() => setUpImageBase64('')}
                            className="text-[9px] font-mono text-red-500 hover:underline uppercase"
                          >
                            {t('portfolio.dragdrop.discard')}
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-brand-primary/70 mb-2 animate-bounce" />
                          <p className="text-[11px] font-sans font-medium dark:text-brand-300 text-brand-700">
                            {t('portfolio.dragdrop.main')} <span className="text-brand-primary underline cursor-pointer">{t('portfolio.dragdrop.browse')}</span>
                          </p>
                          <p className="text-[9px] font-mono dark:text-brand-500 text-brand-400 mt-1 uppercase">{t('portfolio.dragdrop.formats')}</p>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Size and Proportions Preset selection */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono dark:text-brand-400 text-brand-600 uppercase font-semibold">{t('portfolio.label.ratio')}</label>
                      <select
                        value={upRatio}
                        onChange={(e) => setUpRatio(e.target.value)}
                        className="w-full px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                      >
                        <option value="aspect-[16/9]">Landscape (16:9)</option>
                        <option value="aspect-[3/4]">Standard Portrait (3:4)</option>
                        <option value="aspect-[4/5]">Tall Editorial (4:5)</option>
                        <option value="aspect-[16/10]">Modern Wide (16:10)</option>
                        <option value="aspect-square">Square Box (1:1)</option>
                        <option value="aspect-[21/9]">Panoramic (21:9)</option>
                        <option value="aspect-[9/16]">Cinematic Tall (9:16)</option>
                      </select>
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono dark:text-brand-400 text-brand-600 uppercase font-semibold">{t('portfolio.label.cat')}</label>
                      <select
                        value={upCategory}
                        onChange={(e) => setUpCategory(e.target.value)}
                        className="w-full px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                      >
                        <option value="Interactive Design">Interactive Design</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Custom WebGL">Custom WebGL</option>
                        <option value="Studio Motion">Studio Motion</option>
                      </select>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-1 block">
                    <label className="text-[10px] font-mono dark:text-brand-400 text-brand-600 uppercase font-semibold">{t('portfolio.label.title')}</label>
                    <input
                      type="text"
                      required
                      value={upTitle}
                      onChange={(e) => setUpTitle(e.target.value)}
                      placeholder={t('portfolio.placeholder.title')}
                      className="w-full px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1 block">
                    <label className="text-[10px] font-mono dark:text-brand-400 text-brand-600 uppercase font-semibold">{t('portfolio.label.desc')}</label>
                    <textarea
                      required
                      rows={2}
                      value={upDescription}
                      onChange={(e) => setUpDescription(e.target.value)}
                      placeholder={t('portfolio.placeholder.desc')}
                      className="w-full px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs font-sans outline-none focus:border-brand-primary resize-none text-brand-800 dark:text-white"
                    />
                  </div>

                  {/* Project URL */}
                  <div className="space-y-1 block">
                    <label className="text-[10px] font-mono dark:text-brand-400 text-brand-600 uppercase font-semibold">{t('portfolio.label.link')}</label>
                    <input
                      type="url"
                      value={upUrl}
                      onChange={(e) => setUpUrl(e.target.value)}
                      className="w-full px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs font-sans outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                    />
                  </div>

                  {/* Submit item */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-primary text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 shadow-md shadow-brand-primary/10 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {t('portfolio.btn.publish')}
                  </button>

                  {uploadStatus && (
                    <div className="p-3 rounded-xl border dark:bg-brand-900/80 bg-white border-brand-200 dark:border-brand-800 text-[10px] font-mono text-center">
                      {uploadStatus}
                    </div>
                  )}
                </form>
              </div>

              {/* Slider tuner & fast layout updates */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-sm flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-brand-primary" /> {t('portfolio.speed.title')}
                  </h3>
                  <span className="text-[10px] font-mono text-brand-400">{t('portfolio.speed.subtitle')}</span>
                </div>

                {/* Micro slider to accelerate GSAP / css marquee */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl dark:bg-brand-900/60 bg-white border dark:border-brand-800 border-brand-200">
                  <div className="space-y-2 text-left">
                    <label className="text-[10.5px] font-mono text-brand-400 flex justify-between">
                      <span>{t('portfolio.speed.row1')}</span>
                      <span className="text-brand-primary font-bold">{speedTop}s / cycle</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      value={speedTop}
                      onChange={(e) => setSpeedTop(Number(e.target.value))}
                      className="w-full accent-brand-primary"
                    />
                    <p className="text-[9px] font-mono text-brand-500 italic">{t('portfolio.speed.row1.desc')}</p>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10.5px] font-mono text-brand-400 flex justify-between">
                      <span>{t('portfolio.speed.row2')}</span>
                      <span className="text-brand-primary font-bold">{speedBottom}s / cycle</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      value={speedBottom}
                      onChange={(e) => setSpeedBottom(Number(e.target.value))}
                      className="w-full accent-brand-primary"
                    />
                    <p className="text-[9px] font-mono text-brand-500 italic">{t('portfolio.speed.row2.desc')}</p>
                  </div>
                </div>

                {/* Instant visual ratio modifier row */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] font-bold text-brand-400 uppercase tracking-widest text-left">
                    {t('portfolio.modify.title')}
                  </h4>

                  <div className="max-h-[300px] overflow-y-auto space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-left pr-2">
                    {portfolioItems.map((item: any) => (
                      <div 
                        key={item.id}
                        className="p-3 rounded-xl border dark:bg-brand-900 bg-white dark:border-brand-800 border-brand-150 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 truncate">
                          <img 
                            src={item.thumbnail} 
                            alt="" 
                            className="w-10 h-10 rounded-lg object-cover bg-black shrink-0" 
                          />
                          <div className="truncate text-left">
                            <p className="font-bold truncate text-[11px] leading-tight dark:text-white text-brand-900">{item.title}</p>
                            <span className="text-[9px] font-mono text-brand-400 uppercase">{item.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Speed-adjust ratios preset cycle dropdown */}
                          <select
                            value={item.customRatio || 'aspect-[16/9]'}
                            onChange={(e) => handleUpdateItemRatio(item.id, e.target.value)}
                            className="p-1 text-[10px] font-mono dark:bg-brand-850 bg-brand-50 border dark:border-brand-800 border-brand-200 rounded outline-none focus:border-brand-primary"
                          >
                            <option value="aspect-[16/9]">16:9 Widescreen</option>
                            <option value="aspect-[3/4]">3:4 Portrait</option>
                            <option value="aspect-[4/5]">4:5 Portrait</option>
                            <option value="aspect-square">1:1 Square</option>
                            <option value="aspect-[21/9]">21:9 Panoramic</option>
                            <option value="aspect-[9/16]">9:16 Tall</option>
                          </select>

                          <button
                            onClick={(e) => handleDeleteItem(item.id, e)}
                            className="p-1.5 text-brand-400 hover:text-red-500 transition-colors"
                            title="Remove project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 border border-dashed rounded-xl dark:border-brand-800 border-brand-200 flex items-start gap-2 text-[10px] font-mono dark:text-brand-400 text-brand-600">
                  <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <p>
                    {t('portfolio.warning')}
                  </p>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* SECTION C: THE INFINITE RUNNING GEOMETRIC TRACKS (GSAP/CSS) */}
      {/* ======================================================== */}
      <div className="w-full overflow-hidden py-4 select-none relative space-y-6">
        
        {/* ROW 1: RUNS LEFT */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div 
            className="flex gap-4 md:gap-6 animate-marquee-left shrink-0"
            style={{ 
              animationDuration: `${speedTop}s`,
              width: 'max-content'
            }}
          >
            {row1Items.map((item, index) => {
              const ratioClass = getRatioClass(item);
              const { title, description, category } = getTranslatedFields(item);
              return (
                <div
                  key={`r1-${item.id}-${index}`}
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] ${ratioClass} shrink-0 bg-brand-850 overflow-hidden rounded-[20px] md:rounded-[36px] relative group cursor-pointer border border-brand-800/10 dark:border-white/5 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform origin-center`}
                >
                  <img
                    src={item.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlays that match a luxury studio feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                      {category}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1 leading-tight flex items-center gap-1.5">
                      {title} <ExternalLink className="w-3.5 h-3.5 text-white/75" />
                    </h3>
                    <p className="text-[11px] text-white/70 font-sans font-light mt-1.5 line-clamp-2 max-w-sm">
                      {description}
                    </p>
                  </div>

                  {/* Absolute visual identifier of aspect ratio preset */}
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10 text-[8px] font-mono text-white/90 uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {ratioClass.replace('aspect-[', '').replace(']', '')} RATIO
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: RUNS RIGHT */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div 
            className="flex gap-4 md:gap-6 animate-marquee-left shrink-0"
            style={{ 
              animationDuration: `${speedBottom}s`,
              animationDirection: 'reverse', // makes it run right!
              width: 'max-content'
            }}
          >
            {row2Items.map((item, index) => {
              const ratioClass = getRatioClass(item);
              const { title, description, category } = getTranslatedFields(item);
              return (
                <div
                  key={`r2-${item.id}-${index}`}
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] ${ratioClass} shrink-0 bg-brand-850 overflow-hidden rounded-[20px] md:rounded-[36px] relative group cursor-pointer border border-brand-800/10 dark:border-white/5 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform origin-center`}
                >
                  <img
                    src={item.thumbnail}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle overlays that match a luxury studio feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                      {category}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1 leading-tight flex items-center gap-1.5">
                      {title} <ExternalLink className="w-3.5 h-3.5 text-white/75" />
                    </h3>
                    <p className="text-[11px] text-white/70 font-sans font-light mt-1.5 line-clamp-2 max-w-sm">
                      {description}
                    </p>
                  </div>

                  {/* Absolute visual identifier of aspect ratio preset */}
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10 text-[8px] font-mono text-white/90 uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {ratioClass.replace('aspect-[', '').replace(']', '')} RATIO
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CUSTOM GENERATED RUNNING MARQUEE IMAGE TRACKS */}
        {customTracks.map((track) => {
          let trackItems = [...track.items];
          while (trackItems.length < 10 && track.items.length > 0) {
            trackItems = [...trackItems, ...track.items];
          }

          return (
            <div key={track.id} className="relative w-full overflow-hidden flex whitespace-nowrap group/track py-2">
              <div 
                className="flex gap-4 md:gap-6 animate-marquee-left shrink-0"
                style={{ 
                  animationDuration: `${track.speed}s`,
                  animationDirection: track.direction === 'right' ? 'reverse' : 'normal',
                  width: 'max-content'
                }}
              >
                {trackItems.map((item, index) => {
                  return (
                    <div
                      key={`${track.id}-${item.id}-${index}`}
                      onClick={() => setSelectedItem(item)}
                      className={`h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] ${track.ratio} shrink-0 bg-brand-850 overflow-hidden rounded-[20px] md:rounded-[36px] relative group cursor-pointer border border-brand-800/10 dark:border-white/5 shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform origin-center`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                          {track.title}
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1 leading-tight flex items-center gap-1.5">
                          {item.title} <ExternalLink className="w-3.5 h-3.5 text-white/75" />
                        </h3>
                        <p className="text-[11px] text-white/70 font-sans font-light mt-1.5 line-clamp-2 max-w-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10 text-[8px] font-mono text-white/90 uppercase tracking-widest border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {track.ratio.replace('aspect-[', '').replace(']', '')} RATIO
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Floated delete control overlay for custom running tracks */}
              {isOwnerVerified && (
                <button
                  onClick={() => handleDeleteCustomTrack(track.id)}
                  className="absolute top-4 right-4 z-40 bg-red-650 hover:bg-red-500 text-white font-mono text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md opacity-0 group-hover/track:opacity-100 transition-all cursor-pointer shadow-lg border border-red-500/20"
                  title={language === 'en' ? 'Delete entire track' : 'Hapus seluruh baris'}
                >
                  🗑️ {language === 'en' ? 'Delete Row' : 'Hapus Baris'}
                </button>
              )}
            </div>
          );
        })}

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center mt-12 relative z-10 flex flex-col items-center justify-center gap-4">
        <p className="text-[11px] font-mono dark:text-brand-500 text-brand-400 uppercase tracking-wider flex items-center justify-center gap-2">
          <Info className="w-3.5 h-3.5 text-brand-primary animate-pulse" />
          {t('portfolio.indicator.tap')}
        </p>

        {/* Dynamic Track Addition Activator Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              setIsTrackCreatorOpen(!isTrackCreatorOpen);
              if (!isTrackCreatorOpen) {
                setTimeout(() => {
                  document.getElementById('custom-track-creator-form-target')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
              }
            }}
            className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-full font-mono text-[11px] font-bold uppercase tracking-widest cursor-pointer shadow-lg shadow-brand-primary/20 transform active:scale-95 transition-all inline-flex items-center gap-2 animate-bounce"
          >
            <Plus className="w-4 h-4 text-white" />
            {language === 'en' ? 'Add New Running Grid Column' : 'Tambah Grid Berjalan Baru'}
          </button>
        </div>

        {/* Scroll anchor tag */}
        <div id="custom-track-creator-form-target" />

        {/* Beautiful Expandable Dynamic Creator Section */}
        <AnimatePresence>
          {isTrackCreatorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 15, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full max-w-2xl border rounded-[28px] overflow-hidden text-left p-6 mt-4 ${
                theme === 'dark' 
                  ? 'bg-brand-850/60 border-brand-800' 
                  : 'bg-brand-100 border-brand-200 shadow-sm'
              }`}
            >
              {!isOwnerVerified ? (
                <div className="py-4 text-center space-y-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto text-brand-primary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-900 dark:text-white uppercase tracking-wider">
                      {language === 'en' ? 'Owner Authorization Required' : 'Otorisasi Pemilik Diperlukan'}
                    </h4>
                    <p className="text-[11px] text-brand-400 max-w-xs mx-auto mt-1 leading-relaxed">
                      {language === 'en' 
                        ? 'Adding or editing customized running photo grid collages is restricted strictly to the administrator / web owner.' 
                        : 'Menambah atau mengedit baris kolase gambar berjalan kustom dibatasi khusus untuk pemilik web / administrator.'}
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOwnerGrid} className="max-w-xs mx-auto space-y-3">
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={gridOwnerPassword}
                        onChange={(e) => {
                          setGridOwnerPassword(e.target.value);
                          setGridOwnerError('');
                        }}
                        placeholder={language === 'en' ? 'Enter Owner Password' : 'Masukkan Password Pemilik'}
                        className="w-full px-4 py-2.5 text-xs border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-center outline-none focus:border-brand-primary text-brand-900 dark:text-white"
                      />
                    </div>
                    {gridOwnerError && (
                      <p className="text-[10px] text-red-500 font-mono text-center">
                        ⚠️ {gridOwnerError}
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="submit"
                        className="w-full py-2 bg-brand-primary hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-md transform active:scale-95"
                      >
                        {language === 'en' ? 'Unlock' : 'Buka'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsTrackCreatorOpen(false)}
                        className="w-full py-2 dark:bg-brand-800 bg-brand-200 hover:opacity-90 text-brand-700 dark:text-brand-350 rounded-xl text-xs font-mono font-bold uppercase transition-all"
                      >
                        {language === 'en' ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <h4 className="font-display font-medium text-xs mb-4 border-b pb-2 dark:border-brand-800 border-brand-200 uppercase tracking-widest flex items-center justify-between text-brand-primary">
                    <span className="flex items-center gap-2">⚡ {language === 'en' ? 'Configure New Running Image Grid' : 'Konfigurasi Grid Gambar Berjalan Baru'}</span>
                    <span className="text-[9px] font-mono dark:text-green-400 text-green-600 bg-green-500/10 px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider">
                      <Unlock className="w-2.5 h-2.5" /> {language === 'en' ? 'Authorized' : 'Terotorisasi'}
                    </span>
                  </h4>

                  <form onSubmit={handlePublishCustomTrack} className="space-y-4 font-sans">
                {/* Track Name */}
                <div className="space-y-1 block">
                  <label className="text-[9px] font-mono dark:text-brand-400 text-brand-600 uppercase font-black tracking-wider">
                    {language === 'en' ? 'Grid Topic / Custom Category' : 'Topik Grid / Kategori Kustom'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTrackTitle}
                    onChange={(e) => setNewTrackTitle(e.target.value)}
                    placeholder={language === 'en' ? "e.g. Modern Architecture Selections" : "misal: Koleksi Arsitektur Modern"}
                    className="w-full px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs outline-none focus:border-brand-primary text-brand-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Scrolling Direction */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono dark:text-brand-400 text-brand-600 uppercase font-black tracking-wider">
                      {language === 'en' ? 'Scroller Path Direction' : 'Arah Gerak'}
                    </label>
                    <select
                      value={newTrackDirection}
                      onChange={(e) => setNewTrackDirection(e.target.value as 'left' | 'right')}
                      className="w-full p-2.5 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                    >
                      <option value="left">⬅️ {language === 'en' ? 'Left-ward' : 'Ke Kiri'}</option>
                      <option value="right">➡️ {language === 'en' ? 'Right-ward' : 'Ke Kanan'}</option>
                    </select>
                  </div>

                  {/* Aspect Ratio */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono dark:text-brand-400 text-brand-600 uppercase font-black tracking-wider">
                      {language === 'en' ? 'Photo Framing Proportion' : 'Proporsi Frame Foto'}
                    </label>
                    <select
                      value={newTrackRatio}
                      onChange={(e) => setNewTrackRatio(e.target.value)}
                      className="w-full p-2.5 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs outline-none focus:border-brand-primary text-brand-850 dark:text-white"
                    >
                      <option value="aspect-[16/9]">Landscape (16:9)</option>
                      <option value="aspect-[3/4]">Standard Portrait (3:4)</option>
                      <option value="aspect-[4/5]">Tall Editorial (4:5)</option>
                      <option value="aspect-square">Square Frame (1:1)</option>
                      <option value="aspect-[21/9]">Panoramic Wide (21:9)</option>
                    </select>
                  </div>

                  {/* Scroll Speed */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono dark:text-brand-400 text-brand-600 uppercase font-black tracking-wider flex justify-between">
                      <span>{language === 'en' ? 'Marquee Speed' : 'Kecepatan'}</span>
                      <span className="text-brand-primary font-bold font-mono">{newTrackSpeed}s</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      value={newTrackSpeed}
                      onChange={(e) => setNewTrackSpeed(Number(e.target.value))}
                      className="w-full accent-brand-primary mt-1"
                    />
                  </div>
                </div>

                {/* Image Gathering Pool */}
                <div className="space-y-3 pt-3 border-t dark:border-brand-800 border-brand-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[9px] font-mono dark:text-brand-400 text-brand-600 uppercase font-black tracking-wider">
                      📸 {language === 'en' ? 'Assemble Visuals' : 'Kombinasi Gambar'} ({newTrackUploadedImages.length})
                    </span>
                    <button
                      type="button"
                      onClick={handleSeedAestheticImages}
                      className="px-3 py-1 bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary rounded-lg text-[10px] font-mono font-bold uppercase transition-all tracking-wider"
                    >
                      🪄 {language === 'en' ? 'Seed With Aesthetic Presets' : 'Isi Preset Galeri Estetik'}
                    </button>
                  </div>

                  {/* Drag and Drop inside dynamic creator */}
                  <div
                    onDragEnter={(e) => { e.preventDefault(); setNewTrackDragActive(true); }}
                    onDragOver={(e) => { e.preventDefault(); setNewTrackDragActive(true); }}
                    onDragLeave={() => setNewTrackDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setNewTrackDragActive(false);
                      if (e.dataTransfer.files) {
                        for (let i = 0; i < e.dataTransfer.files.length; i++) {
                          const file = e.dataTransfer.files.item(i);
                          if (file) handleAddNewTrackImageFromFile(file);
                        }
                      }
                    }}
                    className={`border-2 border-dashed rounded-2xl p-4 text-center transition-colors min-h-[90px] flex flex-col items-center justify-center relative cursor-pointer ${
                      newTrackDragActive 
                        ? 'border-brand-primary bg-brand-primary/5' 
                        : 'dark:border-brand-800 border-brand-200 dark:bg-brand-900/30 bg-white/30 hover:border-brand-primary/40'
                    }`}
                  >
                    <p className="text-[10px] font-sans dark:text-brand-300 text-brand-700">
                      {language === 'en' ? 'Drag & drop image files here or' : 'Tarik & lepas file gambar ke sini atau'}{' '}
                      <span className="text-brand-primary underline font-bold">{language === 'en' ? 'browse files' : 'jelajahi berkas'}</span>
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          for (let i = 0; i < e.target.files.length; i++) {
                            const file = e.target.files.item(i);
                            if (file) handleAddNewTrackImageFromFile(file);
                          }
                        }
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>

                  {/* Or Manual URL Add */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTrackUrlInput}
                      onChange={(e) => setNewTrackUrlInput(e.target.value)}
                      placeholder={language === 'en' ? "Alternative: paste direct image link..." : "Alternatif: tempel link gambar langsung..."}
                      className="flex-1 px-3 py-2 border dark:border-brand-800 dark:bg-brand-900 bg-white rounded-xl text-xs outline-none focus:border-brand-primary text-brand-800 dark:text-white font-sans"
                    />
                    <button
                      type="button"
                      onClick={handleAddTrackImageFromUrl}
                      className="px-4 py-2 bg-brand-primary hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase transition-all"
                    >
                      {language === 'en' ? 'Add link' : 'Sematkan'}
                    </button>
                  </div>

                  {/* Thumbnail collection strip */}
                  {newTrackUploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-2.5 rounded-xl dark:bg-brand-900/40 bg-white border dark:border-brand-800 border-brand-200">
                      {newTrackUploadedImages.map((src, idx) => (
                        <div key={idx} className="relative w-11 h-11 rounded-lg overflow-hidden border dark:border-brand-800 border-brand-250 group">
                          <img src={src} alt="" className="w-full h-full object-cover bg-black" />
                          <button
                            type="button"
                            onClick={() => setNewTrackUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-red-600/80 group-hover:opacity-100 opacity-0 flex items-center justify-center text-white text-[9px] font-bold transition-opacity cursor-pointer"
                            title={language === 'en' ? 'Remove image' : 'Hapus gambar'}
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Publish track */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-brand-primary hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-center shadow-md shadow-brand-primary/10"
                  >
                    🚀 {language === 'en' ? 'Initiate Running Grid' : 'Luncurkan Grid Berjalan'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewTrackUploadedImages([]);
                      setNewTrackTitle('');
                      setIsTrackCreatorOpen(false);
                    }}
                    className="px-4 py-3 bg-transparent hover:dark:bg-brand-800 hover:bg-brand-200 text-brand-500 dark:text-brand-400 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    {language === 'en' ? 'Cancel' : 'Batal'}
                  </button>
                </div>
              </form>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* SECTION D: STUNNING POP-UP LIGHTBOX MODAL */}
      {/* ======================================================== */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop blur curtain */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Split layout lightbox card container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 210 }}
              className={`relative w-full max-w-4xl rounded-[32px] overflow-hidden border shadow-2xl flex flex-col md:flex-row z-10 ${
                theme === 'dark' 
                  ? 'bg-brand-900 border-brand-800 text-white' 
                  : 'bg-white border-brand-200 text-brand-900'
              }`}
            >
              {/* Close Button top-right corner */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-55 p-2 rounded-full bg-black/60 hover:bg-brand-primary text-white transition-colors cursor-pointer"
                title="Close Lightbox"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column: Visual view */}
              <div className="w-full md:w-[55%] relative bg-black flex items-center justify-center min-h-[300px] md:min-h-[480px]">
                {selectedItem.videoUrl ? (
                  <video
                    src={selectedItem.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedItem.thumbnail}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover max-h-[500px]"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Media Indicator badge bottom-left */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 text-[9px] font-mono text-white/95 uppercase border border-white/10">
                  <Layers className="w-3 h-3 text-brand-primary animate-pulse" />
                  <span>Interactive Preview</span>
                </div>
              </div>

              {/* Right Column: Case study contextual descriptors */}
              <div className="w-full md:w-[45%] p-8 flex flex-col justify-between text-left">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                      {selectedItem.category}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight leading-tight mt-1.5">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-mono text-[9px] font-bold uppercase dark:text-brand-500 text-brand-400 tracking-wider">
                      {t('portfolio.modal.synopsis')}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed dark:text-brand-300 text-brand-700 font-light">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Geometrics data block */}
                  <div className="pt-4 border-t dark:border-brand-850 border-brand-100 grid grid-cols-2 gap-4 text-left">
                    <div>
                      <span className="text-[9px] font-mono dark:text-brand-500 text-brand-400 block uppercase font-bold text-left">{t('portfolio.modal.coordinate')}</span>
                      <span className="text-[11px] font-mono mt-0.5 block font-semibold dark:text-brand-100 text-brand-800 uppercase">
                        {getRatioClass(selectedItem).replace('aspect-[', '').replace(']', '')} PROP
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono dark:text-brand-500 text-brand-400 block uppercase font-bold text-left">{t('portfolio.modal.status')}</span>
                      <span className="text-[11px] font-mono mt-0.5 block font-semibold text-green-500 uppercase flex items-center gap-1 justify-start">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> LIVE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive action button */}
                <div className="pt-8 border-t dark:border-brand-850 border-brand-100 mt-6 flex flex-col gap-2">
                  <a
                    href={selectedItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-brand-primary text-white font-sans text-xs font-bold uppercase tracking-wide rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-center shadow-lg shadow-brand-primary/10"
                  >
                    {t('portfolio.modal.explore')} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-2.5 bg-transparent text-brand-500 dark:text-brand-400 hover:text-brand-primary text-xs font-mono font-bold uppercase tracking-widest transition-colors"
                  >
                    {t('portfolio.modal.return')}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
