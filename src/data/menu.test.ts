import { describe, it, expect } from 'vitest';
import { getLevelForXp, getNextLevel, LEVELS, MENU } from './menu';

describe('menu and levels data logic', () => {
  describe('getLevelForXp', () => {
    it('cenário feliz: mapeia XP de forma correta para os níveis de carreira', () => {
      expect(getLevelForXp(0).id).toBe('estagiario');
      expect(getLevelForXp(500).id).toBe('junior');
      expect(getLevelForXp(1500).id).toBe('pleno');
      expect(getLevelForXp(2140).id).toBe('pleno');
      expect(getLevelForXp(3500).id).toBe('senior');
      expect(getLevelForXp(7000).id).toBe('arquiteto');
    });

    it('caso de borda: XP acima do teto máximo continua como arquiteto', () => {
      const topLevel = getLevelForXp(999999);
      expect(topLevel.id).toBe('arquiteto');
    });

    it('tratamento de erro: XP negativo retorna o nível base estagiário', () => {
      const baseLevel = getLevelForXp(-50);
      expect(baseLevel.id).toBe('estagiario');
    });
  });

  describe('getNextLevel', () => {
    it('cenário feliz: retorna o próximo nível na trilha de evolução', () => {
      const estagiario = LEVELS[0];
      const junior = LEVELS[1];
      expect(getNextLevel(estagiario)?.id).toBe(junior.id);
    });

    it('caso de borda: retorna null quando o usuário atinge o nível máximo (arquiteto)', () => {
      const arquiteto = LEVELS[LEVELS.length - 1];
      expect(getNextLevel(arquiteto)).toBeNull();
    });

    it('tratamento de erro / integridade do catálogo: todos os itens de MENU têm preço e XP válidos', () => {
      expect(MENU.length).toBeGreaterThan(0);
      MENU.forEach((item) => {
        expect(item.price).toBeGreaterThan(0);
        expect(item.xpReward).toBeGreaterThan(0);
        expect(item.name.trim().length).toBeGreaterThan(0);
      });
    });
  });
});
