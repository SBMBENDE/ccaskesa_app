'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRight, Heart, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const particle1 = useRef<HTMLDivElement>(null);
  const particle2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2')
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

      // Floating particles
      gsap.to(particle1.current, { y: -20, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(particle2.current, { y: 15, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center gradient-hero overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0v60M60 0v60M0 0h60M0 60h60' stroke='%2338bdf8' strokeWidth='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating blobs */}
      <div ref={particle1} className="absolute top-20 right-20 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl" />
      <div ref={particle2} className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sky-200 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            CCAS KUMBA - Since 1973
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            CCASKESA
            <span className="block text-sky-300">Alumni</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-semibold text-sky-200 tracking-wide mb-4">
            Empowering Students. Transforming Futures.
          </p>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-sky-100/90 max-w-2xl leading-relaxed mb-10"
          >
            CCASKESA Alumni connects graduates worldwide to support education through 
            scholarships, computer donations, and community-driven initiatives.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Link href="/donate">
              <Button
                variant="sky"
                size="xl"
                leftIcon={<Heart size={20} />}
                className="shadow-2xl shadow-sky-500/40 hover:scale-105 transition-transform"
              >
                Donate & Change a Life
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                size="xl"
                rightIcon={<ArrowRight size={20} />}
                className="border-white/40 text-white hover:bg-white/10 hover:border-white"
              >
                View Projects
              </Button>
            </Link>
            <Link href="/community">
              <button className="flex items-center gap-2 text-sky-200 hover:text-white transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                  <PlayCircle size={22} />
                </div>
                <span className="text-sm font-medium">Our Story</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs">
        <span>Scroll to explore</span>
        <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
