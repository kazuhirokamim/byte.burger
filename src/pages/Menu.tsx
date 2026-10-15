import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, Star, X, Minus, Sparkles, ShoppingCart } from 'lucide-react';
import { MENU, ADDONS, type MenuItem, type Addon, type AddonCategory } from '../data/menu';
import { useCart } from '../store/cart';
import { formatBRL } from '../lib/format';

const CATEGORIES: { id: MenuItem['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'combos', label: 'Combos' },
  { id: 'sides', label: 'Acompanhamentos' },
  { id: 'drinks', label: 'Bebidas' },
];

const BADGE_STYLE: Record<string, { label: string; cls: string }> = {
  novo: { label: 'NOVO', cls: 'bg-lime-500/15 text-lime-400 border-lime-500/30' },
  hit: { label: 'HIT', cls: 'bg-ember-500/15 text-ember-400 border-ember-500/30' },
  picante: { label: 'PICANTE', cls: 'bg-flame-500/15 text-flame-400 border-flame-500/30' },
  exclusivo: { label: 'EXCLUSIVO', cls: 'bg-amber-500/15 text-amber-400 border-amber-500/30' },
};

const ADDON_CAT_LABEL: Record<AddonCategory, string> = {
  extra: 'Adicionais',
  sauce: 'Molhos',
  side: 'Acompanhamentos',
  drink: 'Bebidas',
};

export function Menu() {
  const [cat, setCat] = useState<MenuItem['category'] | 'all'>('all');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<MenuItem | null>(null);

  const filtered = useMemo(() => {
    return MENU.filter((m) => {
      const matchCat = cat === 'all' || m.category === cat;
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.tags.some((t) => t.includes(q));
      return matchCat && matchQ;
    });
  }, [cat, query]);

  return (
    <div className="pt-16">
      <div className="section relative py-12">
        <p className="mono text-xs uppercase tracking-[0.25em] text-ember-400">cardápio</p>
        <h1 className="mt-3 font-display text-4xl font-700 leading-tight text-white sm:text-5xl">
          Escolha seu <span className="text-gradient">commit</span>
        </h1>
        <p className="mt-3 max-w-xl text-ink-300">
          Cada item acumula XP no seu perfil. Combine adicionais para maximizar
          sua experiência e evoluir mais rápido.
        </p>

        {/* toolbar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`chip transition-all ${
                  cat === c.id
                    ? 'bg-ember-500 text-white border border-ember-500 shadow-glow'
                    : 'bg-white/[0.04] text-ink-200 border border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar item, tag, molho..."
              className="w-full rounded-xl border border-white/[0.08] bg-ink-850/60 py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-ink-400 focus:border-ember-500/40 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
            />
          </div>
        </div>

        {/* grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <ProductCard key={item.id} item={item} onOpen={() => setActive(item)} delay={i * 50} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 grid place-items-center text-center">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.04]">
              <Search size={24} className="text-ink-400" />
            </div>
            <p className="mt-4 font-display text-lg text-white">Nenhum item encontrado</p>
            <p className="mt-1 text-sm text-ink-400">Tente outro termo ou categoria.</p>
          </div>
        )}
      </div>

      {active && <ProductModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function ProductCard({
  item,
  onOpen,
  delay,
}: {
  item: MenuItem;
  onOpen: () => void;
  delay: number;
}) {
  const { add } = useCart();
  const badge = item.badge ? BADGE_STYLE[item.badge] : null;

  return (
    <div
      className="group animate-fade-up relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-850/50 transition-all duration-300 hover:-translate-y-1 hover:border-ember-500/30 hover:shadow-glow-soft"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button onClick={onOpen} className="block w-full text-left">
        <div className="relative aspect-[5/4] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          {badge && (
            <span
              className={`absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-bold ${badge.cls}`}
            >
              {badge.label}
            </span>
          )}
          <div className="absolute right-3 top-3 rounded-lg bg-ink-950/70 px-2 py-1 text-right backdrop-blur-sm">
            <p className="mono text-[9px] uppercase text-amber-400">xp</p>
            <p className="font-display text-sm font-700 text-amber-400">+{item.xpReward}</p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-700 text-white">{item.name}</h3>
              <p className="mono mt-0.5 truncate text-xs text-ember-400">{item.tagline}</p>
            </div>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-300">{item.blurb}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-xl font-700 text-white">
              {formatBRL(item.price)}
            </span>
            {item.tags.includes('best-seller') && (
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-400">
                <Star size={11} fill="currentColor" /> best-seller
              </span>
            )}
          </div>
        </div>
      </button>

      <div className="px-5 pb-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            add(item, [], 1);
          }}
          className="btn-primary w-full py-2.5 group/btn"
        >
          <Plus size={16} className="transition-transform group-hover/btn:rotate-90" />
          Adicionar
        </button>
      </div>
    </div>
  );
}

function ProductModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { add } = useCart();
  const [selected, setSelected] = useState<Addon[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleAddon = (a: Addon) => {
    setSelected((prev) =>
      prev.find((x) => x.id === a.id)
        ? prev.filter((x) => x.id !== a.id)
        : [...prev, a],
    );
  };

  const addonsPrice = selected.reduce((s, a) => s + a.price, 0);
  const addonsXp = selected.reduce((s, a) => s + a.xpReward, 0);
  const total = (item.price + addonsPrice) * qty;
  const xp = (item.xpReward + addonsXp) * qty;

  const handleAdd = () => {
    add(item, selected, qty);
    onClose();
  };

  const grouped = (['extra', 'sauce', 'side'] as AddonCategory[])
    .map((c) => ({
      cat: c,
      items: ADDONS.filter((a) => a.category === c),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[110] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/10 bg-ink-900 shadow-card sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg bg-ink-950/60 text-white backdrop-blur-sm hover:bg-ink-950/80"
        >
          <X size={18} />
        </button>

        <div className="max-h-[88vh] overflow-y-auto">
          <div className="relative h-56 sm:h-72">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="mono text-[11px] uppercase tracking-widest text-ember-400">
                    {item.category}
                  </p>
                  <h2 id="product-modal-title" className="mt-1 font-display text-3xl font-700 text-white">{item.name}</h2>
                  <p className="mono mt-1 text-xs text-ember-400">{item.tagline}</p>
                </div>
                <div className="rounded-xl bg-ink-950/60 px-3 py-2 text-right backdrop-blur-sm">
                  <p className="mono text-[10px] uppercase text-amber-400">xp</p>
                  <p className="font-display text-xl font-700 text-amber-400">+{item.xpReward}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-sm leading-relaxed text-ink-200">{item.blurb}</p>

            <div className="mt-6 space-y-5">
              {grouped.map((g) => (
                <div key={g.cat}>
                  <h4 className="mono mb-2 text-xs uppercase tracking-wider text-ink-400">
                    {ADDON_CAT_LABEL[g.cat]}
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {g.items.map((a) => {
                      const sel = !!selected.find((x) => x.id === a.id);
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAddon(a)}
                          className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                            sel
                              ? 'border-ember-500/50 bg-ember-500/10'
                              : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`grid h-5 w-5 place-items-center rounded-md border transition-all ${
                                sel
                                  ? 'border-ember-500 bg-ember-500 text-white'
                                  : 'border-ink-500 text-transparent'
                              }`}
                            >
                              <Plus size={11} strokeWidth={3} />
                            </span>
                            <div>
                              <p className="text-sm font-medium text-white">{a.name}</p>
                              <p className="mono text-[10px] text-amber-400">+{a.xpReward} xp</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-ink-100">
                            {formatBRL(a.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* qty + add */}
            <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-display text-lg font-700 text-white">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button onClick={handleAdd} className="btn-primary group flex-1 justify-between py-3.5 sm:max-w-xs">
                <span className="flex items-center gap-2">
                  <ShoppingCart size={16} />
                  Adicionar
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 text-xs text-amber-400">
                    <Sparkles size={11} /> +{xp} xp
                  </span>
                  <span className="font-700">{formatBRL(total)}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
