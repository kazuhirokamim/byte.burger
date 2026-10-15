import {
  ArrowRight,
  Flame,
  Zap,
  Trophy,
  ChevronRight,
  Star,
  Sparkles,
} from 'lucide-react';
import { LevelBadge } from '../components/LevelBadge';
import { LEVELS } from '../data/menu';
import { BENEFITS, HOW_IT_WORKS } from '../data/content';
import { useUser } from '../store/user';
import type { Page } from '../components/Navbar';

interface HomeProps {
  onNavigate: (p: Page) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { user, currentLevel, nextLevel, progressPct, missions } = useUser();
  const activeMission = missions[0];
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div
          className="absolute left-1/2 top-0 h-[480px] w-[680px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)' }}
        />

        <div className="section relative grid items-center gap-14 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/[0.08] px-3 py-1.5 text-xs text-ember-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
              </span>
              Novo: Kernel Chicken disponível
              <ChevronRight size={12} />
            </div>

            <h1 className="mt-6 font-display text-5xl font-700 leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Deploy de sabor.
              <br />
              <span className="text-gradient glow-text">Commit</span> de
              <br />
              fidelidade.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-200 sm:text-lg">
              A hamburgueria que roda em produção. Peça, ganhe XP, suba de nível
              e desbloqueie recompensas secretas em um ecossistema pensado como
              uma startup de tecnologia.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('menu')}
                className="btn-primary group px-6 py-3.5 text-base"
              >
                <Flame size={18} />
                Fazer Pedido
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => onNavigate('loyalty')}
                className="btn-outline px-6 py-3.5 text-base"
              >
                <Trophy size={18} />
                Programa de Fidelidade
              </button>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[712513, 1681010, 936229, 220453].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-ink-950 object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-0.5 text-ink-300">
                  <span className="font-semibold text-white">+12.480</span> devs
                  no ecossistema
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-ember-500/20 via-flame-500/10 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-850/60 shadow-card">
                <img
                  src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Stack Burger"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent p-6 pt-20">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="mono text-[11px] uppercase tracking-widest text-ember-400">
                        feature.burger
                      </p>
                      <h3 className="font-display text-2xl font-700 text-white">Stack Burger</h3>
                      <p className="mt-1 text-sm text-ink-200">classic_stack.execute()</p>
                    </div>
                    <div className="rounded-xl bg-ember-500/15 px-3 py-2 text-right backdrop-blur-sm border border-ember-500/30">
                      <p className="mono text-[10px] text-ember-300">xp</p>
                      <p className="font-display text-lg font-700 text-ember-400">+60</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating level card */}
              <div className="animate-float absolute -left-6 top-8 hidden w-44 rounded-2xl border border-white/10 bg-ink-850/90 p-3.5 shadow-card backdrop-blur-xl sm:block">
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] text-ink-400">level</span>
                  <LevelBadge level={currentLevel} size="sm" />
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPct}%`,
                      background: `linear-gradient(90deg, ${currentLevel.color}aa, ${currentLevel.color})`,
                      boxShadow: `0 0 10px ${currentLevel.glow}`,
                    }}
                  />
                </div>
                <p className="mono mt-2 text-[10px] text-ink-300">
                  {user.xp.toLocaleString('pt-BR')} / {nextLevel ? nextLevel.minXp.toLocaleString('pt-BR') : 'MAX'} XP
                </p>
              </div>

              {/* floating mission card */}
              {activeMission && (
                <div
                  className="animate-float absolute -right-4 bottom-12 hidden w-48 rounded-2xl border border-white/10 bg-ink-850/90 p-3.5 shadow-card backdrop-blur-xl sm:block"
                  style={{ animationDelay: '1.5s' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-lime-500/15">
                      <activeMission.icon size={14} className="text-lime-400" />
                    </div>
                    <span className="truncate text-xs font-semibold text-white">{activeMission.title}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                    <div
                      className="h-full rounded-full bg-lime-400"
                      style={{ width: `${Math.min(100, (activeMission.progress / activeMission.target) * 100)}%` }}
                    />
                  </div>
                  <p className="mono mt-1.5 text-[10px] text-ink-300">
                    {activeMission.progress}/{activeMission.target} · +{activeMission.xp} XP
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="section relative">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-ink-900/50 backdrop-blur-sm sm:grid-cols-4 sm:divide-y-0">
            {[
              { label: 'pedidos entregues', value: '248.910' },
              { label: 'membros ativos', value: '12.480' },
              { label: 'XP distribuído', value: '8.4M' },
              { label: 'avaliação média', value: '4.9 / 5' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-5">
                <p className="font-display text-2xl font-700 text-white">{s.value}</p>
                <p className="mono mt-1 text-[11px] uppercase tracking-wider text-ink-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section relative mt-28">
        <SectionHeading
          eyebrow="benefícios"
          title={
            <>
              Por que entrar no <span className="text-gradient">ecossistema</span>
            </>
          }
          subtitle="Mais que um programa de pontos: uma carreira de sabor com perks reais a cada nível."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className="group animate-fade-up card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/30"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-ember-500/10 text-ember-400 transition-all duration-300 group-hover:bg-ember-500/20 group-hover:scale-110">
                <b.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg font-600 text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEVEL ROADMAP */}
      <section className="section relative mt-28">
        <SectionHeading
          eyebrow="carreira"
          title={
            <>
              Cinco níveis. Do <span className="text-lime-400">Estagiário</span> ao{' '}
              <span className="text-amber-400">Arquiteto</span>.
            </>
          }
          subtitle="Cada nível desbloqueia perks reais: frete grátis, molhos, itens secretos e acesso antecipado."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {LEVELS.map((l, i) => (
            <div
              key={l.id}
              className="group relative animate-fade-up overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-850/50 p-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: l.color }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg font-display text-sm font-700"
                    style={{
                      background: `${l.color}1a`,
                      color: l.color,
                      border: `1px solid ${l.color}33`,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="mono text-[10px] text-ink-400">
                    {l.minXp.toLocaleString('pt-BR')} XP
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-700" style={{ color: l.color }}>
                  {l.name}
                </h3>
                <p className="mt-1 text-xs text-ink-300">{l.tagline}</p>
                <ul className="mt-4 space-y-1.5">
                  {l.perks.map((p) => (
                    <li key={p} className="flex items-start gap-1.5 text-[11px] text-ink-200">
                      <ChevronRight size={12} className="mt-0.5 shrink-0" style={{ color: l.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button onClick={() => onNavigate('loyalty')} className="btn-ghost">
            Ver meu dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section relative mt-28">
        <SectionHeading
          eyebrow="onboarding"
          title={
            <>
              Como funciona o <span className="text-gradient">commit loop</span>
            </>
          }
          subtitle="Quatro passos para entrar, evoluir e desbloquear tudo o que a marca oferece."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {HOW_IT_WORKS.map((s, i) => (
            <div
              key={s.step}
              className="group relative animate-fade-up rounded-2xl border border-white/[0.06] bg-ink-850/50 p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="mono text-xs text-ember-400">{s.step}</span>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/[0.04] text-ink-200 transition-all duration-300 group-hover:bg-ember-500/15 group-hover:text-ember-400">
                  <s.icon size={18} />
                </div>
              </div>
              <h3 className="mt-4 font-display text-lg font-600 text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{s.desc}</p>
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-ember-500/40 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section relative mt-28">
        <div className="relative overflow-hidden rounded-3xl border border-ember-500/20 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-950 p-10 md:p-16">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)' }}
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-200">
                <Sparkles size={12} className="text-amber-400" />
                Beta aberto para novos membros
              </div>
              <h2 className="mt-5 font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
                Sua conta começa no nível
                <span className="text-lime-400"> Estagiário</span>.
                <br />
                Já da primeiro commit.
              </h2>
              <p className="mt-4 max-w-lg text-ink-300">
                Crie sua conta gratuita, ganhe XP no primeiro pedido e desbloqueie
                frete grátis imediatamente. Sem pegadinha, sem taxa.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => onNavigate('loyalty')}
                className="btn-primary w-full justify-between py-4 text-base"
              >
                <span className="flex items-center gap-2">
                  <Zap size={18} /> Criar conta grátis
                </span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="btn-ghost w-full justify-between py-4"
              >
                <span className="flex items-center gap-2">
                  <Flame size={18} /> Ver cardápio
                </span>
                <ArrowRight size={16} />
              </button>
              <p className="mono text-center text-[11px] text-ink-400">
                {user.handle} já está dentro · {currentLevel.name.toLowerCase()} · {user.xp.toLocaleString('pt-BR')} XP
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mono text-xs uppercase tracking-[0.25em] text-ember-400">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base text-ink-300">{subtitle}</p>}
    </div>
  );
}
