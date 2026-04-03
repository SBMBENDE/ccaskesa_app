'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, Plus } from 'lucide-react';
import { BlogCardSkeleton } from '@/components/ui/Skeleton';
import { formatRelativeDate } from '@/lib/utils';
import { useAuth } from '@/components/providers/AuthProvider';

const SAMPLE_POSTS = [
  {
    id: '1', title: 'AGM 2025: Key Decisions and Updates from Our Annual General Meeting',
    slug: 'agm-2025-key-decisions',
    excerpt: 'Our annual general meeting brought together members from 6 countries to review our impact, elect new leadership, and plan for the year ahead.',
    author: { name: 'Jean-Paul Mbende', avatar: null },
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    tags: ['AGM', 'Governance'], color: 'from-sky-500 to-blue-600',
  },
  {
    id: '2', title: '30 Computers Delivered to GTC Kumba – A Day We Will Remember',
    slug: 'computers-delivered-gtc-kumba',
    excerpt: 'On a bright Tuesday morning, our team arrived in Kumba with 30 refurbished laptops for the Government Technical College.',
    author: { name: 'Barnabas Fomukong', avatar: null },
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    tags: ['Computers', 'Impact'], color: 'from-emerald-500 to-teal-600',
  },
  {
    id: '3', title: 'Scholarship Applications Now Open for 2025/2026 Academic Year',
    slug: 'scholarship-applications-2025',
    excerpt: 'We are pleased to announce that scholarship applications for the 2025/2026 batch are now open. Apply before September 30th.',
    author: { name: 'Cynthia Fomban', avatar: null },
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    tags: ['Scholarships', 'Applications'], color: 'from-violet-500 to-purple-600',
  },
  {
    id: '4', title: 'Meet Our 2024 Scholars – Impact Stories That Inspire',
    slug: 'scholars-2024-impact-stories',
    excerpt: 'This year, 24 students received our merit scholarships. We share their stories, their struggles, and their dreams for the future.',
    author: { name: 'Samuel Ngome', avatar: null },
    createdAt: new Date(Date.now() - 35 * 86400000).toISOString(),
    tags: ['Scholarships', 'Stories'], color: 'from-orange-500 to-red-600',
  },
  {
    id: '5', title: 'CCASKESA UK Chapter Raises €8,000 at Annual Fundraiser',
    slug: 'uk-fundraiser-2024',
    excerpt: 'The CCASKESA UK chapter held their annual fundraising dinner, attracting over 80 guests and raising €8,000 for computer donations.',
    author: { name: 'Patrick Nkeng', avatar: null },
    createdAt: new Date(Date.now() - 50 * 86400000).toISOString(),
    tags: ['Fundraising', 'UK'], color: 'from-blue-500 to-indigo-700',
  },
];

export default function BlogClient() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { setTimeout(() => setLoading(false), 600); }, []);

  const filtered = SAMPLE_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sky-200 text-sm font-medium mb-4">
              Community Voice
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-4">Updates & Blog</h1>
            <p className="text-sky-100/80 text-lg max-w-xl">
              News, stories, and updates from our alumni community around the world.
            </p>
          </div>
          {isAuthenticated && (
            <Link href="/dashboard/blog/new" className="flex items-center gap-2 px-5 py-3 bg-white text-navy rounded-xl font-semibold text-sm hover:bg-sky-50 transition-colors shrink-0">
              <Plus size={16} /> Write Post
            </Link>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map(({ id, title, slug, excerpt, author, createdAt, tags, color }) => (
              <Link key={id} href={`/blog/${slug}`}>
                <article className="group h-full bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                  <div className={`h-44 bg-linear-to-br ${color} shrink-0`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug mb-3 group-hover:text-sky-500 transition-colors flex-1">
                      {title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-linear-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                          {author.name.charAt(0)}
                        </div>
                        {author.name.split(' ')[0]}
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatRelativeDate(createdAt)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
