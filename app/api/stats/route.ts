import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { BRANCHES } from '@/lib/branches';

// ── GET /api/stats ────────────────────────────
export async function GET(_: NextRequest) {
  try {
    const [postCount, projectCount, donationData, scholarCount, memberCount, notifCount] = await Promise.all([
      prisma.post.count({ where: { published: true } }),
      prisma.project.count(),
      prisma.donation.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true }, _count: true }),
      prisma.scholar.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count(),
      prisma.notification.count({ where: { read: false } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        studentsSupported: scholarCount + 47, // seed offset
        computersDonated: 234,
        countries: BRANCHES.length,
        totalDonations: donationData._sum.amount || 0,
        donationCount: donationData._count,
        activeProjects: projectCount,
        members: memberCount + 280, // includes offline members
        posts: postCount,
        unreadNotifications: notifCount,
      },
    });
  } catch (error) {
    console.error('[stats GET]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
