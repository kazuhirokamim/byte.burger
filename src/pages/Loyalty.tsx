import {
  Flame,
  Trophy,
  Sparkles,
  Lock,
  Check,
  ArrowRight,
  Calendar,
  ChevronRight,
  Zap,
  Crown,
  Code2,
  Gift,
} from 'lucide-react';
import {
  REWARDS,
  ACHIEVEMENTS,
  ACHIEVEMENTS_LOCKED,
} from '../data/content';
import { LEVELS, type Level, type Mission, type Reward, type OrderHistoryItem } from '../data/menu';
import { LevelBadge } from '../components/LevelBadge';
import { XPBar } from '../components/XPBar';
import { useCart } from '../store/cart';
import { useUser } from '../store/user';
import { formatBRL } from '../lib/format';

const REWARD_TIER_CLS: Record<Reward['tier'], { ring: string; chip: string; label: string }> = {
  comum: { ring: 'border-ink-600', chip: 'text-ink-300 bg-ink-700/50', label: 'comum' },
  raro: { ring: 'border-cyan-500/40', chip: 'text-cyan-300 bg-cyan-500/15', label: 'raro' },
  epico: { ring: 'border-purple-500/40', chip: 'text-purple-300 bg-purple-500/15', label: 'épico' },
  secreto: { ring: 'border-amber-500/40', chip: 'text-amber-300 bg-amber-500/15', label: 'secreto' },
};

const STATUS_LABEL = {
  entregue: { label: 'Entregue', cls: 'text-lime-400 bg-lime-500/10' },
  em_rota: { label: 'A caminho', cls: 'text-cyan-400 bg-cyan-500/10' },
  preparando: { label: 'Preparando', cls: 'text-amber-400 bg-amber-500/10' },
};

export function Loyalty() {
  const { pushToast } = useCart();
  const {
    user,
    currentLevel,
    nextLevel,
    xpInLevel,
    xpToNext,
    missions,
    orderHistory,
    claimMission,
    redeemReward,
  } = useUser();

  return (
    <div className="pt-16">
      {/* HERO PROFILE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div
          className="absolute left-1/2 top-0 h-72 w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[100px]"
          style={{ background: `radial-gradient(circle, ${currentLevel.glow}, transparent 70%)` }}
        />
        <div className="section relative py-12">
          <div className="overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-850/60 backdrop-blur-sm">
            <div
              className="h-28 w-full"
              style={{
                background: `linear-gradient(120deg, ${currentLevel.color}33, transparent 60%), radial-gradient(circle at 80% 0%, ${currentLevel.glow}, transparent 50%)`,
              }}
            >
              <div className="h-full w-full bg-grid opacity-40" />
            </div>

            <div className="grid gap-6 px-6 pb-6 sm:px-8 sm:pb-8 md:grid-cols-[auto_1fr_auto]">
              {/* avatar + identity */}
              <div className="flex items-end gap-4 md:block">
                <div className="relative -mt-12 shrink-0">
                  <div
                    className="grid h-24 w-24 place-items-center overflow-hidden rounded-2xl border-4 border-ink-900 bg-ink-800"
                    style={{ boxShadow: `0 0 30px -6px ${currentLevel.glow}` }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl border-2 border-ink-900"
                    style={{ background: currentLevel.color, boxShadow: `0 0 14px ${currentLevel.color}` }}
                  >
                    <Zap size={16} className="text-ink-950" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* name + xp */}
              <div className="min-w-0 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-2xl font-700 text-white sm:text-3xl">
                    {user.name}
                  </h1>
                  <LevelBadge level={currentLevel} size="md" />
                </div>
                <p className="mono mt-1 text-sm text-ink-300">
                  {user.handle} · membro desde{' '}
                  {new Date(user.joinedAt).toLocaleDateString('pt-BR', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>

                {/* xp bar */}
                <div className="mt-5 max-w-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-300">
                      <span className="font-700 text-white">{user.xp.toLocaleString('pt-BR')}</span> XP
                    </span>
                    <span className="mono text-ink-400">
                      {nextLevel ? `${nextLevel.minXp.toLocaleString('pt-BR')} XP p/ ${nextLevel.name}` : 'máximo'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <XPBar
                      current={xpInLevel}
                      min={0}
                      max={nextLevel ? xpToNext : xpInLevel}
                      color={currentLevel.color}
                      glow={currentLevel.glow}
                    />
                  </div>
                  <p className="mono mt-2 text-[11px] text-ink-400">
                    {nextLevel
                      ? `faltam ${Math.max(0, nextLevel.minXp - user.xp).toLocaleString('pt-BR')} XP para subir de nível`
                      : 'nível máximo alcançado'}
                  </p>
                </div>
              </div>

              {/* quick stats */}
              <div className="grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-2 md:pt-2">
                <StatBox label="streak" value={`${user.currentStreak}d`} icon={<Flame size={14} className="text-flame-500" />} />
                <StatBox label="pontos" value={user.points.toString()} icon={<Sparkles size={14} className="text-amber-400" />} />
                <StatBox label="pedidos" value={orderHistory.length.toString()} icon={<Trophy size={14} className="text-purple-400" />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT: missions + order history + achievements */}
        <div className="space-y-6">
          <MissionsPanel
            missions={missions}
            onClaim={(m) => {
              claimMission(m.id);
              pushToast({
                kind: 'mission',
                title: `Missão concluída: ${m.title}`,
                subtitle: `+${m.xp} XP`,
                xp: m.xp,
              });
            }}
          />
          <OrderHistoryPanel orderHistory={orderHistory} />
          <AchievementsPanel />
        </div>

        {/* RIGHT: rewards + level path */}
        <div className="space-y-6">
          <RewardsPanel
            points={user.points}
            onClaim={(r) => {
              if (redeemReward(r.cost)) {
                pushToast({
                  kind: 'reward',
                  title: `Recompensa resgatada: ${r.title}`,
                  subtitle: r.description,
                });
              }
            }}
          />
          <LevelPathPanel current={currentLevel} xp={user.xp} />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-ink-850/60 px-3 py-2 text-center md:text-left">
      <div className="flex items-center justify-center gap-1.5 md:justify-start">
        {icon}
        <span className="mono text-[10px] uppercase tracking-wider text-ink-400">{label}</span>
      </div>
      <p className="mt-0.5 font-display text-lg font-700 text-white">{value}</p>
    </div>
  );
}

function Panel({
  title,
  icon,
  badge,
  children,
  action,
}: {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-ink-850/50 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-ember-400">
            {icon}
          </div>
          <h3 className="font-display text-base font-700 text-white">{title}</h3>
          {badge && (
            <span className="mono rounded-full bg-ink-700/50 px-2 py-0.5 text-[10px] text-ink-300">
              {badge}
            </span>
          )}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function MissionsPanel({
  missions,
  onClaim,
}: {
  missions: Mission[];
  onClaim: (m: Mission) => void;
}) {
  return (
    <Panel title="Missões" icon={<Flame size={16} />} badge={`${missions.length} ativas`}>
      <div className="space-y-3">
        {missions.map((m) => {
          const done = m.progress >= m.target;
          const pct = Math.min(100, (m.progress / m.target) * 100);
          return (
            <div
              key={m.id}
              className="group rounded-xl border border-white/[0.06] bg-ink-900/50 p-4 transition-all hover:border-white/10"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-all ${
                    done ? 'bg-lime-500/15 text-lime-400' : 'bg-white/[0.04] text-ink-300 group-hover:text-ember-400'
                  }`}
                >
                  <m.icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-600 text-white">{m.title}</p>
                      <p className="mt-0.5 text-xs text-ink-300">{m.description}</p>
                    </div>
                    <span className="mono shrink-0 rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[11px] font-600 text-amber-400">
                      +{m.xp} XP
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-700">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: done ? '#84cc16' : '#f97316',
                          boxShadow: `0 0 10px ${done ? 'rgba(132,204,22,0.5)' : 'rgba(249,115,22,0.5)'}`,
                        }}
                      />
                    </div>
                    <span className="mono text-[11px] text-ink-400">
                      {m.progress}/{m.target}
                    </span>
                    {done ? (
                      <button
                        onClick={() => onClaim(m)}
                        className="animate-badge-pop inline-flex items-center gap-1 rounded-md bg-lime-500/20 px-2 py-1 text-[11px] font-600 text-lime-400 hover:bg-lime-500/30"
                      >
                        <Check size={12} /> resgatar
                      </button>
                    ) : (
                      <span className="mono text-[11px] text-ink-500">em andamento</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {missions.length === 0 && (
          <div className="py-8 text-center">
            <Trophy size={28} className="mx-auto text-ink-500" />
            <p className="mt-2 text-sm text-ink-400">Todas as missões concluídas!</p>
            <p className="mono mt-1 text-[11px] text-ink-500">novas missões a cada semana</p>
          </div>
        )}
      </div>
    </Panel>
  );
}

function OrderHistoryPanel({ orderHistory }: { orderHistory: OrderHistoryItem[] }) {
  return (
    <Panel title="Histórico de pedidos" icon={<Calendar size={16} />} badge="últimos 30d">
      <div className="space-y-2">
        {orderHistory.map((o) => {
          const st = STATUS_LABEL[o.status] || STATUS_LABEL.entregue;
          return (
            <div
              key={o.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-ink-900/50 p-3.5 transition-colors hover:bg-ink-900/80"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="mono text-xs font-600 text-ember-400">{o.code}</span>
                  <span className={`chip text-[10px] ${st.cls}`}>{st.label}</span>
                </div>
                <p className="mt-1 truncate text-sm text-white">{o.items}</p>
                <p className="mono mt-0.5 text-[11px] text-ink-400">
                  {new Date(o.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-base font-700 text-white">{formatBRL(o.total)}</p>
                <p className="mono text-[11px] text-amber-400">+{o.xpEarned} XP</p>
              </div>
            </div>
          );
        })}
        <button className="mt-1 flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-white/10 py-2.5 text-xs text-ink-300 hover:border-ember-500/30 hover:text-ember-400">
          Ver todos os pedidos <ArrowRight size={13} />
        </button>
      </div>
    </Panel>
  );
}

function AchievementsPanel() {
  return (
    <Panel
      title="Conquistas"
      icon={<Trophy size={16} />}
      badge={`${ACHIEVEMENTS.length} / ${ACHIEVEMENTS.length + ACHIEVEMENTS_LOCKED.length}`}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a.id}
            className="group relative overflow-hidden rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3.5 text-center"
          >
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-amber-500/15 text-amber-400 transition-transform group-hover:scale-110">
              <a.icon size={18} />
            </div>
            <p className="mt-2 text-xs font-600 text-white">{a.title}</p>
            <p className="mt-0.5 text-[10px] text-ink-300">{a.description}</p>
            <p className="mono mt-1.5 text-[9px] text-amber-400/70">
              {new Date(a.unlockedAt).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' })}
            </p>
          </div>
        ))}
        {ACHIEVEMENTS_LOCKED.map((a) => (
          <div
            key={a.id}
            className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-ink-900/40 p-3.5 text-center opacity-60"
          >
            <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] text-ink-500">
              <a.icon size={18} />
            </div>
            <p className="mt-2 text-xs font-600 text-ink-200">{a.title}</p>
            <p className="mt-0.5 text-[10px] text-ink-400">{a.description}</p>
            <div className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-ink-800">
              <Lock size={9} className="text-ink-500" />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RewardsPanel({ points, onClaim }: { points: number; onClaim: (r: Reward) => void }) {
  return (
    <Panel
      title="Recompensas"
      icon={<Gift size={16} />}
      badge={`${points} pts`}
    >
      <div className="space-y-2.5">
        {REWARDS.map((r) => {
          const tier = REWARD_TIER_CLS[r.tier];
          const affordable = points >= r.cost;
          return (
            <div
              key={r.id}
              className={`rounded-xl border bg-ink-900/50 p-3.5 transition-all ${tier.ring} ${
                affordable ? 'hover:bg-ink-900/80' : 'opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                    r.tier === 'secreto' ? 'bg-amber-500/15 text-amber-400' : 'bg-white/[0.04] text-ember-400'
                  }`}
                >
                  <r.icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-600 text-white">{r.title}</p>
                      <p className="mt-0.5 text-[11px] text-ink-300">{r.description}</p>
                    </div>
                    <span className={`mono shrink-0 rounded px-1.5 py-0.5 text-[9px] uppercase ${tier.chip}`}>
                      {tier.label}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="mono text-xs text-ink-300">
                      <span className={`font-700 ${affordable ? 'text-lime-400' : 'text-ink-400'}`}>
                        {r.cost}
                      </span>{' '}
                      pts
                    </span>
                    <button
                      onClick={() => affordable && onClaim(r)}
                      disabled={!affordable}
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-600 transition-all ${
                        affordable
                          ? 'bg-ember-500/15 text-ember-400 hover:bg-ember-500/25'
                          : 'bg-white/[0.04] text-ink-500'
                      }`}
                    >
                      {affordable ? (
                        <>resgatar <ArrowRight size={11} /></>
                      ) : (
                        <>
                          <Lock size={10} /> {r.cost - points} pts
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function LevelPathPanel({ current, xp }: { current: Level; xp: number }) {
  return (
    <Panel title="Trilha de carreira" icon={<Crown size={16} />} badge={`${current.name}`}>
      <div className="space-y-1">
        {LEVELS.map((l, i) => {
          const isCurrent = l.id === current.id;
          const isPast = xp >= l.minXp;
          const isFuture = !isPast;
          return (
            <div key={l.id} className="flex gap-3">
              {/* rail */}
              <div className="flex flex-col items-center">
                <div
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 font-display text-xs font-700 transition-all ${
                    isCurrent ? 'animate-badge-pop scale-110' : ''
                  }`}
                  style={{
                    background: isPast ? l.color : '#1d1d26',
                    borderColor: isPast ? l.color : '#3a3a48',
                    color: isPast ? '#0d0d11' : '#6e6e7e',
                    boxShadow: isCurrent ? `0 0 18px ${l.glow}` : 'none',
                  }}
                >
                  {isPast && !isCurrent ? <Check size={13} strokeWidth={3} /> : i + 1}
                </div>
                {i < LEVELS.length - 1 && (
                  <div
                    className="my-1 w-0.5 flex-1"
                    style={{
                      background: isPast ? l.color : '#2e2e3b',
                      minHeight: '24px',
                    }}
                  />
                )}
              </div>

              <div className={`flex-1 pb-3 ${isFuture ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-700" style={{ color: isPast ? l.color : '#9a9aab' }}>
                    {l.name}
                  </p>
                  <span className="mono text-[10px] text-ink-400">
                    {l.minXp.toLocaleString('pt-BR')} XP
                  </span>
                </div>
                {isCurrent ? (
                  <p className="mt-0.5 text-[11px] text-ember-400">► você está aqui</p>
                ) : (
                  <p className="mt-0.5 text-[11px] text-ink-400">{l.tagline}</p>
                )}
                {isPast && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {l.perks.slice(0, 2).map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-0.5 rounded text-[10px]"
                        style={{ color: l.color }}
                      >
                        <ChevronRight size={9} /> {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/10 py-2.5 text-xs text-ink-300 hover:border-ember-500/30 hover:text-ember-400">
        <Code2 size={12} /> ver todos os benefícios
      </button>
    </Panel>
  );
}
