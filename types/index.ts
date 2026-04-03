// ──────────────────────────────────────────────
// CCASKESA – Global TypeScript types
// ──────────────────────────────────────────────

export type Role = 'ADMIN' | 'MEMBER';
export type ProjectStatus = 'ONGOING' | 'COMPLETED' | 'PLANNED';
export type DonationMethod = 'PAYPAL' | 'STRIPE' | 'MTN' | 'ORANGE' | 'BANK';
export type ScholarStatus = 'ACTIVE' | 'GRADUATED' | 'SUSPENDED';
export type NotificationType = 'INFO' | 'MILESTONE' | 'REMINDER' | 'PROJECT';
export type GalleryCategory = 'EVENT' | 'PROJECT' | 'BEFORE_AFTER' | 'GRADUATION';

// Branch / Chapter type
export interface Branch {
  id: string;
  name: string;
  country: string;
  flag: string;
  memberCount: number;
  established: number;
  coordinator?: string;
  whatsappLink?: string;
  description?: string;
  type: 'branch' | 'chapter';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  branch?: string;
  country?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  published: boolean;
  authorId: string;
  author: Pick<User, 'id' | 'name' | 'avatar'>;
  branch?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  image?: string;
  branch?: string;
  category?: string;
  targetAmount?: number;
  raisedAmount?: number;
  location?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  donorName?: string;
  email?: string;
  method: DonationMethod;
  message?: string;
  projectId?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference?: string;
  createdAt: string;
}

export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  branch?: string;
  active: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  branch?: string;
  category?: GalleryCategory;
  createdAt: string;
}

export interface Scholar {
  id: string;
  name: string;
  school: string;
  level: 'PRIMARY' | 'SECONDARY' | 'UNIVERSITY';
  status: ScholarStatus;
  startYear: number;
  endYear?: number;
  branch?: string;
  story?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  branch?: string;
  read: boolean;
  createdAt: string;
}

// API response wrapper
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  branch?: string;
  country?: string;
}

// Stats for homepage counters
export interface Stats {
  studentsSupported: number;
  computersDonated: number;
  countries: number;
  totalDonations: number;
  activeProjects: number;
  members: number;
}

// Donation form
export interface DonationFormData {
  amount: number;
  currency: string;
  donorName?: string;
  email?: string;
  method: DonationMethod;
  message?: string;
  projectId?: string;
}
