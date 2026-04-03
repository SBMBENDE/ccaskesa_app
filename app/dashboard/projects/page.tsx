'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit3, Trash2, ArrowLeft, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatRelativeDate, getProgress } from '@/lib/utils';

const SAMPLE_PROJECTS = [
  { id: '1', title: 'Computers for GTC Kumba', category: 'Education', status: 'IN_PROGRESS', raised: 4200, goal: 6000, createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
  { id: '2', title: 'School Library Fund 2025', category: 'Education', status: 'OPEN', raised: 800, goal: 3000, createdAt: new Date(Date.now() - 15 * 86400000).toISOString() },
  { id: '3', title: 'Scholarship Program Batch 1', category: 'Scholarships', status: 'COMPLETED', raised: 10000, goal: 10000, createdAt: new Date(Date.now() - 90 * 86400000).toISOString() },
  { id: '4', title: 'Bursary for Needy Students', category: 'Scholarships', status: 'OPEN', raised: 1200, goal: 5000, createdAt: new Date(Date.now() - 7 * 86400000).toISOString() },
];

const STATUS_COLORS: Record<string, string> = {
  OPEN: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  IN_PROGRESS: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  COMPLETED: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  CANCELLED: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

export default function DashboardProjectsPage() {
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Education', goal: '', description: '' });
  const [saving, setSaving] = useState(false);

  const filtered = SAMPLE_PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.goal) { toast.error('Title and goal amount are required'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: form.title, category: form.category, goal: Number(form.goal), description: form.description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create project');
      toast.success('Project created!');
      setShowNew(false);
      setForm({ title: '', category: 'Education', goal: '', description: '' });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-white dark:hover:bg-[#162032] transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Projects</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Track and manage fundraising projects</p>
          </div>
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus size={16} /> New Project
          </button>
        </div>

        {/* New Project Form */}
        {showNew && (
          <form onSubmit={handleCreate} className="mb-8 bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-slate-800 dark:text-white text-lg">Create New Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Project Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="e.g. Library Fund 2025" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500">
                  <option>Education</option>
                  <option>Scholarships</option>
                  <option>Infrastructure</option>
                  <option>Community</option>
                  <option>Health</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Funding Goal (€)</label>
                <input type="number" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} required min="1" placeholder="5000" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Description</label>
                <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowNew(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
              <button type="submit" disabled={saving} className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">{saving ? 'Creating…' : 'Create Project'}</button>
            </div>
          </form>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>

        {/* Projects table */}
        <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Created</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filtered.map(({ id, title, category, status, raised, goal, createdAt }) => {
                const pct = getProgress(raised, goal);
                return (
                  <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white text-sm">{title}</div>
                      <div className="text-xs text-slate-400">{category}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-sky-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-sm text-slate-500 dark:text-slate-400">{formatRelativeDate(createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status] || ''}`}>{status.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/projects/${id}`} className="p-1.5 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 text-slate-400 hover:text-sky-500 transition-colors">
                          <TrendingUp size={14} />
                        </Link>
                        <button onClick={() => toast.success('Edit coming soon')} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => toast.success('Delete coming soon')} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
