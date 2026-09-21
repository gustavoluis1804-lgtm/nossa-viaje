export type Category =
  | "transport"
  | "place"
  | "meal"
  | "rest"
  | "prepare"
  | "lodging"
  | "secret";

export interface TripItem {
  id: string;
  /** grupo visual: dia 20 ou dia 21 (o retorno às 00:00 aparece no dia 21) */
  group: "20" | "21";
  /** 0 = 20/out, 1 = 21/out, 2 = 22/out (00:00) — usado para o cálculo real de data */
  dayOffset: 0 | 1 | 2;
  /** dia do horário de término (quando termina depois da meia-noite) */
  endOffset?: 0 | 1 | 2;
  start: string; // "HH:MM"
  end?: string; // "HH:MM"
  title: string;
  description?: string;
  category: Category;
  /** conta para o progresso ("X de Y momentos") */
  moment?: boolean;
  address?: string;
  mapQuery?: string;
  image?: string;
  tips?: string[];
  secret?: boolean;
  /** preenchido em runtime quando o destino secreto ainda está bloqueado */
  locked?: boolean;
}

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  payer: string;
  time: string;
  note?: string;
  createdAt: number;
}

export interface CheckItem {
  id: string;
  label: string;
  done: boolean;
  custom?: boolean;
}

export interface Memory {
  id: string;
  itemId: string;
  text: string;
  favorite?: string;
  createdAt: number;
}

export interface PhotoItem {
  id: string;
  itemId: string;
  src: string; // dataURL comprimida
  createdAt: number;
}

export interface Settings {
  budget: number;
  passwordHash: string; // base64, nunca exibida
  revealPhrase: string;
  restaurant: string;
  restaurantAddress: string;
  lodging: string;
  lodgingAddress: string;
  originCity: string;
  notifications: boolean;
  previewFinal: boolean;
}

export interface AppState {
  completed: string[];
  delay: number;
  notes: Record<string, string>;
  expenses: Expense[];
  checklist: CheckItem[];
  memories: Memory[];
  photos: PhotoItem[];
  couplePhoto?: string;
  unlocked: boolean;
  unlockedEver: boolean;
  keepUnlocked: boolean;
  notified: string[];
  settings: Settings;
  overrides: Record<string, Partial<TripItem>>;
}

export type TabId = "home" | "roteiro" | "mapa" | "memorias" | "mais";

export type SubPage = "gastos" | "checklist" | "nos" | "config";

export type Route =
  | { name: "tab"; tab: TabId }
  | { name: "place"; id: string }
  | { name: "sub"; page: SubPage }
  | { name: "unlock" }
  | { name: "recap" };

export interface Toast {
  id: string;
  title: string;
  body?: string;
  kind?: "default" | "celebrate";
}

export type TripPhase = "before" | "today" | "during" | "after";
