'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Lock, Globe, Bell, Save } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import toast from 'react-hot-toast';

const BRANCHES = ['France', 'UK', 'Cameroon', 'Germany', 'USA', 'Canada'];

export default function DashboardSettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || '', bio: '', country: '', branch: user?.branch || '' });
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [notifications, setNotifications] = useState({ donations: true, blog: true, projects: true, newsletter: false });

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast.success('Profile updated!');
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) { toast.error('Passwords do not match'); return; }
    if (passwords.next.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setPasswords({ current: '', next: '', confirm: '' });
    toast.success('Password updated!');
  };

  const TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'branch', label: 'Branch', icon: Globe },
  ];

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-white dark:hover:bg-[#162032] transition-colors text-slate-500">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your account preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <nav className="md:col-span-1 space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${activeTab === id ? 'bg-sky-500 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-[#162032]'}`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="md:col-span-3 bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            {activeTab === 'profile' && (
              <form onSubmit={saveProfile} className="space-y-4">
                <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4">Profile Information</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Full Name</label>
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Email</label>
                  <input type="email" defaultValue={user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-sm opacity-60 cursor-not-allowed" />
                  <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Bio</label>
                  <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Tell the community about yourself…" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
                </div>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50">
                  <Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={savePassword} className="space-y-4">
                <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4">Change Password</h2>
                {['current', 'next', 'confirm'].map((field, i) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">{['Current Password', 'New Password', 'Confirm New Password'][i]}</label>
                    <input type="password" value={passwords[field as keyof typeof passwords]} onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1f35] text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  </div>
                ))}
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-50">
                  <Lock size={14} /> {saving ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, val]) => (
                    <label key={key} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')} notifications</p>
                        <p className="text-xs text-slate-400 mt-0.5">Receive email alerts for {key.toLowerCase()} activity</p>
                      </div>
                      <input type="checkbox" checked={val} onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })} className="w-4 h-4 accent-sky-500" />
                    </label>
                  ))}
                </div>
                <button onClick={() => toast.success('Notification preferences saved!')} className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-bold transition-colors">
                  <Save size={14} /> Save Preferences
                </button>
              </div>
            )}

            {activeTab === 'branch' && (
              <div>
                <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-2">Branch Affiliation</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Select your primary branch. This determines which branch-level updates you receive.</p>
                <div className="grid grid-cols-2 gap-3">
                  {BRANCHES.map((b) => (
                    <button key={b} onClick={() => setProfile({ ...profile, branch: b })} className={`p-4 rounded-xl border text-sm font-semibold text-left transition-colors ${profile.branch === b ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-sky-300 dark:hover:border-sky-700'}`}>
                      {b}
                    </button>
                  ))}
                </div>
                <button onClick={() => toast.success('Branch updated!')} className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-bold transition-colors">
                  <Save size={14} /> Save Branch
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
