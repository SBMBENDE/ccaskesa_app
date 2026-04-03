import type { Metadata } from 'next';
import ProjectsClient from '@/components/projects/ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore CCASKESA projects including scholarships, computer donations, and infrastructure development across our chapters.',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
