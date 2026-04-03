'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Heart, CreditCard, Smartphone, Building, CheckCircle, Lock, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getImpactMessage } from '@/lib/utils';
import toast from 'react-hot-toast';

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500, 1000];
const PRESET_AMOUNTS_XAF = [500, 1000, 2000, 5000, 10000, 20000, 50000];
const CURRENCIES = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'Pound' },
  { code: 'USD', symbol: '$', name: 'Dollar' },
  { code: 'XAF', symbol: 'FCFA', name: 'CFA Franc' },
];

const PAYMENT_METHODS = [
  { id: 'PAYPAL', label: 'PayPal', icon: '💳', desc: 'Pay with PayPal or credit card' },
  { id: 'STRIPE', label: 'Card (Stripe)', icon: <CreditCard size={18} />, desc: 'Visa, Mastercard, Amex' },
  { id: 'MTN', label: 'MTN Mobile Money', icon: <Smartphone size={18} />, desc: 'MTN MoMo – Cameroon' },
  { id: 'ORANGE', label: 'Orange Money', icon: <Smartphone size={18} />, desc: 'Orange Money – Cameroon' },
  { id: 'BANK', label: 'Bank Transfer', icon: <Building size={18} />, desc: 'SWIFT / SEPA transfer' },
];

export default function DonateClient() {
  const searchParams = useSearchParams();
  const presetAmount = searchParams.get('amount');

  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [method, setMethod] = useState('STRIPE');
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (presetAmount) setAmount(parseInt(presetAmount));
  }, [presetAmount]);

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;
  const impact = getImpactMessage(finalAmount);
  const currencySymbol = CURRENCIES.find((c) => c.code === currency)?.symbol || '€';
  const activePresets = currency === 'XAF' ? PRESET_AMOUNTS_XAF : PRESET_AMOUNTS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          currency,
          method,
          donorName: isAnonymous ? 'Anonymous' : donorName,
          email: isAnonymous ? undefined : email,
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        toast.error(data.error || 'Something went wrong.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center gradient-hero">
        <div className="max-w-md w-full mx-4 bg-white dark:bg-[#162032] rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Thank You!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Your donation of <strong>{currencySymbol}{finalAmount}</strong> has been received.
          </p>
          <p className="text-sm text-slate-400 mb-8">
            A confirmation will be sent to your email. Your generosity changes lives.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setSuccess(false)} className="px-4 py-2 border border-sky-500 text-sky-500 rounded-xl text-sm font-semibold hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors">
              Donate Again
            </button>
            <a href="/projects" className="px-4 py-2 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
              See Impact
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-[#0a1628]">
      {/* Hero */}
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sky-200 text-sm font-medium mb-4">
            <Heart size={14} className="fill-current" /> Make a Difference
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Donate to CCASKESA</h1>
          <p className="text-sky-100/80 text-lg max-w-xl mx-auto">
            100% of your donation supports students through scholarships, computers, and
            educational resources in underserved communities.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#162032] rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount selection */}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Choose Amount</h3>
                  <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                            setCurrency(c.code);
                            setCustomAmount('');
                            setAmount(c.code === 'XAF' ? 1000 : 50);
                          }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${currency === c.code ? 'bg-navy text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                      >
                        {c.symbol} {c.code}
                      </button>
                    ))}
                  </div>
                  <div className={`grid gap-2 mb-3 ${currency === 'XAF' ? 'grid-cols-4' : 'grid-cols-4'}`}>
                    {activePresets.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setAmount(a); setCustomAmount(''); }}
                        className={`py-3 rounded-xl text-sm font-bold transition-all ${!customAmount && amount === a ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                      >
                        {currency === 'XAF' ? `${a.toLocaleString('en-US')} F` : `${currencySymbol}${a}`}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">{currencySymbol}</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Other amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  {/* Impact message */}
                  {finalAmount > 0 && (
                    <div className="mt-3 p-3 rounded-xl bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 text-sm flex items-center gap-2">
                      <Heart size={14} className="shrink-0 fill-current text-sky-400" />
                      {currencySymbol}{finalAmount} – {impact}
                    </div>
                  )}
                </div>

                {/* Payment method */}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map(({ id, label, icon, desc }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setMethod(id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${method === id ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
                      >
                        <span className="text-lg shrink-0">{typeof icon === 'string' ? icon : <span className="text-sky-500">{icon}</span>}</span>
                        <div>
                          <div className={`text-sm font-semibold ${method === id ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'}`}>{label}</div>
                          <div className="text-xs text-slate-400">{desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {method === 'BANK' && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-600 dark:text-slate-400">
                      <strong>Bank Details:</strong><br />
                      IBAN: FR76 1234 5678 9012 3456 7890 123<br />
                      BIC: BNPAFRPP<br />
                      Reference: CCASKESA-DONATION
                    </div>
                  )}
                </div>

                {/* Donor info */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Donor Information</h3>
                    <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
                      <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="rounded" />
                      Donate anonymously
                    </label>
                  </div>
                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                        <input
                          type="email"
                          placeholder="Receipt email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Message (optional)</label>
                    <textarea
                      placeholder="Leave a message of support..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="sky"
                  size="lg"
                  isLoading={isLoading}
                  leftIcon={<Heart size={18} />}
                  className="w-full justify-center shadow-xl shadow-sky-500/30"
                >
                  Donate {currencySymbol}{finalAmount || '—'}
                </Button>

                <div className="flex items-center gap-1.5 justify-center text-xs text-slate-400">
                  <Lock size={12} /> Secure & encrypted · <Shield size={12} /> 100% to education
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trust badges */}
            <div className="bg-white dark:bg-[#162032] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Why Donate?</h4>
              <ul className="space-y-4">
                {[
                  { icon: '🎓', text: '342+ students directly supported since 1996' },
                  { icon: '💻', text: '234 computers donated to schools' },
                  { icon: '🌍', text: 'Impact in 12+ countries' },
                  { icon: '✅', text: '100% of funds go to education programmes' },
                  { icon: '📊', text: 'Full transparency reports published annually' },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-base shrink-0">{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent donors */}
            <div className="bg-linear-to-br from-navy to-blue-700 rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-4">Recent Supporters</h4>
              <div className="space-y-3">
                {[
                  { name: 'Marie T.', amount: 250, currency: '€', time: '2 hours ago' },
                  { name: 'Anonymous', amount: 100, currency: '€', time: '1 day ago' },
                  { name: 'Emmanuel K.', amount: 500, currency: '€', time: '3 days ago' },
                ].map(({ name, amount, currency: cur, time }) => (
                  <div key={name + time} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <div>
                      <div className="font-semibold text-sm">{name}</div>
                      <div className="text-sky-300 text-xs">{time}</div>
                    </div>
                    <div className="text-sky-300 font-bold">{cur}{amount}</div>
                  </div>
                ))}
              </div>
              <a href="/donations" className="flex items-center gap-1 text-sky-300 hover:text-white text-sm mt-3 transition-colors group">
                View all donations <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
