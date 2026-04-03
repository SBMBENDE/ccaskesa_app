import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// ── GET /api/blog/[id] ────────────────────────
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await prisma.post.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { author: { select: { id: true, name: true, avatar: true, bio: true } } },
    });

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('[blog GET id]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

// ── PUT /api/blog/[id] ────────────────────────
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ success: false, error: 'Post not found.' }, { status: 404 });

    // Only author or admin can edit
    if (post.authorId !== user.userId && user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Forbidden.' }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, excerpt, coverImage, published, branch, tags } = body;

    let slug = post.slug;
    if (title && title !== post.title) {
      slug = slugify(title);
      const existing = await prisma.post.findFirst({ where: { slug, NOT: { id } } });
      if (existing) slug = `${slug}-${Date.now()}`;
    }

    const updated = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title, slug }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(coverImage !== undefined && { coverImage }),
        ...(published !== undefined && { published }),
        ...(branch !== undefined && { branch }),
        ...(tags !== undefined && { tags: JSON.stringify(tags) }),
      },
      include: { author: { select: { id: true, name: true, avatar: true } } },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[blog PUT id]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

// ── DELETE /api/blog/[id] ─────────────────────
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ success: false, error: 'Post not found.' }, { status: 404 });

    if (post.authorId !== user.userId && user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Forbidden.' }, { status: 403 });
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Post deleted.' });
  } catch (error) {
    console.error('[blog DELETE id]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
