import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, children, hover, glass }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'glass-dark'
          : 'bg-white dark:bg-[#162032] border-slate-200 dark:border-slate-800',
        hover && 'hover:shadow-xl hover:shadow-navy/10 hover:-translate-y-1 cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('px-6 pt-6 pb-4', className)}>{children}</div>;
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn('font-bold text-slate-900 dark:text-white text-lg', className)}>{children}</h3>;
}
