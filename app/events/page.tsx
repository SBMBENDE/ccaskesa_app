'use client';

import Image from 'next/image';

const EVENTS = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dkd3k6eau/image/upload/q_auto/f_auto/v1775528780/WhatsApp_Image_2026-04-07_at_04.24.11_rejzwp.jpg',
    title: 'CCASKESA Event',
    date: 'April 7, 2026',
    description: 'A glimpse into one of our latest CCASKESA community gatherings.',
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      {/* Hero */}
      <section className="py-16 text-center px-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Events</h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Stay connected with CCASKESA alumni events, reunions, and community gatherings from around the world.
        </p>
      </section>

      {/* Events grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map(({ id, src, title, date, description }) => (
            <div
              key={id}
              className="bg-white dark:bg-[#162032] rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={src}
                  alt={title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-sky-500 uppercase tracking-wide mb-1">{date}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
