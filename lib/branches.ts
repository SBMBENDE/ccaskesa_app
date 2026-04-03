// Static branch/chapter data for the multi-branch system
// In production, this would come from the database

import { Branch } from '@/types';

export const BRANCHES: Branch[] = [
  // ── Cameroon Branches (home country) ──
  {
    id: 'cameroon-kumba',
    name: 'CCASKESA Kumba',
    country: 'Cameroon',
    flag: '🇨🇲',
    memberCount: 85,
    established: 1996,
    coordinator: 'Barnabas Fomukong',
    description: 'The founding branch, headquartered in Kumba, South West Region.',
    type: 'branch',
  },
  {
    id: 'cameroon-yaounde',
    name: 'CCASKESA Yaoundé',
    country: 'Cameroon',
    flag: '🇨🇲',
    memberCount: 42,
    established: 2000,
    coordinator: 'Celestine Nkwenti',
    description: 'Centre Region branch serving alumni in the capital city.',
    type: 'branch',
  },
  {
    id: 'cameroon-douala',
    name: 'CCASKESA Douala',
    country: 'Cameroon',
    flag: '🇨🇲',
    memberCount: 38,
    established: 2004,
    coordinator: 'Fritz Epie',
    description: 'Littoral Region branch serving the economic capital.',
    type: 'branch',
  },
  {
    id: 'cameroon-buea',
    name: 'CCASKESA Buea',
    country: 'Cameroon',
    flag: '🇨🇲',
    memberCount: 29,
    established: 2007,
    coordinator: 'Mercy Ambe',
    description: 'South West Region branch serving Buea and Limbe.',
    type: 'branch',
  },
  // ── Diaspora Chapters ──
  {
    id: 'france',
    name: 'CCASKESA France',
    country: 'France',
    flag: '🇫🇷',
    memberCount: 45,
    established: 2001,
    coordinator: 'Jean-Paul Mbende',
    description: 'Our largest diaspora chapter, active in Paris and Lyon.',
    type: 'chapter',
  },
  {
    id: 'uk',
    name: 'CCASKESA United Kingdom',
    country: 'United Kingdom',
    flag: '🇬🇧',
    memberCount: 32,
    established: 2003,
    coordinator: 'Samuel Ngome',
    description: 'Active chapter across London, Manchester, and Birmingham.',
    type: 'chapter',
  },
  {
    id: 'germany',
    name: 'CCASKESA Germany',
    country: 'Germany',
    flag: '🇩🇪',
    memberCount: 18,
    established: 2008,
    coordinator: 'Patrick Nkeng',
    description: 'Growing chapter active in Berlin and Hamburg.',
    type: 'chapter',
  },
  {
    id: 'usa',
    name: 'CCASKESA USA',
    country: 'United States',
    flag: '🇺🇸',
    memberCount: 27,
    established: 2010,
    coordinator: 'Cynthia Fomban',
    description: 'Members spread across multiple US states.',
    type: 'chapter',
  },
  {
    id: 'canada',
    name: 'CCASKESA Canada',
    country: 'Canada',
    flag: '🇨🇦',
    memberCount: 14,
    established: 2015,
    coordinator: 'Emmanuel Tanyi',
    description: 'Growing chapter in Toronto and Montreal.',
    type: 'chapter',
  },
];

export function getBranch(id: string): Branch | undefined {
  return BRANCHES.find((b) => b.id === id);
}

export const BRANCH_OPTIONS = BRANCHES.map((b) => ({
  value: b.id,
  label: b.name,
}));
