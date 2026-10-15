import type { LucideIcon } from 'lucide-react';

export type LevelId = 'estagiario' | 'junior' | 'pleno' | 'senior' | 'arquiteto';

export interface Level {
  id: LevelId;
  name: string;
  minXp: number;
  color: string;
  glow: string;
  tagline: string;
  perks: string[];
}

export const LEVELS: Level[] = [
  {
    id: 'estagiario',
    name: 'Estagiário',
    minXp: 0,
    color: '#84cc16',
    glow: 'rgba(132,204,22,0.35)',
    tagline: 'Primeiros commits no ecossistema',
    perks: ['Acesso ao programa de pontos', 'Frete grátis no 1º pedido'],
  },
  {
    id: 'junior',
    name: 'Júnior',
    minXp: 500,
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.35)',
    tagline: 'Subindo de nível, ganhando confiança',
    perks: ['Batata pequena a cada 5 pedidos', 'Cupom 10% no aniversário'],
  },
  {
    id: 'pleno',
    name: 'Pleno',
    minXp: 1500,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.35)',
    tagline: 'Resolve qualquer pedido com autonomia',
    perks: ['Molhos especiais liberados', 'Frete grátis em pedidos acima de R$45'],
  },
  {
    id: 'senior',
    name: 'Sênior',
    minXp: 3500,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.35)',
    tagline: 'Referência da comunidade',
    perks: ['Acesso antecipado a lançamentos', 'Cupom mensal de R$15'],
  },
  {
    id: 'arquiteto',
    name: 'Arquiteto',
    minXp: 7000,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    tagline: 'Desenha o futuro da marca',
    perks: ['Menu secreto exclusivo', 'Convite para eventos privados'],
  },
];

export function getLevelForXp(xp: number): Level {
  let current = LEVELS[0];
  for (const l of LEVELS) {
    if (xp >= l.minXp) current = l;
  }
  return current;
}

export function getNextLevel(level: Level): Level | null {
  const idx = LEVELS.findIndex((l) => l.id === level.id);
  return idx >= 0 && idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

export type AddonCategory = 'extra' | 'sauce' | 'side' | 'drink';

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  price: number;
  category: 'burgers' | 'combos' | 'drinks' | 'sides';
  image: string;
  tags: string[];
  xpReward: number;
  badge?: 'novo' | 'hit' | 'picante' | 'exclusivo';
}

// Pexels stock photos (food) — referenced, not downloaded
export const MENU: MenuItem[] = [
  {
    id: 'stack-burger',
    name: 'Stack Burger',
    tagline: 'classic_stack.execute()',
    blurb: 'Dois smash de Angus 90g, cheddar duplo, picles e molho da casa no brioche.',
    price: 28.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['best-seller'],
    xpReward: 60,
    badge: 'hit',
  },
  {
    id: 'full-stack-bacon',
    name: 'Full Stack Bacon',
    tagline: 'bacon_layer.push() x3',
    blurb: 'Stack Burger com bacon crocante em 3 camadas, cebola caramelizada e maionese defumada.',
    price: 34.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['best-seller', 'premium'],
    xpReward: 75,
  },
  {
    id: 'deploy-smash',
    name: 'Deploy Smash',
    tagline: 'git push --produc',
    blurb: 'Smash 120g de costela e acém, queijo prato, alface americana e molho secreto.',
    price: 26.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['artesanal'],
    xpReward: 55,
  },
  {
    id: 'firewall-burger',
    name: 'Firewall Burger',
    tagline: 'permission: denied',
    blurb: 'Blend 160g, jalapeño, cheddar, bacon, anéis de cebola e molho de pimenta ghost.',
    price: 32.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['picante'],
    xpReward: 70,
    badge: 'picante',
  },
  {
    id: 'devops-monster',
    name: 'DevOps Monster',
    tagline: 'infra.scale(4x)',
    blurb: 'Quatro carnes smash, cheddar derretido entre cada camada, onion rings e molho barbecue.',
    price: 42.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/1395862/pexels-photo-1395862.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['premium', 'x4'],
    xpReward: 95,
    badge: 'hit',
  },
  {
    id: 'bug-burger',
    name: 'Bug Burger',
    tagline: 'status: 404_not_found',
    blurb: 'Opção vegetariana: hambúrguer de grão-de-bico, queijo vegano, BBQ de beterraba e rúcula.',
    price: 29.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/3764329/pexels-photo-3764329.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['veggie'],
    xpReward: 60,
  },
  {
    id: 'kernel-chicken',
    name: 'Kernel Chicken',
    tagline: 'core.chicken.run()',
    blurb: 'Coxa crocante desossada, slaw de repolho, picles e maionese de páprica no brioche.',
    price: 27.9,
    category: 'burgers',
    image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['frango'],
    xpReward: 55,
    badge: 'novo',
  },
  {
    id: 'combo-fullstack',
    name: 'Combo Full Stack',
    tagline: 'bundle install',
    blurb: 'Full Stack Bacon + batata rústica + bebida 350ml. Deploy completo.',
    price: 44.9,
    category: 'combos',
    image: 'https://images.pexels.com/photos/3717900/pexels-photo-3717900.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['combo', 'economia'],
    xpReward: 110,
    badge: 'hit',
  },
  {
    id: 'combo-junior',
    name: 'Combo Júnior',
    tagline: 'npm ci --quick',
    blurb: 'Stack Burger + batata pequena + bebida 350ml. Ideal para começar.',
    price: 36.9,
    category: 'combos',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['combo'],
    xpReward: 80,
  },
  {
    id: 'combo-monster',
    name: 'Combo Monster',
    tagline: 'rm -rf /fome',
    blurb: 'DevOps Monster + onion rings grande + milkshake 400ml. Para os casos extremos.',
    price: 58.9,
    category: 'combos',
    image: 'https://images.pexels.com/photos/7215343/pexels-photo-7215343.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['combo', 'premium'],
    xpReward: 140,
  },
  {
    id: 'batata-rustica',
    name: 'Batata Rústica',
    tagline: 'cache.hit()',
    blurb: 'Porção generosa de batata rústica com alecrim e parmesão.',
    price: 16.9,
    category: 'sides',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [],
    xpReward: 25,
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    tagline: 'ring_buffer.push()',
    blurb: 'Anéis de cebola empanados crocantes com molho ranch da casa.',
    price: 18.9,
    category: 'sides',
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [],
    xpReward: 28,
  },
  {
    id: 'cola-craft',
    name: 'Cola Craft 350ml',
    tagline: 'echo "refresh"',
    blurb: 'Refrigerante de cola artesanal, gelado. 350ml.',
    price: 7.9,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [],
    xpReward: 10,
  },
  {
    id: 'milkshake-vanilla',
    name: 'Milkshake Vanilla 400ml',
    tagline: 'process.cream()',
    blurb: 'Milkshake cremoso de baunilha com calda e chantilly. 400ml.',
    price: 19.9,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['premium'],
    xpReward: 30,
  },
  {
    id: 'limonada-suica',
    name: 'Limonada Suíça',
    tagline: 'fresh.squeeze()',
    blurb: 'Limonada suíça com hortelã. 500ml.',
    price: 12.9,
    category: 'drinks',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: [],
    xpReward: 15,
  },
];

export interface Addon {
  id: string;
  name: string;
  price: number;
  category: AddonCategory;
  xpReward: number;
}

export const ADDONS: Addon[] = [
  { id: 'extra-bacon', name: 'Bacon extra', price: 4.9, category: 'extra', xpReward: 8 },
  { id: 'cheddar-extra', name: 'Cheddar extra', price: 3.9, category: 'extra', xpReward: 6 },
  { id: 'ovo', name: 'Ovo frito', price: 3.5, category: 'extra', xpReward: 5 },
  { id: 'onion-extra', name: 'Onion rings', price: 5.9, category: 'extra', xpReward: 9 },
  { id: 'sauce-bbq', name: 'Molho BBQ defumado', price: 2.9, category: 'sauce', xpReward: 4 },
  { id: 'sauce-ghost', name: 'Molho Ghost Pepper', price: 3.9, category: 'sauce', xpReward: 6 },
  { id: 'sauce-garlic', name: 'Maionese de alho', price: 2.9, category: 'sauce', xpReward: 4 },
  { id: 'batata-p', name: 'Batata pequena', price: 9.9, category: 'side', xpReward: 15 },
  { id: 'batata-g', name: 'Batata grande', price: 14.9, category: 'side', xpReward: 22 },
];

export interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  progress: number;
  target: number;
  icon: LucideIcon;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: LucideIcon;
  tier: 'comum' | 'raro' | 'epico' | 'secreto';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  icon: LucideIcon;
}

export interface OrderHistoryItem {
  id: string;
  code: string;
  date: string;
  total: number;
  xpEarned: number;
  items: string;
  status: 'entregue' | 'em_rota' | 'preparando';
}
