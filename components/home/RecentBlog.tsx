'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SAMPLE_POSTS = [
  {
    id: '1',
    title: 'AGM 2025: Key Decisions and Updates from Our Annual General Meeting',
    slug: 'agm-2025-key-decisions',
    excerpt: 'Our annual general meeting brought together members from 6 countries to review our impact, elect new leadership, and plan for the year ahead.',
    coverImage: null,
    author: { name: 'Jean-Paul Mbende' },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['AGM', 'Governance'],
  },
  {
    id: '2',
    title: '30 Computers Delivered to GTC Kumba – A Day We Will Remember',
    slug: 'computers-delivered-gtc-kumba',
    excerpt: 'On a bright Tuesday morning, our team arrived in Kumba with 30 refurbished laptops for the Government Technical College. Here is the story.',
    coverImage: null,
    author: { name: 'Barnabas Fomukong' },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Computers', 'Impact'],
  },
  {
    id: '3',
    title: 'Scholarship Applications Now Open for the 2025/2026 Academic Year',
    slug: 'scholarship-applications-2025',
    excerpt: 'We are pleased to announce that scholarship applications for the 2025/2026 batch are now open. Eligible students can apply until 30th September.',
    coverImage: null,
    author: { name: 'Cynthia Fomban' },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['Scholarships', 'Applications'],
  },
];

export default function RecentBlog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-[#0c1221]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-sm font-medium mb-3">
              Latest Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              News & <span className="text-gradient">Updates</span>
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-sky-500 hover:text-sky-400 font-semibold text-sm transition-colors group">
            All Posts
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-6">
          {SAMPLE_POSTS.map(({ id, title, slug, excerpt, author, createdAt, tags }) => (
            <Link key={id} href={`/blog/${slug}`}>
              <article className="blog-card group p-6 lg:p-8 rounded-2xl bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6">
                {/* Color accent */}
                <div className="hidden md:block w-1.5 h-20 bg-linear-to-b from-sky-400 to-blue-600 rounded-full shrink-0" />

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={12} />
                      {author.name}
                    </span>
                    {tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xl leading-snug mb-2 group-hover:text-sky-500 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {excerpt}
                  </p>
                </div>

                <ArrowRight size={20} className="text-slate-300 dark:text-slate-600 group-hover:text-sky-500 group-hover:translate-x-1 transition-all shrink-0" />
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
