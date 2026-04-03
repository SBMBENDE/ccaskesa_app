import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// ── GET /api/blog ─────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(20, parseInt(searchParams.get('limit') || '10'));
    const branch = searchParams.get('branch') || undefined;
    const published = searchParams.get('published');

    // Authenticated users can see unpublished posts
    const user = getUserFromRequest(request);
    const publishedFilter = user ? (published === 'false' ? false : undefined) : true;

    const where = {
      ...(publishedFilter !== undefined && { published: publishedFilter }),
      ...(branch && { branch }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { author: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        items: posts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[blog GET]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

// ── POST /api/blog ────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, coverImage, published, branch, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required.' },
        { status: 400 },
      );
    }

    let slug = slugify(title);
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || content.slice(0, 200),
        coverImage,
        published: published ?? false,
        authorId: user.userId,
        branch,
        tags: tags ? JSON.stringify(tags) : null,
      },
      include: { author: { select: { id: true, name: true, avatar: true } } },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error('[blog POST]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
