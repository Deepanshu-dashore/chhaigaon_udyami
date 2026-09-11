export type Role = "USER" | "ADMIN" | "INSTRUCTOR" | "MENTOR";

export interface User {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  role: Role;
  avatarUrl?: string | null;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  shortDesc?: string | null;
  thumbnail?: string | null;
  price: number;
  discountedPrice?: number | null;
  level: string;
  isPublished: boolean;
  lessons?: Lesson[];
  createdAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  order: number;
  isFree: boolean;
  duration: number;
  videoId?: string | null;
}

export interface Scheme {
  id: string;
  title: string;
  slug: string;
  ministry: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationUrl?: string | null;
  category: string;
  deadline?: string | null;
  isActive: boolean;
}

export interface StartupGuidance {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  sector: string;
  stage: string;
  resources?: unknown;
  isActive: boolean;
}

export interface MarketLinkage {
  id: string;
  title: string;
  description: string;
  contactPerson?: string | null;
  phone?: string | null;
  email?: string | null;
  location: string;
  category: string;
  verified: boolean;
}
