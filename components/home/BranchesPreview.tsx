'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin } from 'lucide-react';
import { BRANCHES } from '@/lib/branches';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BranchesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.branch-card',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const displayBranches = BRANCHES.slice(0, 4);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-3">
              <MapPin size={14} /> Global Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Our <span className="text-gradient">Branches</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg">
              CCASKESA alumni are active across multiple countries, each with their own chapter
              and local initiatives.
            </p>
          </div>
          <Link href="/branches" className="flex items-center gap-2 text-sky-500 hover:text-sky-400 font-semibold text-sm transition-colors group">
            All Branches
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {displayBranches.map(({ id, country, flag, memberCount, established }) => (
            <Link key={id} href={`/branches/${id}`}>
              <div className="branch-card group p-6 rounded-2xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-5xl mb-4">{flag}</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1 group-hover:text-sky-500 transition-colors">
                  {country}
                </div>
                <div className="text-xs text-slate-400 mb-3">Est. {established}</div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-xs font-medium">
                  {memberCount} members
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-12 p-8 rounded-2xl bg-linear-to-r from-navy to-blue-800 text-white text-center">
          <div className="text-4xl mb-3">🌍</div>
          <h3 className="font-bold text-xl mb-2">United Across Continents</h3>
          <p className="text-sky-200 text-sm mb-5 max-w-md mx-auto">
            Our alumni network spans Europe, Africa, and North America — united by our shared
            commitment to education and community.
          </p>
          <Link href="/community">
            <button className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 rounded-xl text-sm font-semibold transition-colors">
              Explore Our Community
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
