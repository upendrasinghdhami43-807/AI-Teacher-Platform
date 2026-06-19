import { cn } from '@/lib/utils';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({ width, height, borderRadius = '8px', className }: SkeletonProps) {
  return (
    <div
      className={cn('skeleton-shine', className)}
      style={{ width: width ?? '100%', height: height ?? '20px', borderRadius }}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('card-base p-5 space-y-4', className)}>
      <Skeleton height="160px" borderRadius="8px" />
      <Skeleton width="70%" height="16px" />
      <Skeleton width="90%" height="12px" />
      <Skeleton width="50%" height="12px" />
      <div className="flex gap-2">
        <Skeleton width="60px" height="24px" borderRadius="12px" />
        <Skeleton width="60px" height="24px" borderRadius="12px" />
      </div>
    </div>
  );
}
