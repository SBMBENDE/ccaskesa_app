'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Monitor, Globe, Users, DollarSign, FolderOpen } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color: string;
}

const STATS: Stat[] = [
  { icon: GraduationCap, label: 'Students Supported', value: 342, suffix: '+', color: 'text-sky-400' },
  { icon: Monitor, label: 'Computers Donated', value: 234, suffix: '', color: 'text-blue-400' },
  { icon: Globe, label: 'Countries Reached', value: 12, suffix: '', color: 'text-emerald-400' },
  { icon: Users, label: 'Active Members', value: 560, suffix: '+', color: 'text-violet-400' },
  { icon: DollarSign, label: 'Total Donated (€)', value: 128000, prefix: '€', suffix: '+', color: 'text-yellow-400' },
  { icon: FolderOpen, label: 'Active Projects', value: 18, suffix: '', color: 'text-pink-400' },
];

function AnimatedCounter({ value, suffix = '', prefix = '', color }: { value: number; suffix?: string; prefix?: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={`text-4xl lg:text-5xl font-black ${color}`}>
      {prefix}{count.toLocaleString('en-US')}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-[#0c1221]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4">
            Our Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Real Change, <span className="text-gradient">Real Numbers</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
            Together, we have made a measurable difference in communities across the world.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {STATS.map(({ icon: Icon, label, value, suffix, prefix, color }) => (
            <div
              key={label}
              className="stat-card group p-6 lg:p-8 rounded-2xl bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${color}`}>
                <Icon size={24} />
              </div>
              <AnimatedCounter value={value} suffix={suffix} prefix={prefix} color={color} />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
