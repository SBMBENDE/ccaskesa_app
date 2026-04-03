'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { useAuth } from '@/components/providers/AuthProvider';
import { slugify } from '@/lib/utils';

const BlogEditor = dynamic(() => import('@/components/blog/BlogEditor'), { ssr: false });

const BRANCHES = ['France', 'UK', 'Cameroon', 'Germany', 'USA', 'Canada'];

export default function NewBlogPostPage() {
  const router = useRouter();
  useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    coverImage: '',
    tags: '',
    branch: '',
    published: false,
    content: '<p>Start writing your post here...</p>',
  });

  const set = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async (publish = false) => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.content || form.content === '<p></p>') { toast.error('Content cannot be empty'); return; }

    setSaving(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title,
          slug: slugify(form.title),
          excerpt: form.excerpt,
          content: form.content,
          coverImage: form.coverImage,
          tags: form.tags,
          branch: form.branch,
          published: publish || form.published,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create post');
      toast.success(publish ? 'Post published!' : 'Draft saved!');
      router.push('/dashboard/blog');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard/blog" className="p-2 rounded-xl hover:bg-white dark:hover:bg-[#162032] transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">New Blog Post</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Write and publish to the CCASKESA blog</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#162032] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Save size={15} /> Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Eye size={15} /> {saving ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Post title…"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full text-3xl font-black bg-transparent border-0 outline-none placeholder-slate-300 dark:placeholder-slate-700 text-slate-900 dark:text-white"
            />
            {form.title && (
              <p className="text-xs text-slate-400 mt-1">Slug: <span className="font-mono">/blog/{slugify(form.title)}</span></p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Excerpt</label>
            <textarea
              rows={2}
              placeholder="Short description for listings and SEO…"
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://…"
              value={form.coverImage}
              onChange={(e) => set('coverImage', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {form.coverImage && (
              <Image src={form.coverImage} alt="cover preview" width={800} height={160} className="mt-3 h-40 w-full object-cover rounded-xl" unoptimized />
            )}
          </div>

          {/* Tags + Branch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="education, donation, alumni…"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Branch</label>
              <select
                value={form.branch}
                onChange={(e) => set('branch', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">All Branches</option>
                {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* TipTap Editor */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Content</label>
            <BlogEditor content={form.content} onChange={(html) => set('content', html)} />
          </div>

          {/* Publish toggle */}
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#162032] rounded-xl border border-slate-200 dark:border-slate-700">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => set('published', e.target.checked)}
              className="w-4 h-4 accent-sky-500"
            />
            <label htmlFor="published" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Publish immediately (uncheck to save as draft)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
