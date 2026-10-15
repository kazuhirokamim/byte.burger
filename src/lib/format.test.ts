import { describe, it, expect } from 'vitest';
import { formatBRL, formatXP } from './format';

describe('format util', () => {
  describe('formatBRL', () => {
    it('cenário feliz: formata valores monetários em Real brasileiro', () => {
      const formatted = formatBRL(28.9);
      expect(formatted).toMatch(/28,90/);
    });

    it('caso de borda: lida com zero e centavos fracionados', () => {
      expect(formatBRL(0)).toMatch(/0,00/);
      expect(formatBRL(0.05)).toMatch(/0,05/);
    });

    it('tratamento de erro / limites: formata valores negativos com sinal de menos', () => {
      const negative = formatBRL(-15.5);
      expect(negative).toMatch(/-.*15,50/);
    });
  });

  describe('formatXP', () => {
    it('cenário feliz: formata número inteiro de XP com separador de milhar pt-BR', () => {
      expect(formatXP(2140)).toBe('2.140');
      expect(formatXP(7000)).toBe('7.000');
    });

    it('caso de borda: formata zero XP sem separadores', () => {
      expect(formatXP(0)).toBe('0');
    });

    it('tratamento de limites: lida com valores altos de XP de carreira', () => {
      expect(formatXP(1000000)).toBe('1.000.000');
    });
  });
});
