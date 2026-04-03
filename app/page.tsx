import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import DonationCTA from '@/components/home/DonationCTA';
import RecentBlog from '@/components/home/RecentBlog';
import BranchesPreview from '@/components/home/BranchesPreview';

export const metadata: Metadata = {
  title: 'CCASKESA Alumni – Empowering the Next Generation',
  description: 'CCASKESA 1994–1996 Batch – Supporting students through scholarships, computer donations, and community development across 12+ countries.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <DonationCTA />
      <RecentBlog />
      <BranchesPreview />
    </>
  );
}
