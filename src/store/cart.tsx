import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { MenuItem, Addon } from '../data/menu';

export interface CartLine {
  key: string;
  item: MenuItem;
  addons: Addon[];
  qty: number;
  unitPrice: number;
}

export interface ToastEvent {
  id: string;
  kind: 'cart' | 'xp' | 'levelup' | 'mission' | 'reward' | 'info';
  title: string;
  subtitle?: string;
  xp?: number;
}

interface CartContextValue {
  lines: CartLine[];
  add: (item: MenuItem, addons: Addon[], qty: number) => void;
  remove: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  xpTotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toasts: ToastEvent[];
  pushToast: (t: Omit<ToastEvent, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const STORAGE_KEY = 'byteburger:cart_lines';

function loadSavedCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadSavedCart);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastEvent[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // quota or private mode
    }
  }, [lines]);

  const pushToast = useCallback((t: Omit<ToastEvent, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const add = useCallback(
    (item: MenuItem, addons: Addon[], qty: number) => {
      const unitPrice = item.price + addons.reduce((s, a) => s + a.price, 0);
      const key = `${item.id}|${addons
        .map((a) => a.id)
        .sort()
        .join(',')}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) =>
            l.key === key ? { ...l, qty: l.qty + qty } : l,
          );
        }
        return [...prev, { key, item, addons, qty, unitPrice }];
      });
      const xp = (item.xpReward + addons.reduce((s, a) => s + a.xpReward, 0)) * qty;
      pushToast({
        kind: 'cart',
        title: `${item.name} adicionado`,
        subtitle: `${qty}x no carrinho`,
        xp,
      });
    },
    [pushToast],
  );

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    if (qty <= 0) {
      setLines((prev) => prev.filter((l) => l.key !== key));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const xpTotal = lines.reduce(
    (s, l) =>
      s +
      (l.item.xpReward + l.addons.reduce((a, x) => a + x.xpReward, 0)) *
        l.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        add,
        remove,
        updateQty,
        clear,
        count,
        subtotal,
        xpTotal,
        isOpen,
        open,
        close,
        toasts,
        pushToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
