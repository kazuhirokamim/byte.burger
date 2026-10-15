import { useEffect } from 'react';
import {
  ShoppingCart,
  Sparkles,
  Trophy,
  CheckCircle2,
  Gift,
  Info,
  X,
} from 'lucide-react';
import { useCart, type ToastEvent } from '../store/cart';

const ICON = {
  cart: ShoppingCart,
  xp: Sparkles,
  levelup: Trophy,
  mission: CheckCircle2,
  reward: Gift,
  info: Info,
};

const ACCENT: Record<ToastEvent['kind'], string> = {
  cart: '#f97316',
  xp: '#fbbf24',
  levelup: '#a855f7',
  mission: '#84cc16',
  reward: '#22d3ee',
  info: '#525261',
};

function ToastItem({ t }: { t: ToastEvent }) {
  const { dismissToast } = useCart();
  const Icon = ICON[t.kind];

  useEffect(() => {
    // small entrance handled by animation class
  }, []);

  return (
    <div
      className="animate-slide-up pointer-events-auto relative flex items-start gap-3 rounded-2xl border border-white/10 bg-ink-850/95 p-4 pr-10 shadow-card backdrop-blur-xl"
      style={{
        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.7), 0 0 0 1px ${ACCENT[t.kind]}22`,
      }}
    >
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${ACCENT[t.kind]}1a`, border: `1px solid ${ACCENT[t.kind]}33` }}
      >
        <Icon size={18} style={{ color: ACCENT[t.kind] }} />
        {t.kind === 'xp' && t.xp && (
          <span className="animate-xp-burst pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400">
            +{t.xp} XP
          </span>
        )}
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-white">{t.title}</p>
        {t.subtitle && (
          <p className="mt-0.5 text-xs text-ink-300">{t.subtitle}</p>
        )}
        {t.kind === 'levelup' && (
          <p className="mt-1 text-[11px] font-medium" style={{ color: ACCENT.levelup }}>
            Novas recompensas desbloqueadas
          </p>
        )}
      </div>
      <button
        onClick={() => dismissToast(t.id)}
        className="absolute right-2 top-2 rounded-md p-1 text-ink-400 hover:text-white hover:bg-white/5"
        aria-label="Fechar"
      >
        <X size={14} />
      </button>
      <div
        className="absolute bottom-0 left-0 h-0.5 animate-[bar-fill_4.2s_linear_forwards] rounded-full"
        style={{ background: ACCENT[t.kind], ['--target' as string]: '100%' }}
      />
    </div>
  );
}

export function ToastHost() {
  const { toasts } = useCart();
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-6 right-6 z-[120] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-3"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} t={t} />
      ))}
    </div>
  );
}
