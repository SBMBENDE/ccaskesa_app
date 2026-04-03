import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ── POST /api/newsletter ──────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, branch } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Valid email is required.' }, { status: 400 });
    }

    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      create: { email, name, branch, active: true },
      update: { active: true, name, branch },
    });

    return NextResponse.json({
      success: true,
      data: subscriber,
      message: 'You have been subscribed to our newsletter!',
    });
  } catch (error) {
    console.error('[newsletter POST]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
