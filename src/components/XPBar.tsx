import { useEffect, useState } from 'react';

interface XPBarProps {
  current: number;
  min: number;
  max: number;
  color?: string;
  glow?: string;
  height?: 'sm' | 'md';
  animate?: boolean;
}

export function XPBar({
  current,
  min,
  max,
  color = '#f97316',
  glow = 'rgba(249,115,22,0.4)',
  height = 'md',
  animate = true,
}: XPBarProps) {
  const range = max - min;
  const pct = Math.max(0, Math.min(100, ((current - min) / range) * 100));
  const [shown, setShown] = useState(animate ? 0 : pct);

  useEffect(() => {
    if (!animate) {
      setShown(pct);
      return;
    }
    const t = setTimeout(() => setShown(pct), 120);
    return () => clearTimeout(t);
  }, [pct, animate]);

  const h = height === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div
      className={`${h} w-full overflow-hidden rounded-full bg-ink-700/80`}
      style={{
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)',
      }}
    >
      <div
        className="relative h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${shown}%`,
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          boxShadow: `0 0 16px ${glow}`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2.5s linear infinite',
          }}
        />
      </div>
    </div>
  );
}
