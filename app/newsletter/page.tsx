'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const BRANCHES = ['All Branches', 'France', 'UK', 'Cameroon', 'Germany', 'USA', 'Canada'];

export default function NewsletterPage() {
  const [form, setForm] = useState({ name: '', email: '', branch: 'All Branches' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) { toast.error('Name and email are required'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed');
      setSuccess(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {success ? (
          <div className="bg-white dark:bg-[#162032] rounded-3xl border border-slate-200 dark:border-slate-700 p-10 text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">You&apos;re subscribed!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Welcome to the CCASKESA newsletter family. You&apos;ll receive updates straight to your inbox.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#162032] rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Mail size={28} className="text-sky-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Newsletter</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
              Stay up to date with CCASKESA projects, events, and alumni news. No spam, unsubscribe anytime.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0d1f35] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0d1f35] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Branch</label>
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0d1f35] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {BRANCHES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl transition-colors disabled:opacity-50 mt-2">
                {loading ? 'Subscribing…' : 'Subscribe to Newsletter'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
