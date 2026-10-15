import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  USER_PROFILE as INITIAL_PROFILE,
  MISSIONS as INITIAL_MISSIONS,
  ORDER_HISTORY as INITIAL_ORDERS,
} from '../data/content';
import {
  getLevelForXp,
  getNextLevel,
  type Mission,
  type OrderHistoryItem,
  type Level,
} from '../data/menu';

export interface UserProfile {
  name: string;
  handle: string;
  email: string;
  avatar: string;
  level: string;
  xp: number;
  joinedAt: string;
  currentStreak: number;
  points: number;
}

interface UserContextValue {
  user: UserProfile;
  currentLevel: Level;
  nextLevel: Level | null;
  xpInLevel: number;
  xpToNext: number;
  progressPct: number;
  missions: Mission[];
  orderHistory: OrderHistoryItem[];
  addXp: (amount: number) => void;
  redeemReward: (cost: number) => boolean;
  claimMission: (missionId: string) => void;
  recordOrder: (itemsDescription: string, total: number, xpEarned: number) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  USER: 'byteburger:user_profile',
  MISSIONS: 'byteburger:missions',
  ORDERS: 'byteburger:order_history',
};

const UserContext = createContext<UserContextValue | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() =>
    loadFromStorage(STORAGE_KEYS.USER, INITIAL_PROFILE),
  );
  const [missions, setMissions] = useState<Mission[]>(() =>
    loadFromStorage(STORAGE_KEYS.MISSIONS, INITIAL_MISSIONS),
  );
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS),
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // quota or private mode
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    } catch {
      // quota or private mode
    }
  }, [missions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orderHistory));
    } catch {
      // quota or private mode
    }
  }, [orderHistory]);

  const currentLevel = getLevelForXp(user.xp);
  const nextLevel = getNextLevel(currentLevel);
  const xpInLevel = user.xp - currentLevel.minXp;
  const xpToNext = nextLevel ? nextLevel.minXp - currentLevel.minXp : xpInLevel;
  const progressPct = nextLevel
    ? Math.max(0, Math.min(100, (xpInLevel / xpToNext) * 100))
    : 100;

  const addXp = useCallback((amount: number) => {
    if (amount <= 0) return;
    setUser((prev) => {
      const nextXp = prev.xp + amount;
      const nextLvl = getLevelForXp(nextXp);
      return {
        ...prev,
        xp: nextXp,
        level: nextLvl.id,
        points: prev.points + Math.round(amount * 0.5), // ganha pontos ao ganhar xp
      };
    });
  }, []);

  const redeemReward = useCallback((cost: number): boolean => {
    if (user.points < cost) return false;
    setUser((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - cost),
    }));
    return true;
  }, [user.points]);

  const claimMission = useCallback((missionId: string) => {
    setMissions((prev) => {
      const target = prev.find((m) => m.id === missionId);
      if (!target || target.progress < target.target) return prev;
      addXp(target.xp);
      return prev.filter((m) => m.id !== missionId);
    });
  }, [addXp]);

  const recordOrder = useCallback(
    (itemsDescription: string, total: number, xpEarned: number) => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const newOrder: OrderHistoryItem = {
        id: `o_${Date.now()}`,
        code: `#BRG-${randomCode}`,
        date: new Date().toISOString().split('T')[0],
        total,
        xpEarned,
        items: itemsDescription,
        status: 'preparando',
      };
      setOrderHistory((prev) => [newOrder, ...prev]);
      addXp(xpEarned);
    },
    [addXp],
  );

  const resetToDefaults = useCallback(() => {
    setUser(INITIAL_PROFILE);
    setMissions(INITIAL_MISSIONS);
    setOrderHistory(INITIAL_ORDERS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.MISSIONS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        currentLevel,
        nextLevel,
        xpInLevel,
        xpToNext,
        progressPct,
        missions,
        orderHistory,
        addXp,
        redeemReward,
        claimMission,
        recordOrder,
        resetToDefaults,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
