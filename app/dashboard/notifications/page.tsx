'use client';

import Link from 'next/link';
import { ArrowLeft, BellRing, CheckCheck, Info, AlertTriangle, PartyPopper } from 'lucide-react';

const NOTIFICATIONS = [
  { id: '1', type: 'success', title: 'New donation received', message: 'A €250 donation was made by a member from France.', time: '2 minutes ago', read: false },
  { id: '2', type: 'info', title: 'Blog post published', message: '"AGM 2025 Summary" has been published successfully.', time: '1 hour ago', read: false },
  { id: '3', type: 'milestone', title: 'Project milestone reached', message: '"Computers for GTC Kumba" reached 70% of its funding goal.', time: '3 hours ago', read: true },
  { id: '4', type: 'warning', title: 'Newsletter subscriber', message: 'Barnabas Nfor subscribed to the Cameroon branch newsletter.', time: 'Yesterday', read: true },
  { id: '5', type: 'success', title: 'New member registered', message: 'Jean-Luc Mbella created an account from the UK branch.', time: '2 days ago', read: true },
];

const ICONS: Record<string, { icon: React.ElementType; className: string }> = {
  success: { icon: CheckCheck, className: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  info: { icon: Info, className: 'text-sky-500 bg-sky-50 dark:bg-sky-900/20' },
  warning: { icon: AlertTriangle, className: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
  milestone: { icon: PartyPopper, className: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
};

export default function DashboardNotificationsPage() {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-white dark:hover:bg-[#162032] transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Notifications</h1>
              {unread > 0 && (
                <span className="px-2 py-0.5 bg-sky-500 text-white text-xs font-bold rounded-full">{unread}</span>
              )}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Activity and alerts for your account</p>
          </div>
          <button className="text-sm text-sky-500 hover:text-sky-400 font-semibold transition-colors">Mark all read</button>
        </div>

        {/* Notification list */}
        <div className="space-y-3">
          {NOTIFICATIONS.map(({ id, type, title, message, time, read }) => {
            const { icon: Icon, className } = ICONS[type] || ICONS['info'];
            return (
              <div key={id} className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors ${read ? 'bg-white dark:bg-[#162032] border-slate-200 dark:border-slate-800' : 'bg-sky-50 dark:bg-sky-900/10 border-sky-200 dark:border-sky-800'}`}>
                <div className={`p-2.5 rounded-xl shrink-0 ${className}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{title}</p>
                    {!read && <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{message}</p>
                  <p className="text-xs text-slate-400 mt-2">{time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {NOTIFICATIONS.length === 0 && (
          <div className="text-center py-16">
            <BellRing size={40} className="text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-slate-400">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
