import React from 'react';
import { Theme, PortfolioItem, TestimonialItem, WorkExperience, DesignerProfile } from './types';
import { INITIAL_PORTFOLIO, INITIAL_TESTIMONIALS, INITIAL_EXPERIENCES, INITIAL_DESIGNER_PROFILE } from './data/mockData';
import { motion } from 'motion/react';

// Section components imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import PortfolioGrid from './components/PortfolioGrid';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CmsDashboard from './components/CmsDashboard';
import PopupTransition from './components/PopupTransition';

export default function App() {
  // Theme state - defaults to 'light' for a premium minimal catalog look
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = localStorage.getItem('agency_vibe_theme');
    return (saved as Theme) || 'light';
  });

  const [scrollProgress, setScrollProgress] = React.useState(0);

  // Portfolio items state
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('agency_cms_portfolio_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse portfolio CMS list', e);
      }
    }
    return INITIAL_PORTFOLIO;
  });

  // Testimonials items state
  const [testimonials, setTestimonials] = React.useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('agency_cms_testimonials_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse testimonials CMS list', e);
      }
    }
    return INITIAL_TESTIMONIALS;
  });

  // Work Experiences state
  const [experiences, setExperiences] = React.useState<WorkExperience[]>(() => {
    const saved = localStorage.getItem('agency_cms_experience_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
         console.error('Failed to parse experiences CMS list', e);
      }
    }
    return INITIAL_EXPERIENCES;
  });

  // Graphic Designer Profile state
  const [profile, setProfile] = React.useState<DesignerProfile>(() => {
    const saved = localStorage.getItem('agency_cms_designer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse designer profile list', e);
      }
    }
    return INITIAL_DESIGNER_PROFILE;
  });

  // CMS drawer/panel active toggle
  const [isCmsOpen, setIsCmsOpen] = React.useState(false);

  // Default tab inside the CMS editor
  const [cmsDefaultTab, setCmsDefaultTab] = React.useState<'profile' | 'portfolio' | 'experiences' | 'testimonials'>('experiences');

  // Register global callback so any button across sections can launch CMS directly to a specific tab
  React.useEffect(() => {
    (window as any).openCmsTab = (tab: 'profile' | 'portfolio' | 'experiences' | 'testimonials') => {
      setCmsDefaultTab(tab);
      setIsCmsOpen(true);
    };
    return () => {
      delete (window as any).openCmsTab;
    };
  }, []);

  // Popup transition trigger reference
  const transitionTriggerRef = React.useRef<((targetId: string) => void) | null>(null);

  // Trigger smooth scroll navigation to an element ID with a smooth popup transition
  const handleNavigate = (targetId: string) => {
    if (transitionTriggerRef.current) {
      transitionTriggerRef.current(targetId);
    } else {
      const element = targetId === '#' || targetId === '' ? document.body : document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Sync theme with HTML body classes
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('agency_vibe_theme', theme);
  }, [theme]);

  // Sync portfolio modifications with local storage
  React.useEffect(() => {
    localStorage.setItem('agency_cms_portfolio_list', JSON.stringify(portfolio));
  }, [portfolio]);

  // Sync testimonials modifications with local storage
  React.useEffect(() => {
    localStorage.setItem('agency_cms_testimonials_list', JSON.stringify(testimonials));
  }, [testimonials]);

  // Sync experience modifications with local storage
  React.useEffect(() => {
    localStorage.setItem('agency_cms_experience_list', JSON.stringify(experiences));
  }, [experiences]);

  // Sync designer profile modifications with local storage
  React.useEffect(() => {
    localStorage.setItem('agency_cms_designer_profile', JSON.stringify(profile));
  }, [profile]);

  // Intercept all global anchor hashes for section landing transitions
  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== 'A') {
        target = target.parentElement;
      }
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetSections = ['#about', '#services', '#portfolio', '#testimonials', '#faq', '#cta', '#'];
        if (targetSections.includes(href)) {
          e.preventDefault();
          handleNavigate(href === '#' ? '' : href);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Butter smooth react scroll listener for top indicator bar
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Restores all dynamic CMS databases to default templates
  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to restore all original design items? This deletes custom additions.')) {
      setPortfolio(INITIAL_PORTFOLIO);
      setTestimonials(INITIAL_TESTIMONIALS);
      setExperiences(INITIAL_EXPERIENCES);
      setProfile(INITIAL_DESIGNER_PROFILE);
      setIsCmsOpen(false);
    }
  };

  return (
    <div className={`min-h-screen text-sans transition-colors duration-300 w-full overflow-x-hidden ${
      theme === 'dark' ? 'bg-brand-900 text-white' : 'bg-brand-50 text-brand-900'
    }`}>
      
      {/* Scroll Progress Bar at the top of viewport */}
      <div 
        id="top-scroll-progress" 
        className="fixed top-0 left-0 w-full h-[3.5px] bg-brand-primary z-[99] origin-left pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      
      {/* 1. Navigation Panel bar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        onOpenCms={() => setIsCmsOpen(true)}
        cmsCount={portfolio.length + testimonials.length + experiences.length}
        onNavigate={handleNavigate}
      />

      {/* Main Core Viewport Layout (Sections Stacked) */}
      <motion.main 
        id="main-content-layout"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        {/* 2. Hero segment */}
        <Hero theme={theme} />

        {/* 3. Infinite Client Marquee */}
        <Marquee theme={theme} />

        {/* 4. About Us Bento panel */}
        <About theme={theme} experiences={experiences} profile={profile} />

        {/* 5. Services Column checklist */}
        <Services theme={theme} />

        {/* 6. Case Studies dynamic filtered portfolio grid */}
        <PortfolioGrid portfolioItems={portfolio} setPortfolio={setPortfolio} theme={theme} />

        {/* 7. Testimonials user review slider */}
        <Testimonials testimonials={testimonials} theme={theme} />

        {/* 8. FAQ Accordion panel */}
        <FAQ theme={theme} />

        {/* 9. Booking proposal form call-to-action */}
        <CTA theme={theme} />
      </motion.main>

      {/* 10. Footer brand matrix links */}
      <Footer theme={theme} />

      {/* 11. CMS Live Editor Side Dashboard Overlay */}
      <CmsDashboard
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        portfolio={portfolio}
        setPortfolio={setPortfolio}
        testimonials={testimonials}
        setTestimonials={setTestimonials}
        experiences={experiences}
        setExperiences={setExperiences}
        profile={profile}
        setProfile={setProfile}
        theme={theme}
        onResetAll={handleResetAll}
        defaultTab={cmsDefaultTab}
      />

      {/* 12. Full-screen GSAP Pop-up Transition Lens */}
      <PopupTransition triggerRef={transitionTriggerRef} theme={theme} />
    </div>
  );
}
