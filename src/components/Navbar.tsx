import { useState, useEffect } from 'react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../store/cart';

export type Page = 'home' | 'menu' | 'loyalty';

interface NavbarProps {
  page: Page;
  onNavigate: (p: Page) => void;
}

const LINKS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Cardápio' },
  { id: 'loyalty', label: 'Fidelidade' },
];

export function Navbar({ page, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, open } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (p: Page) => {
    onNavigate(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="section flex h-16 items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center">
          <Logo />
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`nav-link ${page === l.id ? 'text-white' : ''}`}
            >
              {l.label}
              {page === l.id && (
                <span className="absolute left-3 right-3 -bottom-0.5 h-px scale-x-100 bg-ember-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="relative btn-ghost px-3 py-2.5"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-ember-500 px-1 text-[10px] font-bold text-white shadow-glow">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => go('loyalty')}
            className="hidden btn-primary px-4 py-2.5 sm:inline-flex"
          >
            Entrar
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/[0.08] md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl">
          <div className="section flex flex-col py-3">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`rounded-lg px-3 py-3 text-left text-sm font-medium ${
                  page === l.id ? 'bg-ember-500/10 text-ember-400' : 'text-ink-200'
                }`}
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => go('loyalty')} className="btn-primary mt-2">
              Entrar no Programa
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="mt-32 border-t border-white/[0.06] bg-ink-950">
      <div className="section py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-300">
              A hamburgueria feita por quem entende de código. Deploy de sabor,
              commit de fidelidade.
            </p>
            <div className="mono mt-4 flex items-center gap-2 text-[11px] text-ink-400">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" />
              status: sistema operacional
            </div>
          </div>
          {[
            { title: 'Plataforma', items: ['Cardápio', 'Fidelidade', 'Minha conta', 'Pedidos'] },
            { title: 'Comunidade', items: ['Discord', 'Eventos', 'Missões', 'Indicações'] },
            { title: 'Empresa', items: ['Sobre', 'Carreiras', 'Termos', 'Privacidade'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-600 text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.items.map((it) => (
                  <li key={it}>
                    <button
                      onClick={() => onNavigate('home')}
                      className="text-ink-300 hover:text-ember-400 transition-colors"
                    >
                      {it}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p className="mono">© 2025 byte.burger — v2.4.1 · build #42891</p>
          <p className="mono">feito com commit, café e carvão</p>
        </div>
      </div>
    </footer>
  );
}
