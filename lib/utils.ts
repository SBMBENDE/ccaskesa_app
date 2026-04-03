import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ── Tailwind class merger ──────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Slug generator ─────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Currency formatter ─────────────────────────
export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

// ── Date formatter ─────────────────────────────
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(dateString);
}

// ── Truncate text ─────────────────────────────
export function truncate(text: string, length = 150): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '…';
}

// ── Parse JSON tags ────────────────────────────
export function parseTags(tagsJson?: string | null): string[] {
  if (!tagsJson) return [];
  try {
    return JSON.parse(tagsJson);
  } catch {
    return [];
  }
}

// ── Status badge colors ────────────────────────
export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    ONGOING: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    COMPLETED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    PLANNED: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    ACTIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    GRADUATED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    SUSPENDED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };
  return map[status] || 'bg-gray-100 text-gray-700';
}

// ── Progress percentage ────────────────────────
export function getProgress(raised?: number | null, target?: number | null): number {
  if (!raised || !target || target === 0) return 0;
  return Math.min(Math.round((raised / target) * 100), 100);
}

// ── Donation impact message ────────────────────
export const DONATION_IMPACTS: Record<number, string> = {
  10: 'Buys school supplies for a student',
  25: 'Covers a month of transportation to school',
  50: 'Supports a student for a full term',
  100: 'Funds a full semester for one student',
  250: 'Donates a refurbished computer to a school',
  500: 'Sponsors a student for an entire school year',
  1000: 'Fully sponsors a university scholarship',
};

export function getImpactMessage(amount: number): string {
  const amounts = Object.keys(DONATION_IMPACTS).map(Number).sort((a, b) => b - a);
  for (const threshold of amounts) {
    if (amount >= threshold) return DONATION_IMPACTS[threshold];
  }
  return 'Contributes to our education mission';
}
