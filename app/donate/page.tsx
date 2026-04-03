import type { Metadata } from 'next';
import { Suspense } from 'react';
import DonateClient from '@/components/donation/DonateClient';

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support CCASKESA\'s mission. Donate via PayPal, Stripe, MTN Mobile Money, or Orange Money to help fund scholarships and computer donations.',
};

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-16 flex items-center justify-center"><div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <DonateClient />
    </Suspense>
  );
}
