import type { Metadata } from 'next';
import BlogClient from '@/components/blog/BlogClient';

export const metadata: Metadata = {
  title: 'Updates & Blog',
  description: 'Read the latest news, project updates, and stories from the CCASKESA alumni community.',
};

export default function BlogPage() {
  return <BlogClient />;
}
