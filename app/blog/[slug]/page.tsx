import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Globe } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// Sample data – replace with Prisma query when DB is running
const POSTS: Record<string, {
  id: string; title: string; slug: string; excerpt: string; content: string;
  coverImage: string; tags: string; branch: string; published: boolean;
  author: { name: string }; createdAt: string;
}> = {
  'agm-2025': {
    id: '1', title: 'AGM 2025: Key Decisions and Updates', slug: 'agm-2025',
    excerpt: 'Our Annual General Meeting brought together alumni from 6 countries to chart the course for 2025.',
    content: `<h2>Welcome to the 2025 AGM Summary</h2><p>This year's AGM was held virtually across six branches. Members discussed the upcoming computer project, scholarship fund deadlines, and the new digital platform launch.</p><h2>Key Decisions</h2><ul><li>Computer project target raised to €6,000</li><li>Scholarship applications open until 31 August 2025</li><li>New website to launch Q3 2025</li></ul><p>Thank you to everyone who participated!</p>`,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    tags: 'AGM,updates,alumni', branch: 'All Branches', published: true,
    author: { name: 'Jean-Paul Mbende' }, createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  'computers-gtc-kumba': {
    id: '2', title: 'Computers Delivered to GTC Kumba', slug: 'computers-gtc-kumba',
    excerpt: 'We are proud to announce the delivery of 10 refurbished computers to GTC Kumba.',
    content: `<h2>A Milestone for Education</h2><p>Thanks to the incredible generosity of our members across Europe, we successfully funded and delivered 10 refurbished computers to the Government Technical College Kumba.</p><p>The computers will be used in the ICT lab, serving over 300 students per term.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80',
    tags: 'education,computers,Cameroon', branch: 'Cameroon', published: true,
    author: { name: 'Barnabas Fomukong' }, createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
};

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS[slug];

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 dark:bg-[#0a1628]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-sky-500 hover:text-sky-400 font-semibold">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()) : [];

  return (
    <div className="min-h-screen pt-16 bg-slate-50 dark:bg-[#0a1628]">
      {/* Cover */}
      {post.coverImage && (
        <div className="w-full h-72 md:h-96 relative overflow-hidden">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 text-sm mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1"><User size={13} /> {post.author.name}</span>
          <span className="flex items-center gap-1"><Calendar size={13} /> {formatDate(post.createdAt)}</span>
          {post.branch && <span className="flex items-center gap-1"><Globe size={13} /> {post.branch}</span>}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">{post.title}</h1>

        {/* Excerpt */}
        {post.excerpt && <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{post.excerpt}</p>}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-xs rounded-full font-medium">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 mb-8" />

        {/* Content */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-a:text-sky-500 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex items-center justify-between">
          <Link href="/blog" className="text-sky-500 hover:text-sky-400 font-semibold text-sm transition-colors">
            ← All Posts
          </Link>
          <Link href="/donate" className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-colors">
            Support Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
