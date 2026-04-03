'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Users, MessageCircle } from 'lucide-react';
import { BRANCHES } from '@/lib/branches';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CommunityClient() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.branch-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.branches-grid', start: 'top 80%' } },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const totalMembers = BRANCHES.reduce((sum, b) => sum + b.memberCount, 0);

  return (
    <div ref={sectionRef} className="min-h-screen pt-20">
      {/* Hero */}
      <div className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sky-200 text-sm font-medium mb-4">
            <MapPin size={14} /> Global Network
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Our Community</h1>
          <p className="text-sky-100/80 text-xl max-w-2xl mx-auto mb-10">
            CCASKESA alumni are united across 6 official branches, spread across Europe and Africa —
            all working toward one mission.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: 'Branches', value: BRANCHES.length },
              { label: 'Total Members', value: `${totalMembers}+` },
              { label: 'Countries', value: '12+' },
              { label: 'Years Active', value: '30+' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-4xl font-black text-sky-300">{value}</div>
                <div className="text-sky-200 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branches grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">All Branches</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-12">Each branch operates independently while contributing to our shared mission.</p>

        <div className="branches-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map(({ id, name, flag, memberCount, established, description, coordinator }) => (
            <div key={id} className="branch-item group bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl">{flag}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug group-hover:text-sky-500 transition-colors">{name}</h3>
                  <span className="text-sm text-slate-400">Est. {established}</span>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{description}</p>

              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-sky-500" />
                  {memberCount} members
                </span>
                {coordinator && <span className="text-xs">Coordinator: {coordinator}</span>}
              </div>

              <div className="flex gap-2 mt-4">
                <Link href={`/branches/${id}`} className="flex-1 py-2 text-center text-xs font-semibold border border-sky-500 text-sky-500 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors">
                  View Branch
                </Link>
                <a href="#" className="flex-1 py-2 text-center text-xs font-semibold bg-green-500 hover:bg-green-400 text-white rounded-xl transition-colors flex items-center justify-center gap-1">
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div className="bg-slate-50 dark:bg-[#0a1628] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Not Yet a Member?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Join thousands of CCASKESA alumni worldwide. Register your account to connect with your
            branch, post updates, and contribute to our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-sky-500/30">
              Join Now
            </Link>
            <Link href="/donate" className="px-8 py-3.5 border-2 border-navy dark:border-sky-500 text-navy dark:text-sky-400 rounded-xl font-semibold hover:bg-navy/5 dark:hover:bg-sky-500/10 transition-colors">
              Donate Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
