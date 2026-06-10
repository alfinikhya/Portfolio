import { PortfolioItem, TestimonialItem, ServiceItem, ClientLogo, WorkExperience, DesignerProfile } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Brand Identity',
    description: 'We carve distinctive aesthetic styles with pristine typography guidelines, color theories, and conceptual structures that elevate your market presence.',
    tags: ['Strategy', 'Style Guides', 'Logo Systems', 'Typography'],
    iconName: 'Sparkles'
  },
  {
    id: 's2',
    title: 'Interactive Web & Framer',
    description: 'Bespoke front-end developments built on speed, interactive micro-animations, custom canvases, and seamless Framer layouts optimized for conversions.',
    tags: ['React', 'Framer Motion', 'Tailwind', 'SEO Optimization'],
    iconName: 'Fingerprint'
  },
  {
    id: 's3',
    title: '3D & Immersive Motion',
    description: 'High-fidelity three-dimensional animations and organic physics rigs that make products feel physical, tactile, and highly memorable.',
    tags: ['ThreeJS', 'Spline 3D', 'Cinematic Loops', 'Creative Direction'],
    iconName: 'Orbit'
  },
  {
    id: 's4',
    title: 'Mobile First Product Design',
    description: 'Human-centric user interface designs rigorously designed across strict layout rhythms, responsive states, and intuitive task architectures.',
    tags: ['Figma System', 'Prototyping', 'Accessibility', 'UX Audit'],
    iconName: 'Smartphone'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Linea Dynamic System',
    category: 'Interactive Design',
    description: 'A modular, high-fidelity landing architecture built on motion grid coordinates for modern fintech clients seeking pristine interactions.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fluid-grey-and-black-3D-abstract-animation-43187-large.mp4',
    url: 'https://linea.ds',
    featured: true
  },
  {
    id: 'p2',
    title: 'Solstice Luxury Brand',
    category: 'Brand Identity',
    description: 'Elegant rebrand for a solar luxury lifestyle house, spanning high-fashion physical typography, stationery systems, and editorial packaging.',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-particles-looping-background-41584-large.mp4',
    url: 'https://solstice.luxury',
    featured: true
  },
  {
    id: 'p3',
    title: 'Aether 3D Synthesizer',
    category: 'Immersive Dev',
    description: 'Interactive sound sculpting platform showcasing 3D WebGL soundwaves and tactile control knobs built directly on Web Audio specifications.',
    thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-background-with-wavy-lines-41566-large.mp4',
    url: 'https://aether.synth',
    featured: false
  },
  {
    id: 'p4',
    title: 'Hyperion Spatial Suite',
    category: 'UI/UX Design',
    description: 'A comprehensive visual interface suite designed for hardware interfaces, focusing on dynamic layouts and sleek high-contrast components.',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-technological-blue-glowing-dots-loop-41567-large.mp4',
    url: 'https://hyperion.spatial',
    featured: true
  },
  {
    id: 'p5',
    title: 'Helix AI Research Portal',
    category: 'Interactive Design',
    description: 'Next-gen analytics engine visualization interface representing complex sequence pathways with responsive, color-guided nodes.',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-blue-spherical-particles-spinning-smoothly-in-space-41585-large.mp4',
    url: 'https://helix.ai',
    featured: false
  },
  {
    id: 'p6',
    title: 'Krypton Physical Ledger',
    category: 'Brand Identity',
    description: 'Branding and ergonomic engineering mockup series for a titanium cryptographic storage device built on tactical black metal surfaces.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-digital-mesh-glowing-lines-41568-large.mp4',
    url: 'https://krypton.ledger',
    featured: false
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Sienna Sterling',
    position: 'Creative Director',
    company: 'Aether Labs',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    testimonial: 'The level of interactive precision they brought to Solstice was unmatched. They did not just design a static layout; they handcrafted user experiences with flawless transitions. Absolute game-changers.'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    position: 'VP of Product',
    company: 'Linea Financial',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    testimonial: 'Most agencies build websites that look good only in design files. Working with this team felt like we were debugging high-speed software. Every Framer motion was butter-smooth and highly responsive.'
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    position: 'Head of Marketing',
    company: 'Novis Inc',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    testimonial: 'They helped us transition from looking like a traditional tech startup to a premium luxury brand. Our conversion rates spiked by 42% after launching the new spatial interfaces.'
  }
];

export const FAQS = [
  {
    question: 'How long does a customized premium design process take?',
    answer: 'A standard comprehensive design cycle takes between 4 to 8 weeks. This spans from our intense alignment meetings, interactive low-fidelity wireframing, custom motion guidelines, up to the full high-fidelity reactive web architecture.'
  },
  {
    question: 'Are the Framer templates self-servicing and CMS ready?',
    answer: 'Absolutely. Every layout we build utilizes standard CSS models and structured JSON states. Our CMS schema maps directly to Framer, enabling you or your content editors to publish new works, update case studies, and change team photos instantly.'
  },
  {
    question: 'Can you integrate custom WebGL, ThreeJS, or custom physics?',
    answer: 'Yes. We specialize in custom interactive front-ends. We can bundle lightweight Spline instances, native WebGL shaders, or canvas-based physics rigs that keep page load times fast while delivering breathtaking sensory feedback.'
  },
  {
    question: 'Do you offer post-launch optimization and SEO maintenance?',
    answer: 'We design websites with clean semantic HTML tags, pre-rendered metadata structures, and highly optimized image dimensions. After launching, we provide 3 months of analytical telemetry surveillance to guarantee maximum performance ratios.'
  },
  {
    question: 'What is your operational sweet-spot in terms of project size?',
    answer: 'We focus on premium boutique projects that demand immense detail and micro-interactive custom logic. We typically partner with luxury lifestyle houses, series-A tech foundations, and fast-growing creative platforms.'
  }
];

export const CLIENTS_MARQUEE: ClientLogo[] = [
  { id: 'c1', name: 'ZENO TECH', logoSvg: 'ZENO' },
  { id: 'c2', name: 'NEXUS CO.', logoSvg: 'NEXUS' },
  { id: 'c3', name: 'KINETIC', logoSvg: 'KINETIC' },
  { id: 'c4', name: 'ELEVATE', logoSvg: 'ELEVATE' },
  { id: 'c5', name: 'OASIS', logoSvg: 'OASIS' },
  { id: 'c6', name: 'HEXA 3D', logoSvg: 'HEXA' },
  { id: 'c7', name: 'EQUINOX', logoSvg: 'EQUINOX' },
  { id: 'c8', name: 'SPATIAL', logoSvg: 'SPATIAL' }
];

export const INITIAL_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp1',
    company: 'Linea Studio',
    role: 'Lead Interactive Developer',
    duration: '2024 - PRESENT',
    description: 'Orchestrated premium UI structures, buttery-smooth React motion pipelines, and customized Framer components. Led design-engineering alignment to build lightning-fast web applications with zero visual lag.',
    tags: ['React', 'Motion', 'Tailwind', 'WebGL'],
    iconName: 'Cpu'
  },
  {
    id: 'exp2',
    company: 'Aether Labs',
    role: 'Senior UX Engineer',
    duration: '2022 - 2024',
    description: 'Designed and developed immersive three-dimensional spatial dashboards and sensory sound systems. Handcoded customized shaders and interactive canvas environments.',
    tags: ['Three.js', 'Figma', 'Creative System'],
    iconName: 'Compass'
  },
  {
    id: 'exp3',
    company: 'Vanguard Corp',
    role: 'Product Interaction Designer',
    duration: '2020 - 2022',
    description: 'Built high-contrast tactical design architectures and design systems from the absolute ground up. Optimized responsive layout conversions by over 45% using rigorous grid principles.',
    tags: ['UI/UX', 'Design Systems', 'Prototyping'],
    iconName: 'Target'
  },
  {
    id: 'exp4',
    company: 'Krypton Labs',
    role: 'Frontend Developer',
    duration: '2018 - 2020',
    description: 'Maintained and optimized secure cryptographic wallet interfaces, creating highly accessible, pixel-perfect user journeys.',
    tags: ['TypeScript', 'Accessibility', 'Optimization'],
    iconName: 'Layers'
  }
];

export const INITIAL_DESIGNER_PROFILE: DesignerProfile = {
  name: 'Rian Adiputra',
  role: 'Senior Graphic Designer & Brand Architect',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80',
  bio: 'Visual storyteller and brand strategist with a strong focus on custom typography, high-contrast grids, and minimalist illustrations. Over 6 years translating complex modern products into elegant and distinctive visual languages that command marketplace attention.',
  skills: ['Brand Identity Systems', 'Typography Design', 'Vector Illustration', 'Packaging & Print', 'Layout Geometry', 'Color Systems'],
  vanguardTitle: 'Vanguard Philosophy',
  vanguardText: 'We believe that graphic design is visual dialogue, not raw aesthetic decoration. Every border stroke, deliberate grid alignment, type scaling, and negative space margin should intentionally guide the eye, creating sensory clarity and memorable brand impact.',
  vanguardFooter: 'VISUAL HARMONY & CONTRAST',
  engTitle: 'Creative Mastery & Tools',
  engText: 'Armed with the complete Adobe Creative Cloud suite (Illustrator, Photoshop, InDesign) and Figma, I construct fully scalable vector design systems, rich illustration archives, and print-ready files verified for absolute resolution and alignment.',
  engFooter: 'RIGOROUS COHERENCE',
  softwareSkills: [
    { name: 'Adobe Illustrator', level: 95, color: '#FF9A00', short: 'Ai' },
    { name: 'Adobe Photoshop', level: 90, color: '#31A8FF', short: 'Ps' },
    { name: 'Canva', level: 85, color: '#00C4CC', short: 'Cv' },
    { name: 'Adobe After Effects', level: 80, color: '#D291FF', short: 'Ae' }
  ]
};

