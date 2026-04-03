import type { Metadata } from 'next';
import Link from 'next/link';
import { BRANCHES } from '@/lib/branches';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Branches & Chapters',
  description: 'Explore all CCASKESA branches in Cameroon and diaspora chapters worldwide – France, UK, Germany, USA, and Canada.',
};

export default function BranchesPage() {
  const cameroonBranches = BRANCHES.filter((b) => b.type === 'branch');
  const diasporaChapters = BRANCHES.filter((b) => b.type === 'chapter');

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-[#0a1628]">
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Branches &amp; Chapters</h1>
          <p className="text-sky-100/80 text-lg max-w-xl mx-auto">
            4 branches across Cameroon, and diaspora chapters spanning 5 countries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* Cameroon Branches */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🇨🇲</span>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Cameroon Branches</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">Home country — {cameroonBranches.length} active branches</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cameroonBranches.map(({ id, name, flag, memberCount, established, description }) => (
              <BranchCard key={id} id={id} name={name} flag={flag} memberCount={memberCount} established={established} description={description} badge="Branch" />
            ))}
          </div>
        </section>

        {/* Diaspora Chapters */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌍</span>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Diaspora Chapters</h2>
              <p className="text-sm text-slate-500 dark:text-slate-300">International — {diasporaChapters.length} chapters worldwide</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diasporaChapters.map(({ id, name, flag, memberCount, established, description }) => (
              <BranchCard key={id} id={id} name={name} flag={flag} memberCount={memberCount} established={established} description={description} badge="Chapter" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BranchCard({ id, name, flag, memberCount, established, description, badge }: {
  id: string; name: string; flag: string; memberCount: number; established: number; description?: string; badge: string;
}) {
  return (
    <Link href={`/branches/${id}`}>
      <div className="group p-6 bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{flag}</span>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">{name}</h3>
            <span className="text-xs text-slate-400">Est. {established}</span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-medium">
              {memberCount} members
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
              {badge}
            </span>
          </div>
          <ArrowRight size={15} className="text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
