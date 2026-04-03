'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit3, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { formatRelativeDate } from '@/lib/utils';
import toast from 'react-hot-toast';

const SAMPLE_POSTS = [
  { id: '1', title: 'AGM 2025: Key Decisions and Updates', slug: 'agm-2025', published: true, author: { name: 'Jean-Paul Mbende' }, createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: '2', title: 'Computers Delivered to GTC Kumba', slug: 'computers-gtc-kumba', published: true, author: { name: 'Barnabas Fomukong' }, createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
  { id: '3', title: 'Draft: Summer Newsletter 2025', slug: 'draft-summer-newsletter', published: false, author: { name: 'You' }, createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
];

export default function DashboardBlogPage() {
  useAuth();
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_POSTS.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-white dark:hover:bg-[#162032] transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Blog Posts</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Create, edit, and manage blog content</p>
          </div>
          <Link href="/dashboard/blog/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors">
            <Plus size={16} /> New Post
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Posts list */}
        <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-10 text-center text-slate-400">No posts found.</div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filtered.map(({ id, title, slug, published, author, createdAt }) => (
                  <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white text-sm line-clamp-1">{title}</div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-slate-500 dark:text-slate-400">{author.name}</td>
                    <td className="px-6 py-4 hidden sm:table-cell text-sm text-slate-500 dark:text-slate-400">{formatRelativeDate(createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${published ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                        {published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blog/${slug}`} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/dashboard/blog/${id}/edit`} className="p-1.5 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 text-slate-400 hover:text-sky-500 transition-colors">
                          <Edit3 size={14} />
                        </Link>
                        <button
                          onClick={() => toast.success('Feature coming soon')}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
