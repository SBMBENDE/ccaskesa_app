'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, Monitor, MapPin } from 'lucide-react';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURED_PROJECTS = [
  {
    id: '1',
    title: 'Merit Scholarship Programme 2024',
    description: 'Sponsoring exceptional students from low-income families in the North West and South West regions to continue their secondary and university education.',
    status: 'ONGOING',
    category: 'SCHOLARSHIP',
    image: null,
    icon: BookOpen,
    color: 'from-sky-500 to-blue-600',
    branch: 'cameroon',
    targetAmount: 50000,
    raisedAmount: 32000,
    location: 'Bamenda, Cameroon',
  },
  {
    id: '2',
    title: 'Computer Lab Donation – GTC Kumba',
    description: 'Donating 30 refurbished computers to the Government Technical College Kumba to support ICT education for over 600 students.',
    status: 'COMPLETED',
    category: 'COMPUTERS',
    image: null,
    icon: Monitor,
    color: 'from-emerald-500 to-teal-600',
    branch: 'cameroon',
    targetAmount: 15000,
    raisedAmount: 15000,
    location: 'Kumba, Cameroon',
  },
  {
    id: '3',
    title: 'Diaspora Bursary Fund',
    description: 'A rolling bursary fund managed by our European chapters providing emergency financial assistance to students facing crisis situations.',
    status: 'ONGOING',
    category: 'SCHOLARSHIP',
    image: null,
    icon: MapPin,
    color: 'from-violet-500 to-purple-600',
    branch: 'france',
    targetAmount: 30000,
    raisedAmount: 18500,
    location: 'Europe Wide',
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
              Featured Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              What We&apos;re <span className="text-gradient">Working On</span>
            </h2>
          </div>
          <Link href="/projects" className="flex items-center gap-2 text-sky-500 hover:text-sky-400 font-semibold text-sm transition-colors group">
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_PROJECTS.map(({ id, title, description, status, icon: Icon, color, targetAmount, raisedAmount, location }) => {
            const progress = targetAmount ? Math.min(Math.round((raisedAmount / targetAmount) * 100), 100) : 0;
            return (
              <div key={id} className="project-card group bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-2 transition-all duration-300">
                {/* Image / Gradient */}
                <div className={`h-48 bg-linear-to-br ${color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Icon size={80} />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm`}>
                      {location}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm ${status === 'COMPLETED' ? 'bg-green-500/40' : 'bg-sky-500/40'}`}>
                      {status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug mb-3 group-hover:text-sky-500 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                    {description}
                  </p>

                  {targetAmount && (
                    <div className="mb-5">
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-500 dark:text-slate-400">
                          €{(raisedAmount || 0).toLocaleString('en-US')} raised
                        </span>
                        <span className="text-sky-500">{progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-sky-500 to-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Goal: €{targetAmount.toLocaleString('en-US')}</div>
                    </div>
                  )}

                  <Link href={`/projects/${id}`} className="flex items-center gap-1 text-sky-500 hover:text-sky-400 text-sm font-semibold transition-colors group">
                    Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
