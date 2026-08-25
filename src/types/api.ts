export type Role = "viewer" | "admin";

export interface Profile {
  id?: number;
  email: string;
  name: string;
  title: string;
  tagline: string;
  objective: string;
  location: string;
  github: string;
  linkedin: string;
  resume_url: string;
  bio: string;
  avatar: string;
  created_at?: string | Date;
  updated_at?: string | Date | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  message: string;
  tokens?: AuthTokens;
  user?: Profile;
}

export interface Project {
  id: number;
  title: string;
  slug?: string;
  category: string;
  status: "live" | "archived" | "beta" | "wip" | string;
  featured?: boolean;
  description: string;
  thumbnail?: string;
  technologies?: string[];
  features?: string[];
  github_url?: string;
  demo_url?: string;
  github?: string;
  demo?: string;
  tags?: string[];
  created_at?: string | Date;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  period?: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  icon?: string;
  order?: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year?: string;
  issueDate?: string | Date | null;
  expirationDate?: string | Date | null;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: "new" | "read" | "replied";
  created_at?: string | Date;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Array<{ name: string; level: number }>;
}
