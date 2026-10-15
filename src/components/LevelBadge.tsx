import type { Level } from '../data/menu';
import type { LevelId } from '../data/menu';

interface LevelBadgeProps {
  level: Level;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const SIZE_MAP = {
  sm: { box: 'h-7 px-2.5 text-[11px]', dot: 'h-1.5 w-1.5' },
  md: { box: 'h-9 px-3 text-xs', dot: 'h-2 w-2' },
  lg: { box: 'h-11 px-4 text-sm', dot: 'h-2.5 w-2.5' },
};

export function LevelBadge({ level, size = 'md', showName = true }: LevelBadgeProps) {
  const s = SIZE_MAP[size];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${s.box}`}
      style={{
        background: `${level.color}1a`,
        color: level.color,
        border: `1px solid ${level.color}40`,
        boxShadow: `0 0 20px -8px ${level.glow}`,
      }}
    >
      <span
        className={`${s.dot} rounded-full`}
        style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }}
      />
      {showName && level.name}
    </span>
  );
}

export function tierColor(id: LevelId): string {
  const map: Record<LevelId, string> = {
    estagiario: '#84cc16',
    junior: '#22d3ee',
    pleno: '#3b82f6',
    senior: '#a855f7',
    arquiteto: '#f59e0b',
  };
  return map[id];
}
