'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Plus, Award } from 'lucide-react';

const SAMPLE_SCHOLARS = [
  { id: '1', name: 'Eunice Nkwenti', school: 'University of Yaoundé I', program: 'Engineering', year: '3rd Year', amount: 500, status: 'ACTIVE', branch: 'Cameroon' },
  { id: '2', name: 'Boris Tchamba', school: 'GTC Kumba', program: 'Mechanics', year: '2nd Year', amount: 300, status: 'ACTIVE', branch: 'Cameroon' },
  { id: '3', name: 'Sandrine Fonkou', school: 'Université de Lyon', program: 'Medicine', year: '4th Year', amount: 800, status: 'COMPLETED', branch: 'France' },
];

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  COMPLETED: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
};

export default function DashboardScholarsPage() {
  const [showAdd, setShowAdd] = useState(false);

  const totalDisbursed = SAMPLE_SCHOLARS.filter((s) => s.status === 'ACTIVE').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-white dark:hover:bg-[#162032] transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Scholars</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Track scholarship recipients and disbursements</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors">
            <Plus size={16} /> Add Scholar
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-center">
            <GraduationCap size={20} className="text-sky-500 mx-auto mb-2" />
            <p className="text-2xl font-black text-slate-900 dark:text-white">{SAMPLE_SCHOLARS.filter((s) => s.status === 'ACTIVE').length}</p>
            <p className="text-xs text-slate-500">Active Scholars</p>
          </div>
          <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-center">
            <Award size={20} className="text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-black text-slate-900 dark:text-white">{SAMPLE_SCHOLARS.length}</p>
            <p className="text-xs text-slate-500">Total Recipients</p>
          </div>
          <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-center">
            <span className="block text-sky-500 font-black text-xs mb-2">€</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">€{totalDisbursed}</p>
            <p className="text-xs text-slate-500">Active Disbursements</p>
          </div>
        </div>

        {/* Add Scholar Form */}
        {showAdd && (
          <div className="mb-8 bg-white dark:bg-[#162032] border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
            <h2 className="font-bold text-slate-800 dark:text-white mb-4">Add New Scholar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Full Name', 'School / Institution', 'Program', 'Year', 'Annual Amount (€)', 'Branch'].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</label>
                  <input type="text" placeholder={label} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 justify-end mt-4">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
              <button className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors">Add Scholar</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                {['Scholar', 'School', 'Amount/yr', 'Branch', 'Status'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {SAMPLE_SCHOLARS.map(({ id, name, school, program, year, amount, status, branch }) => (
                <tr key={id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{name}</p>
                    <p className="text-xs text-slate-400">{program} · {year}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{school}</td>
                  <td className="px-6 py-4 text-sm font-bold text-sky-600 dark:text-sky-400">€{amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{branch}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[status]}`}>{status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
