'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, BookOpen, Monitor, MapPin, CheckCircle, Clock, Star } from 'lucide-react';

import { CardSkeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: '1',
    title: 'Merit Scholarship Programme 2024',
    description: 'Sponsoring exceptional students from low-income families in the North West and South West regions to continue their secondary and university education.',
    status: 'ONGOING',
    category: 'SCHOLARSHIP',
    icon: BookOpen,
    color: 'from-sky-500 to-blue-600',
    branch: 'cameroon',
    targetAmount: 50000,
    raisedAmount: 32000,
    location: 'Bamenda, Cameroon',
    scholars: 24,
  },
  {
    id: '2',
    title: 'Computer Lab Donation – GTC Kumba',
    description: 'Donated 30 refurbished computers to the Government Technical College Kumba to support ICT education for over 600 students.',
    status: 'COMPLETED',
    category: 'COMPUTERS',
    icon: Monitor,
    color: 'from-emerald-500 to-teal-600',
    branch: 'cameroon',
    targetAmount: 15000,
    raisedAmount: 15000,
    location: 'Kumba, Cameroon',
    scholars: 600,
  },
  {
    id: '3',
    title: 'Diaspora Bursary Fund',
    description: 'A rolling bursary fund providing emergency financial assistance to students facing crisis situations across Europe.',
    status: 'ONGOING',
    category: 'SCHOLARSHIP',
    icon: Star,
    color: 'from-violet-500 to-purple-600',
    branch: 'france',
    targetAmount: 30000,
    raisedAmount: 18500,
    location: 'Europe Wide',
    scholars: 12,
  },
  {
    id: '4',
    title: 'Library Infrastructure Project',
    description: 'Building and furnishing a modern school library at CS Bafoussam to promote reading culture and academic excellence.',
    status: 'PLANNED',
    category: 'INFRASTRUCTURE',
    icon: MapPin,
    color: 'from-orange-500 to-red-600',
    branch: 'cameroon',
    targetAmount: 25000,
    raisedAmount: 5000,
    location: 'Bafoussam, Cameroon',
    scholars: 0,
  },
  {
    id: '5',
    title: '2025 Computer Donation Drive – 50 Laptops',
    description: 'Our next computer donation campaign targeting 5 schools in the North West region. Goal: 50 refurbished laptops.',
    status: 'ONGOING',
    category: 'COMPUTERS',
    icon: Monitor,
    color: 'from-blue-500 to-indigo-700',
    branch: 'uk',
    targetAmount: 20000,
    raisedAmount: 8000,
    location: 'North West Region, Cameroon',
    scholars: 0,
  },
  {
    id: '6',
    title: 'University Scholarship – Batch 2022–2026',
    description: 'Full university scholarships for four outstanding students covering tuition, accommodation, and living expenses for 4 years.',
    status: 'ONGOING',
    category: 'SCHOLARSHIP',
    icon: BookOpen,
    color: 'from-pink-500 to-rose-600',
    branch: 'germany',
    targetAmount: 80000,
    raisedAmount: 62000,
    location: 'Yaoundé, Cameroon',
    scholars: 4,
  },
];

const CATEGORIES = ['ALL', 'SCHOLARSHIP', 'COMPUTERS', 'INFRASTRUCTURE'];
const STATUSES = ['ALL', 'ONGOING', 'COMPLETED', 'PLANNED'];

export default function ProjectsClient() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.project-item',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        );
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [loading]);

  const filtered = PROJECTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'ALL' || p.category === category;
    const matchStatus = status === 'ALL' || p.status === status;
    return matchSearch && matchCat && matchStatus;
  });

  const statusIcon = (s: string) => s === 'COMPLETED' ? <CheckCircle size={12} /> : s === 'ONGOING' ? <Clock size={12} /> : <Star size={12} />;
  const statusColor = (s: string) => s === 'COMPLETED' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : s === 'ONGOING' ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';

  return (
    <div ref={sectionRef} className="min-h-screen pt-20">
      {/* Header */}
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sky-200 text-sm font-medium mb-4">
            Our Work
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Our Projects</h1>
          <p className="text-sky-100/80 text-lg max-w-2xl">
            From scholarships to computer donations, every project represents a real impact on real lives.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#0c1221] border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${category === cat ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${status === s ? 'bg-navy text-white dark:bg-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map(({ id, title, description, status: st, icon: Icon, color, targetAmount, raisedAmount, location, scholars }) => {
                const progress = targetAmount ? Math.min(Math.round((raisedAmount / targetAmount) * 100), 100) : 0;
                return (
                  <div key={id} className="project-item group bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1.5 transition-all duration-300">
                    <div className={`h-44 bg-linear-to-br ${color} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Icon size={80} />
                      </div>
                      <div className="absolute top-3 left-3 right-3 flex justify-between">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${statusColor(st)}`}>
                          {statusIcon(st)} {st}
                        </span>
                        {scholars > 0 && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/30 text-white backdrop-blur-sm">
                            {scholars} {scholars === 1 ? 'scholar' : 'students'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                        <MapPin size={11} /> {location}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug mb-2 group-hover:text-sky-500 transition-colors">
                        {title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>
                      {targetAmount && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs font-medium mb-1.5 text-slate-500 dark:text-slate-400">
                            <span>€{(raisedAmount || 0).toLocaleString('en-US')} raised</span>
                            <span className="text-sky-500">{progress}% of €{targetAmount.toLocaleString('en-US')}</span>
                          </div>
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-sky-500 to-blue-500 rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Link href={`/projects/${id}`} className="flex-1 py-2 text-center text-sm font-semibold border border-sky-500 text-sky-500 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors">
                          Learn More
                        </Link>
                        <Link href="/donate" className="flex-1 py-2 text-center text-sm font-semibold bg-sky-500 text-white rounded-xl hover:bg-sky-400 transition-colors">
                          Support
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
