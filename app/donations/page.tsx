'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Globe, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DonationStats { total: number; count: number; byBranch: Record<string, number>; byMethod: Record<string, number> }
interface RecentDonation { id: string; amount: number; currency: string; method: string; branch: string; anonymous: boolean; name?: string; createdAt: string }

const FUND_ALLOCATION = [
  { label: 'Education Projects', pct: 60, color: 'bg-sky-500' },
  { label: 'Scholarships', pct: 25, color: 'bg-navy-500 bg-blue-700' },
  { label: 'Admin & Ops', pct: 10, color: 'bg-slate-400' },
  { label: 'Emergency Reserve', pct: 5, color: 'bg-yellow-400' },
];

export default function DonationsTransparencyPage() {
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [recent, setRecent] = useState<RecentDonation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations')
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats ?? null);
        setRecent(data.donations ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = stats?.total ?? 0;
  const count = stats?.count ?? 0;

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      {/* Hero */}
      <section className="py-16 text-center px-4 bg-linear-to-b from-[#1e3a8a]/10 to-transparent dark:from-[#1e3a8a]/20">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Donation Transparency</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Every euro donated is accounted for. Here is exactly how funds are raised and allocated.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: DollarSign, label: 'Total Raised', value: formatCurrency(total), color: 'text-sky-500' },
            { icon: Users, label: 'Donors', value: count.toString(), color: 'text-blue-500' },
            { icon: TrendingUp, label: 'Avg Donation', value: count > 0 ? formatCurrency(total / count) : '—', color: 'text-green-500' },
            { icon: Globe, label: 'Branches Contributed', value: stats ? Object.keys(stats.byBranch ?? {}).length.toString() : '—', color: 'text-purple-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <Icon size={20} className={`${color} mb-3`} />
              <p className="text-2xl font-black text-slate-900 dark:text-white">{loading ? '…' : value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Fund allocation */}
        <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">How Funds Are Used</h2>
          <div className="space-y-4">
            {FUND_ALLOCATION.map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{label}</span>
                  <span className="text-slate-500 font-semibold">{pct}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By payment method */}
        {stats?.byMethod && Object.keys(stats.byMethod).length > 0 && (
          <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Donations by Payment Method</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(stats.byMethod).map(([method, amount]) => (
                <div key={method} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <p className="text-lg font-black text-slate-900 dark:text-white">{formatCurrency(amount as number)}</p>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">{method.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent donors */}
        <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Donations</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />)}
            </div>
          ) : recent.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">No donations yet. Be the first!</p>
          ) : (
            <div className="space-y-3">
              {recent.slice(0, 10).map(({ id, amount, currency, method, branch, anonymous, name, createdAt }) => (
                <div key={id} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{anonymous ? 'Anonymous' : (name || 'Member')}</p>
                    <p className="text-xs text-slate-400">{branch} · {method}</p>
                  </div>
                  <p className="font-black text-sky-600 dark:text-sky-400">{currency}{amount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
