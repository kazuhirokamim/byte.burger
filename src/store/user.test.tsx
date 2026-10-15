import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { UserProvider, useUser } from './user';

describe('UserStore & Gamification Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('cenário feliz: adiciona XP, sobe nível e acumula pontos', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserProvider>{children}</UserProvider>
    );
    const { result } = renderHook(() => useUser(), { wrapper });

    const initialXp = result.current.user.xp;
    const initialPoints = result.current.user.points;

    act(() => {
      result.current.addXp(200);
    });

    expect(result.current.user.xp).toBe(initialXp + 200);
    expect(result.current.user.points).toBe(initialPoints + 100);
  });

  it('cenário feliz: recordOrder registra o pedido no historico e credita XP', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserProvider>{children}</UserProvider>
    );
    const { result } = renderHook(() => useUser(), { wrapper });

    const initialOrderCount = result.current.orderHistory.length;
    const initialXp = result.current.user.xp;

    act(() => {
      result.current.recordOrder('2x Stack Burger', 57.8, 120);
    });

    expect(result.current.orderHistory.length).toBe(initialOrderCount + 1);
    expect(result.current.orderHistory[0].items).toBe('2x Stack Burger');
    expect(result.current.orderHistory[0].total).toBe(57.8);
    expect(result.current.user.xp).toBe(initialXp + 120);
  });

  it('caso de borda: redeemReward só debita pontos se houver saldo suficiente', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserProvider>{children}</UserProvider>
    );
    const { result } = renderHook(() => useUser(), { wrapper });

    const currentPoints = result.current.user.points;

    // Tentativa de resgate com saldo suficiente
    let success = false;
    act(() => {
      success = result.current.redeemReward(100);
    });
    expect(success).toBe(true);
    expect(result.current.user.points).toBe(currentPoints - 100);

    // Tentativa de resgate acima do saldo disponível
    let failAttempt = false;
    act(() => {
      failAttempt = result.current.redeemReward(999999);
    });
    expect(failAttempt).toBe(false);
    expect(result.current.user.points).toBe(currentPoints - 100); // Não debita
  });

  it('tratamento de erro: useUser fora do UserProvider lança erro', () => {
    expect(() => {
      renderHook(() => useUser());
    }).toThrow('useUser must be used within a UserProvider');
  });
});
