import type { Metadata } from 'next';
import CommunityClient from '@/components/community/CommunityClient';

export const metadata: Metadata = {
  title: 'Our Community',
  description: 'CCASKESA alumni are present in 12+ countries. Explore our global community and connect with members worldwide.',
};

export default function CommunityPage() {
  return <CommunityClient />;
}
