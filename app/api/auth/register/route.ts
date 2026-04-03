import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';

// ── POST /api/auth/register ──────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, branch, country } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required.' },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters.' },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists.' },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, branch, country, role: 'MEMBER' },
      select: { id: true, email: true, name: true, role: true, branch: true },
    });

    const token = signToken({ userId: user.id, email: user.email, role: user.role, name: user.name });

    const response = NextResponse.json(
      { success: true, data: { user, token }, message: 'Account created successfully.' },
      { status: 201 },
    );

    response.cookies.set('ccaskesa_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[register]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
