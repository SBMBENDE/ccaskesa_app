import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

// ── GET /api/projects/[id] ────────────────────
export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('[project GET id]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

// ── PUT /api/projects/[id] ────────────────────
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.status && { status: body.status }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.branch !== undefined && { branch: body.branch }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.targetAmount !== undefined && { targetAmount: body.targetAmount }),
        ...(body.raisedAmount !== undefined && { raisedAmount: body.raisedAmount }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.startDate !== undefined && { startDate: body.startDate ? new Date(body.startDate) : null }),
        ...(body.endDate !== undefined && { endDate: body.endDate ? new Date(body.endDate) : null }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[project PUT id]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

// ── DELETE /api/projects/[id] ─────────────────
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'ADMIN') return NextResponse.json({ success: false, error: 'Forbidden.' }, { status: 403 });

    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    console.error('[project DELETE id]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
