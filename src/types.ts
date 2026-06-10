export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  url: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  position: string;
  company: string;
  photo: string;
  testimonial: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoSvg: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  tags: string[];
  iconName: string;
}

export interface DesignerProfile {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  skills: string[];
  vanguardTitle: string;
  vanguardText: string;
  vanguardFooter: string;
  engTitle: string;
  engText: string;
  engFooter: string;
  softwareSkills?: {
    name: string;
    level: number;
    color: string;
    short: string;
  }[];
}

export type Theme = 'dark' | 'light';
