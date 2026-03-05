import type { Tab } from "@/types/tabTypes";

export const initialTabs: Tab[] = [
  { id: "1", title: "Dashboard", path: "/", isPinned: true },
  { id: "2", title: "Banking", path: "/banking", isPinned: false },
  { id: "3", title: "Accounting", path: "/accounting", isPinned: false },
  { id: "4", title: "Telefonie", path: "/telefonie", isPinned: false },
  { id: "5", title: "Statistik", path: "/stats", isPinned: false },
  { id: "6", title: "Inventory", path: "/inventory", isPinned: false },
  { id: "7", title: "Help", path: "/help", isPinned: false },
];
