'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';

const GALLERY_ITEMS = [
  { id: '1', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', caption: 'AGM 2024 – Paris Branch', category: 'Events' },
  { id: '2', src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80', caption: 'Computer Delivery – GTC Kumba', category: 'Projects' },
  { id: '3', src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', caption: 'Library Inauguration', category: 'Projects' },
  { id: '4', src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80', caption: 'Alumni Reunion – London 2023', category: 'Events' },
  { id: '5', src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80', caption: 'Scholarship Award Ceremony', category: 'Scholarships' },
  { id: '6', src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80', caption: 'Study Group – Cameroon Chapter', category: 'Community' },
  { id: '7', src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80', caption: 'Charity Drive – Germany', category: 'Projects' },
  { id: '8', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', caption: 'Cultural Night – Toronto', category: 'Events' },
  { id: '9', src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80', caption: 'Tree Planting – Kumba', category: 'Community' },
];

const CATEGORIES = ['All', 'Events', 'Projects', 'Scholarships', 'Community'];

export default function GalleryPage() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);
  const lightboxItem = GALLERY_ITEMS.find((i) => i.id === lightbox);

  // Animate items in after each category switch
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    gsap.fromTo(
      Array.from(grid.children),
      { opacity: 0, scale: 0.82, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'back.out(1.4)', clearProps: 'transform' },
    );
  }, [active]);

  function switchCategory(cat: string) {
    if (cat === active) return;
    const grid = gridRef.current;
    if (!grid || grid.children.length === 0) {
      setActive(cat);
      return;
    }
    gsap.to(Array.from(grid.children), {
      opacity: 0,
      scale: 0.88,
      y: -12,
      duration: 0.18,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => setActive(cat),
    });
  }

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      {/* Hero */}
      <section className="py-16 text-center px-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Gallery</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Moments captured from our events, projects, and community activities across six countries.
        </p>
      </section>

      {/* Filter tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => switchCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${active === cat ? 'bg-sky-500 text-white' : 'bg-white dark:bg-[#162032] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(({ id, src, caption }) => (
            <button
              key={id}
              onClick={() => setLightbox(id)}
              className="group relative overflow-hidden rounded-2xl aspect-square bg-slate-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <Image src={src} alt={caption} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 p-2 text-white hover:text-sky-400 transition-colors">
            <X size={24} />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full">
            <Image src={lightboxItem.src} alt={lightboxItem.caption} width={1200} height={800} className="w-full max-h-[80vh] object-contain rounded-2xl" unoptimized />
            <p className="text-white text-center mt-4 font-medium">{lightboxItem.caption}</p>
            <p className="text-sky-400 text-center text-sm">{lightboxItem.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
