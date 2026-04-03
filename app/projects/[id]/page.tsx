import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Target, Users, Calendar, TrendingUp } from 'lucide-react';
import { formatCurrency, formatDate, getProgress } from '@/lib/utils';

const PROJECTS: Record<string, {
  id: string; title: string; category: string; status: string;
  description: string; coverImage: string; raised: number; goal: number;
  beneficiaries: number; branch: string; createdAt: string;
  updates: { date: string; text: string }[];
}> = {
  '1': {
    id: '1', title: 'Computers for GTC Kumba', category: 'Education', status: 'IN_PROGRESS',
    description: 'We are raising funds to purchase and ship refurbished computers to the Government Technical College Kumba, equipping the ICT lab for hundreds of students.',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80',
    raised: 4200, goal: 6000, beneficiaries: 320, branch: 'Cameroon',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updates: [
      { date: new Date(Date.now() - 5 * 86400000).toISOString(), text: '10 computers purchased and awaiting shipping.' },
      { date: new Date(Date.now() - 15 * 86400000).toISOString(), text: 'Fundraising milestone: €4,000 reached!' },
    ],
  },
  '2': {
    id: '2', title: 'School Library Fund 2025', category: 'Education', status: 'OPEN',
    description: 'Building a resource library stocked with textbooks, reference books and learning materials for SONEL staff school students.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80',
    raised: 800, goal: 3000, beneficiaries: 150, branch: 'All Branches',
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updates: [],
  },
};

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((id) => ({ id }));
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  OPEN: { label: 'Open for Donations', className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  COMPLETED: { label: 'Completed', className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS[id];

  if (!project) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 dark:bg-[#0a1628]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-sky-500 hover:text-sky-400 font-semibold">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const pct = getProgress(project.raised, project.goal);
  const statusInfo = STATUS_LABELS[project.status] || { label: project.status, className: '' };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      {/* Cover */}
      {project.coverImage && (
        <div className="w-full h-64 md:h-80 relative overflow-hidden">
          <Image src={project.coverImage} alt={project.title} fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 text-sm mb-8 transition-colors">
          <ArrowLeft size={14} /> All Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${statusInfo.className}`}>{statusInfo.label}</span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{project.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5"><Target size={13} /> {project.category}</span>
                <span className="flex items-center gap-1.5"><Users size={13} /> {project.beneficiaries} beneficiaries</span>
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(project.createdAt)}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About This Project</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Project Updates</h2>
              {project.updates.length === 0 ? (
                <p className="text-slate-400 text-sm">No updates yet.</p>
              ) : (
                <div className="space-y-4">
                  {project.updates.map((update, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-sky-500 mt-2 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 mb-1">{formatDate(update.date)}</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{update.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding card */}
            <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(project.raised)}</span>
                <TrendingUp size={18} className="text-sky-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">raised of {formatCurrency(project.goal)} goal</p>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-linear-to-r from-sky-400 to-sky-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-center">
                <span className="text-3xl font-black text-sky-500">{pct}%</span>
                <p className="text-xs text-slate-400 mt-0.5">funded</p>
              </div>
              {project.status !== 'COMPLETED' && (
                <Link href={`/donate?project=${project.id}`} className="mt-6 block text-center w-full py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-xl font-bold text-sm transition-colors">
                  Donate to This Project
                </Link>
              )}
            </div>

            {/* Share */}
            <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="font-bold text-slate-800 dark:text-white mb-3">Share This Project</h3>
              <p className="text-sm text-slate-500 mb-4">Help us reach our goal by sharing with friends and family.</p>
              <div className="flex gap-2">
                <a href={`https://twitter.com/intent/tweet?text=Support ${encodeURIComponent(project.title)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-semibold bg-sky-50 dark:bg-sky-900/20 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors">Twitter/X</a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-center text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
