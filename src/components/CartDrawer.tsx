import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../store/cart';
import { useUser } from '../store/user';
import { formatBRL, formatXP } from '../lib/format';

export function CartDrawer() {
  const { lines, isOpen, close, updateQty, remove, subtotal, xpTotal, count, clear } = useCart();
  const { recordOrder } = useUser();
  const [checkout, setCheckout] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (checkout === 'success') {
      t = setTimeout(() => {
        setCheckout('idle');
        close();
      }, 2400);
    }
    return () => clearTimeout(t);
  }, [checkout, close]);

  if (!isOpen) return null;

  const delivery = subtotal >= 45 || subtotal === 0 ? 0 : 6.9;

  const handleCheckout = () => {
    const itemsDesc = lines.map((l) => `${l.qty}x ${l.item.name}`).join(', ');
    const total = subtotal + delivery;
    recordOrder(itemsDesc, total, xpTotal);
    setCheckout('success');
    clear();
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        className="animate-fade-in absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
        onClick={close}
      />
      <aside
        className="animate-slide-up relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-900 shadow-card"
      >
        <header className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-ember-500/15">
              <ShoppingBag size={18} className="text-ember-400" />
            </div>
            <div>
              <h3 id="cart-drawer-title" className="font-display text-base font-700 text-white">Seu carrinho</h3>
              <p className="mono text-[11px] text-ink-400">
                {count} {count === 1 ? 'item' : 'itens'} · +{formatXP(xpTotal)} XP
              </p>
            </div>
          </div>
          <button
            onClick={close}
            aria-label="Fechar carrinho"
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-300 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </header>

        {checkout === 'success' ? (
          <div className="animate-scale-in flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="relative grid h-16 w-16 place-items-center rounded-full bg-lime-500/15">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-lime-500/20" />
              <ShieldCheck size={28} className="text-lime-400" />
            </div>
            <div>
              <h3 className="font-display text-xl font-700 text-white">Deploy realizado!</h3>
              <p className="mt-1 text-sm text-ink-300">
                Pedido confirmado. XP creditado no seu perfil.
              </p>
            </div>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/[0.04]">
              <ShoppingBag size={26} className="text-ink-400" />
            </div>
            <div>
              <h3 className="font-display text-lg font-600 text-white">Carrinho vazio</h3>
              <p className="mt-1 text-sm text-ink-400">
                Adicione itens do cardápio para começar a ganhar XP.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-3">
                {lines.map((l) => {
                  const lineXp =
                    (l.item.xpReward + l.addons.reduce((s, a) => s + a.xpReward, 0)) * l.qty;
                  return (
                    <div
                      key={l.key}
                      className="animate-fade-up rounded-xl border border-white/[0.06] bg-ink-850/60 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={l.item.image}
                          alt={l.item.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="truncate text-sm font-600 text-white">
                                {l.item.name}
                              </h4>
                              <p className="mono text-[10px] text-ember-400">{l.item.tagline}</p>
                            </div>
                            <button
                              onClick={() => remove(l.key)}
                              className="text-ink-400 hover:text-flame-500"
                              aria-label="Remover"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          {l.addons.length > 0 && (
                            <p className="mt-1 truncate text-[11px] text-ink-400">
                              + {l.addons.map((a) => a.name).join(', ')}
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQty(l.key, l.qty - 1)}
                                className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-6 text-center text-sm font-600 text-white">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => updateQty(l.key, l.qty + 1)}
                                className="grid h-7 w-7 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-700 text-white">
                                {formatBRL(l.unitPrice * l.qty)}
                              </p>
                              <p className="mono text-[10px] text-amber-400">+{lineXp} xp</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <footer className="border-t border-white/[0.06] px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-ink-300">
                  <span>Subtotal</span>
                  <span>{formatBRL(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-300">
                  <span>Entrega</span>
                  <span>
                    {delivery === 0 ? (
                      <span className="text-lime-400">grátis</span>
                    ) : (
                      formatBRL(delivery)
                    )}
                  </span>
                </div>
                {delivery > 0 && (
                  <p className="mono text-[10px] text-ink-400">
                    Frete grátis acima de {formatBRL(45)} · faltam {formatBRL(45 - subtotal)}
                  </p>
                )}
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5">
                  <span className="font-display font-700 text-white">Total</span>
                  <div className="text-right">
                    <p className="font-display text-lg font-700 text-white">
                      {formatBRL(subtotal + delivery)}
                    </p>
                    <p className="mono text-[10px] text-amber-400">
                      +{formatXP(xpTotal)} XP neste pedido
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.06] py-2 text-[11px] text-amber-300">
                <Sparkles size={12} />
                Você ganhará <strong>{formatXP(xpTotal)} XP</strong> ao concluir
              </div>

              <button onClick={handleCheckout} className="btn-primary mt-3 w-full justify-between py-3.5">
                <span className="flex items-center gap-2">
                  <ShoppingBag size={16} /> Finalizar pedido
                </span>
                <ArrowRight size={16} />
              </button>
              <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-ink-400">
                <ShieldCheck size={11} /> Pagamento seguro · entrega em ~35min
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
