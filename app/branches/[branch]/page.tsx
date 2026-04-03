import type { Metadata } from 'next';
import Link from 'next/link';
import { getBranch, BRANCHES } from '@/lib/branches';
import { notFound } from 'next/navigation';
import { MapPin, Users, Calendar, ArrowRight, MessageCircle } from 'lucide-react';

export async function generateStaticParams() {
  return BRANCHES.map((b) => ({ branch: b.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ branch: string }> }): Promise<Metadata> {
  const { branch: id } = await params;
  const branch = getBranch(id);
  if (!branch) return { title: 'Branch Not Found' };
  return {
    title: branch.name,
    description: branch.description,
  };
}

export default async function BranchPage({ params }: { params: Promise<{ branch: string }> }) {
  const { branch: id } = await params;
  const branch = getBranch(id);
  if (!branch) notFound();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="gradient-hero py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <Link href="/branches" className="text-sky-300 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors">
            ← All Branches
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-7xl">{branch.flag}</span>
            <div>
              <h1 className="text-4xl lg:text-5xl font-black">{branch.name}</h1>
              <p className="text-sky-200 text-lg mt-2">{branch.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mt-10">
            {[
              { icon: Users, label: 'Members', value: branch.memberCount },
              { icon: Calendar, label: 'Established', value: branch.established },
              { icon: MapPin, label: 'Country', value: branch.country },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={20} className="text-sky-300" />
                <div>
                  <div className="text-sky-200 text-xs">{label}</div>
                  <div className="font-bold text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Branch Projects</h2>
            <p className="text-slate-500 dark:text-slate-400">Projects from this branch will appear here once loaded from the database.</p>
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center">
              <p className="text-slate-400">No projects yet.</p>
              <Link href="/donate" className="mt-3 inline-flex items-center gap-1 text-sky-500 hover:text-sky-400 text-sm font-semibold transition-colors">
                Fund the first project <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-[#162032] rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Coordinator</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white font-bold">
                  {branch.coordinator?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{branch.coordinator || 'TBD'}</div>
                  <div className="text-xs text-slate-400">Branch Coordinator</div>
                </div>
              </div>
            </div>

            {branch.whatsappLink && (
              <a
                href={branch.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-4 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold text-sm transition-colors"
              >
                <MessageCircle size={16} /> Join {branch.country} WhatsApp Group
              </a>
            )}

            <Link href="/donate" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-semibold text-sm transition-colors">
              Support This Branch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
