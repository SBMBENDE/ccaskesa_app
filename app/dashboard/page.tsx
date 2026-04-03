'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import {
  LayoutDashboard, FileText, FolderOpen, Users, Bell, Settings, Plus,
  TrendingUp, GraduationCap, Monitor, Globe, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { formatRelativeDate } from '@/lib/utils';

const SIDEBAR_LINKS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/blog', icon: FileText, label: 'Blog Posts' },
  { href: '/dashboard/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/dashboard/scholars', icon: GraduationCap, label: 'Scholars' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const pageRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ studentsSupported: 342, computersDonated: 234, countries: 12, activeProjects: 18 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.dash-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#0c1221] border-r border-slate-200 dark:border-slate-800 min-h-screen sticky top-16">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-sky-400 to-blue-700 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-slate-900 dark:text-white text-sm truncate">{user?.name}</div>
              <div className="text-xs text-sky-500 capitalize">{user?.role?.toLowerCase()}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {SIDEBAR_LINKS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">
                Welcome, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here&apos;s what&apos;s happening with CCASKESA.</p>
            </div>
            <Link href="/dashboard/blog/new" className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors">
              <Plus size={16} /> New Post
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: GraduationCap, label: 'Students Supported', value: stats.studentsSupported, color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' },
              { icon: Monitor, label: 'Computers Donated', value: stats.computersDonated, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: Globe, label: 'Countries', value: stats.countries, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: FolderOpen, label: 'Active Projects', value: stats.activeProjects, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="dash-card bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={20} />
                </div>
                <div className={`text-3xl font-black ${color}`}>{value}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Blog posts */}
            <div className="dash-card bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Recent Posts</h3>
                <Link href="/dashboard/blog" className="text-sky-500 text-xs hover:underline flex items-center gap-1">
                  Manage <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {['AGM 2025 Updates', 'Computers Delivered to GTC Kumba', 'Scholarship Applications 2025'].map((title, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-400 truncate">{title}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/blog/new" className="flex items-center gap-1.5 text-sky-500 hover:text-sky-400 text-sm font-medium mt-4 transition-colors">
                <Plus size={14} /> Write a new post
              </Link>
            </div>

            {/* Projects */}
            <div className="dash-card bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-white">Active Projects</h3>
                <Link href="/dashboard/projects" className="text-sky-500 text-xs hover:underline flex items-center gap-1">
                  Manage <ChevronRight size={12} />
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Merit Scholarship 2024', progress: 64 },
                  { title: 'Diaspora Bursary Fund', progress: 62 },
                  { title: '50 Laptops Drive 2025', progress: 40 },
                ].map(({ title, progress }) => (
                  <div key={title} className="py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="flex justify-between text-xs mb-1.5 text-slate-600 dark:text-slate-400">
                      <span className="truncate mr-2">{title}</span>
                      <span className="text-sky-500 font-semibold shrink-0">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-sky-500 to-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="dash-card bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-5">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { type: 'donation', msg: 'New donation: €250 from Marie T.', time: '2 hours ago', color: 'bg-green-500' },
                { type: 'project', msg: 'Project "Scholarship 2024" reached 64% funding', time: '1 day ago', color: 'bg-sky-500' },
                { type: 'member', msg: 'New member joined: Emmanuel Kana (France)', time: '2 days ago', color: 'bg-violet-500' },
                { type: 'post', msg: 'Blog post published: AGM 2025 key decisions', time: '3 days ago', color: 'bg-blue-500' },
              ].map(({ msg, time, color }) => (
                <div key={msg} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${color} mt-1.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{msg}</p>
                    <span className="text-xs text-slate-400">{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
