'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ArrowRight, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMPACTS = [
  { amount: 10, desc: 'Buys school supplies for a student' },
  { amount: 50, desc: 'Supports a student for a full term' },
  { amount: 100, desc: 'Funds a full semester' },
  { amount: 250, desc: 'Donates a refurbished computer' },
  { amount: 500, desc: 'Sponsors a student for a school year' },
  { amount: 1000, desc: 'Fully funds a university scholarship' },
];

export default function DonationCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.impact-item',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%2338bdf8'/%3E%3C/svg%3E")` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sky-200 text-sm font-medium mb-6">
              <Heart size={14} className="fill-current" /> Make a Difference
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Your Donation
              <span className="block text-sky-300">Changes Lives</span>
            </h2>
            <p className="text-sky-100/80 text-lg leading-relaxed mb-8">
              Every euro goes directly to supporting students, donating computers to schools,
              and building educational infrastructure in underserved communities.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/donate">
                <Button variant="sky" size="lg" leftIcon={<Heart size={18} />} className="shadow-2xl">
                  Donate Now
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  See Impact
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Impact grid */}
          <div>
            <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-5">
              <Banknote size={16} className="inline mr-2" /> What your donation does
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {IMPACTS.map(({ amount, desc }) => (
                <Link
                  key={amount}
                  href={`/donate?amount=${amount}`}
                  className="impact-item group p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-sky-400/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-2xl font-black text-sky-300 group-hover:text-sky-200 transition-colors">
                    €{amount}
                  </div>
                  <div className="text-white/70 text-xs leading-snug mt-1.5 group-hover:text-white/90 transition-colors">
                    {desc}
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/donations" className="flex items-center gap-1.5 text-sky-300 hover:text-white mt-4 text-sm font-medium transition-colors group">
              View donation transparency report
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
