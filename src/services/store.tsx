"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AppState,
  CheckItem,
  Expense,
  Memory,
  PhotoItem,
  Settings,
  Toast,
  TripItem,
} from "@/lib/types";
import { DEFAULT_CHECKLIST, DEFAULT_PASSWORD_HASH, DEFAULT_REVEAL_PHRASE } from "@/data/trip";

const STORAGE_KEY = "nossa-viagem:v1";

const defaultSettings: Settings = {
  budget: 1300,
  passwordHash: DEFAULT_PASSWORD_HASH,
  revealPhrase: DEFAULT_REVEAL_PHRASE,
  restaurant: "",
  restaurantAddress: "",
  lodging: "",
  lodgingAddress: "",
  originCity: "Sorocaba",
  notifications: true,
  previewFinal: false,
};

const defaultState: AppState = {
  completed: [],
  delay: 0,
  notes: {},
  expenses: [],
  checklist: DEFAULT_CHECKLIST,
  memories: [],
  photos: [],
  couplePhoto: undefined,
  unlocked: false,
  unlockedEver: false,
  keepUnlocked: true,
  notified: [],
  settings: defaultSettings,
  overrides: {},
};

function loadState(): AppState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const merged: AppState = {
      ...defaultState,
      ...parsed,
      settings: { ...defaultSettings, ...(parsed.settings ?? {}) },
      notes: parsed.notes ?? {},
      overrides: parsed.overrides ?? {},
    };
    // se a pessoa optou por não manter desbloqueado, pede a palavra de novo ao abrir
    if (!merged.keepUnlocked) merged.unlocked = false;
    return merged;
  } catch {
    return defaultState;
  }
}

function persist(state: AppState): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

interface StoreCtx {
  state: AppState;
  hydrated: boolean;
  toasts: Toast[];
  pushToast: (title: string, body?: string, kind?: Toast["kind"]) => void;
  dismissToast: (id: string) => void;
  toggleComplete: (id: string) => void;
  addDelay: (minutes: number) => void;
  resetDelay: () => void;
  setNote: (id: string, text: string) => void;
  addExpense: (e: Omit<Expense, "id" | "createdAt">) => void;
  removeExpense: (id: string) => void;
  toggleCheck: (id: string) => void;
  addCheck: (label: string) => void;
  removeCheck: (id: string) => void;
  addMemory: (m: Omit<Memory, "id" | "createdAt">) => void;
  removeMemory: (id: string) => void;
  addPhoto: (p: Omit<PhotoItem, "id" | "createdAt">) => boolean;
  removePhoto: (id: string) => void;
  setCouplePhoto: (src: string) => void;
  unlock: () => void;
  lockAgain: () => void;
  setKeepUnlocked: (v: boolean) => void;
  updateSettings: (partial: Partial<Settings>) => void;
  setOverride: (id: string, partial: Partial<TripItem>) => void;
  markNotified: (key: string) => void;
  resetProgress: () => void;
  resetAll: () => void;
}

const Ctx = createContext<StoreCtx | null>(null);

let toastSeq = 0;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist(state), 180);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state, hydrated]);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const pushToast = useCallback(
    (title: string, body?: string, kind: Toast["kind"] = "default") => {
      const id = `t-${++toastSeq}`;
      setToasts((t) => [...t, { id, title, body, kind }]);
      setTimeout(() => dismissToast(id), kind === "celebrate" ? 5200 : 3400);
    },
    [dismissToast]
  );

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), []);

  const value = useMemo<StoreCtx>(
    () => ({
      state,
      hydrated,
      toasts,
      pushToast,
      dismissToast,
      toggleComplete: (id) =>
        update((s) => ({
          ...s,
          completed: s.completed.includes(id)
            ? s.completed.filter((x) => x !== id)
            : [...s.completed, id],
        })),
      addDelay: (minutes) => update((s) => ({ ...s, delay: s.delay + minutes })),
      resetDelay: () => update((s) => ({ ...s, delay: 0 })),
      setNote: (id, text) => update((s) => ({ ...s, notes: { ...s.notes, [id]: text } })),
      addExpense: (e) =>
        update((s) => ({
          ...s,
          expenses: [{ ...e, id: uid(), createdAt: Date.now() }, ...s.expenses],
        })),
      removeExpense: (id) =>
        update((s) => ({ ...s, expenses: s.expenses.filter((e) => e.id !== id) })),
      toggleCheck: (id) =>
        update((s) => ({
          ...s,
          checklist: s.checklist.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
        })),
      addCheck: (label) =>
        update((s) => ({
          ...s,
          checklist: [...s.checklist, { id: uid(), label, done: false, custom: true }],
        })),
      removeCheck: (id) =>
        update((s) => ({ ...s, checklist: s.checklist.filter((c) => c.id !== id) })),
      addMemory: (m) =>
        update((s) => ({
          ...s,
          memories: [{ ...m, id: uid(), createdAt: Date.now() }, ...s.memories],
        })),
      removeMemory: (id) =>
        update((s) => ({ ...s, memories: s.memories.filter((m) => m.id !== id) })),
      addPhoto: (p) => {
        const next = {
          ...state,
          photos: [...state.photos, { ...p, id: uid(), createdAt: Date.now() }],
        };
        if (!persist(next)) {
          pushToast("Sem espaço no armazenamento", "Remova algumas fotos e tente de novo.");
          return false;
        }
        setState(next);
        return true;
      },
      removePhoto: (id) =>
        update((s) => ({ ...s, photos: s.photos.filter((p) => p.id !== id) })),
      setCouplePhoto: (src) => update((s) => ({ ...s, couplePhoto: src })),
      unlock: () =>
        update((s) => ({ ...s, unlocked: true, unlockedEver: true })),
      lockAgain: () => update((s) => ({ ...s, unlocked: false })),
      setKeepUnlocked: (v) => update((s) => ({ ...s, keepUnlocked: v })),
      updateSettings: (partial) =>
        update((s) => ({ ...s, settings: { ...s.settings, ...partial } })),
      setOverride: (id, partial) =>
        update((s) => ({
          ...s,
          overrides: { ...s.overrides, [id]: { ...s.overrides[id], ...partial } },
        })),
      markNotified: (key) =>
        update((s) => (s.notified.includes(key) ? s : { ...s, notified: [...s.notified, key] })),
      resetProgress: () =>
        update((s) => ({ ...s, completed: [], delay: 0, notified: [] })),
      resetAll: () => {
        setState({ ...defaultState, checklist: DEFAULT_CHECKLIST.map((c) => ({ ...c })) });
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
    }),
    [state, hydrated, toasts, pushToast, dismissToast, update]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp fora do StoreProvider");
  return ctx;
}
