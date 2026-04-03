import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ── GET /api/donations ────────────────────────
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));

    const [donations, total, sum] = await Promise.all([
      prisma.donation.findMany({
        where: { status: 'COMPLETED' },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: { id: true, amount: true, currency: true, donorName: true, message: true, createdAt: true, method: true },
      }),
      prisma.donation.count({ where: { status: 'COMPLETED' } }),
      prisma.donation.aggregate({ where: { status: 'COMPLETED' }, _sum: { amount: true } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        donations,
        total,
        totalAmount: sum._sum.amount || 0,
      },
    });
  } catch (error) {
    console.error('[donations GET]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

// ── POST /api/donations ───────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency, donorName, email, method, message, projectId } = body;

    if (!amount || !method) {
      return NextResponse.json({ success: false, error: 'Amount and payment method are required.' }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ success: false, error: 'Amount must be greater than zero.' }, { status: 400 });
    }

    const reference = `CCAS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        currency: currency || 'EUR',
        donorName,
        email,
        method,
        message,
        projectId,
        status: 'PENDING', // Updated to COMPLETED after payment confirmation
        reference,
      },
    });

    // In production: redirect to PayPal/Stripe/MTN payment page
    // For now we return the reference for the frontend to handle
    return NextResponse.json({ success: true, data: { donation, reference } }, { status: 201 });
  } catch (error) {
    console.error('[donations POST]', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
