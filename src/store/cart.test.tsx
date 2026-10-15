import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './cart';
import type { MenuItem, Addon } from '../data/menu';

const mockBurger: MenuItem = {
  id: 'burger-test',
  name: 'Burger Test',
  tagline: 'test()',
  blurb: 'Delicioso burger de teste',
  price: 30,
  category: 'burgers',
  image: 'https://example.com/burger.jpg',
  tags: ['test'],
  xpReward: 50,
};

const mockAddonBacon: Addon = {
  id: 'addon-bacon',
  name: 'Bacon',
  price: 5,
  category: 'extra',
  xpReward: 10,
};

const mockAddonEgg: Addon = {
  id: 'addon-egg',
  name: 'Ovo',
  price: 3,
  category: 'extra',
  xpReward: 5,
};

describe('CartStore (React Context & Hooks)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('cenário feliz: adiciona produto ao carrinho, calcula subtotal e pontuação de XP', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.count).toBe(0);
    expect(result.current.subtotal).toBe(0);

    act(() => {
      result.current.add(mockBurger, [mockAddonBacon], 2);
    });

    // 2x (30 + 5) = 70
    expect(result.current.count).toBe(2);
    expect(result.current.subtotal).toBe(70);
    // 2x (50 + 10) = 120 XP
    expect(result.current.xpTotal).toBe(120);
    expect(result.current.lines.length).toBe(1);
  });

  it('caso de borda: adicionais selecionados em ordens diferentes agrupam na mesma linha (comutação)', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    // Adiciona com [bacon, ovo]
    act(() => {
      result.current.add(mockBurger, [mockAddonBacon, mockAddonEgg], 1);
    });

    // Adiciona o mesmo produto com [ovo, bacon] (ordem inversa)
    act(() => {
      result.current.add(mockBurger, [mockAddonEgg, mockAddonBacon], 1);
    });

    // Devem ter sido agrupados na MESMA linha com quantidade 2
    expect(result.current.lines.length).toBe(1);
    expect(result.current.lines[0].qty).toBe(2);
    expect(result.current.count).toBe(2);
  });

  it('tratamento de erro: zerar quantidade remove o item e useCart fora do provider lança erro', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.add(mockBurger, [], 1);
    });
    expect(result.current.lines.length).toBe(1);

    const lineKey = result.current.lines[0].key;

    // Zerar quantidade deve remover a linha
    act(() => {
      result.current.updateQty(lineKey, 0);
    });
    expect(result.current.lines.length).toBe(0);
    expect(result.current.count).toBe(0);

    // Chamar fora do provider deve lançar erro explícito
    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within CartProvider');
  });
});
