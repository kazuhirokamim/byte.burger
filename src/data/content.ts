import {
  Flame,
  Package,
  Sparkles,
  UserPlus,
  Share2,
  Truck,
  Ticket,
  Droplets,
  Cookie,
  Rocket,
  Lock,
  Trophy,
  Crown,
  Code2,
  Zap,
  Star,
  Award,
} from 'lucide-react';
import type {
  Mission,
  Reward,
  Achievement,
  OrderHistoryItem,
} from './menu';
import { LEVELS } from './menu';

export const USER_PROFILE = {
  name: 'Marina Costa',
  handle: '@marina.dev',
  email: 'marina@dev.io',
  avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=300',
  level: 'pleno' as const,
  xp: 2140,
  joinedAt: '2024-11-02',
  currentStreak: 14,
  points: 980,
};

export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Sprint semanal',
    description: 'Faça 2 pedidos esta semana',
    xp: 80,
    progress: 1,
    target: 2,
    icon: Package,
  },
  {
    id: 'm2',
    title: 'Commit em combo',
    description: 'Compre um combo completo',
    xp: 120,
    progress: 0,
    target: 1,
    icon: Flame,
  },
  {
    id: 'm3',
    title: 'Branch nova',
    description: 'Experimente o lançamento Kernel Chicken',
    xp: 60,
    progress: 0,
    target: 1,
    icon: Sparkles,
  },
  {
    id: 'm4',
    title: 'Pull request social',
    description: 'Compartilhe um story marcando @byte.burger',
    xp: 50,
    progress: 0,
    target: 1,
    icon: Share2,
  },
  {
    id: 'm5',
    title: 'Refatoração de equipe',
    description: 'Indique um amigo para o programa',
    xp: 200,
    progress: 1,
    target: 1,
    icon: UserPlus,
  },
];

export const REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'Frete grátis',
    description: 'Valido para qualquer pedido até 8km.',
    cost: 150,
    icon: Truck,
    tier: 'comum',
  },
  {
    id: 'r2',
    title: 'Cupom R$10',
    description: 'Desconto de R$10 no próximo pedido.',
    cost: 300,
    icon: Ticket,
    tier: 'comum',
  },
  {
    id: 'r3',
    title: 'Molhos especiais',
    description: 'Liberar molhos premium da casa.',
    cost: 250,
    icon: Droplets,
    tier: 'raro',
  },
  {
    id: 'r4',
    title: 'Batata pequena',
    description: 'Acompanhamento grátis no próximo pedido.',
    cost: 200,
    icon: Cookie,
    tier: 'comum',
  },
  {
    id: 'r5',
    title: 'Acesso antecipado',
    description: 'Teste lançamentos antes de todos.',
    cost: 600,
    icon: Rocket,
    tier: 'epico',
  },
  {
    id: 'r6',
    title: 'Menu secreto',
    description: 'Item exclusivo visível apenas para Sênior+.',
    cost: 1200,
    icon: Lock,
    tier: 'secreto',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    title: 'Hello World',
    description: 'Fez seu primeiro pedido',
    unlockedAt: '2024-11-02',
    icon: Code2,
  },
  {
    id: 'a2',
    title: 'Commit Inicial',
    description: 'Alcançou o nível Júnior',
    unlockedAt: '2024-11-29',
    icon: Zap,
  },
  {
    id: 'a3',
    title: 'Streak de 14 dias',
    description: 'Pediu 14 dias seguidos',
    unlockedAt: '2025-01-10',
    icon: Flame,
  },
  {
    id: 'a4',
    title: 'Code Reviewer',
    description: 'Indicou 3 amigos',
    unlockedAt: '2025-02-15',
    icon: Star,
  },
];

export const ACHIEVEMENTS_LOCKED: Achievement[] = [
  {
    id: 'al1',
    title: 'Tech Lead',
    description: 'Alcance o nível Sênior',
    unlockedAt: '',
    icon: Trophy,
  },
  {
    id: 'al2',
    title: 'System Architect',
    description: 'Experimente todos os hambúrgueres do cardápio',
    unlockedAt: '',
    icon: Crown,
  },
  {
    id: 'al3',
    title: 'Open Source',
    description: 'Contribua com 10 indicações',
    unlockedAt: '',
    icon: Award,
  },
];

export const ORDER_HISTORY: OrderHistoryItem[] = [
  {
    id: 'o1',
    code: '#BRG-2841',
    date: '2025-06-18',
    total: 44.9,
    xpEarned: 110,
    items: 'Combo Full Stack',
    status: 'entregue',
  },
  {
    id: 'o2',
    code: '#BRG-2802',
    date: '2025-06-14',
    total: 32.9,
    xpEarned: 70,
    items: 'Firewall Burger + Onion Rings',
    status: 'entregue',
  },
  {
    id: 'o3',
    code: '#BRG-2778',
    date: '2025-06-09',
    total: 26.9,
    xpEarned: 55,
    items: 'Deploy Smash',
    status: 'entregue',
  },
];

export const BENEFITS = [
  {
    icon: Zap,
    title: 'XP em cada pedido',
    desc: 'Cada compra vira experiência. Evolua como em um RPG de verdade.',
  },
  {
    icon: Trophy,
    title: '5 níveis de carreira',
    desc: 'De Estagiário a Arquiteto. Suba de nível, desbloqueie perks reais.',
  },
  {
    icon: Package,
    title: 'Missões semanais',
    desc: 'Tarefas curtas que rendem XP extra e mantêm o streak vivo.',
  },
  {
    icon: Lock,
    title: 'Recompensas secretas',
    desc: 'Desbloqueios exclusivos, acesso antecipado e itens hidden do menu.',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Crie sua conta',
    desc: 'Entre no ecossistema em segundos. Seu perfil já nasce no nível Estagiário.',
    icon: Code2,
  },
  {
    step: '02',
    title: 'Peça e ganhe XP',
    desc: 'Cada hambúrguer, combo e adicional acumula experiência no seu perfil.',
    icon: Flame,
  },
  {
    step: '03',
    title: 'Complete missões',
    desc: 'Sprints semanais e desafios sociais aceleram sua evolução.',
    icon: Trophy,
  },
  {
    step: '04',
    title: 'Desbloqueie recompensas',
    desc: 'Troque pontos por frete grátis, molhos, itens secretos e acesso antecipado.',
    icon: Rocket,
  },
];

export { LEVELS };
