'use client';

import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/lib/constants';

// 1. set initial atom for SUMO layout
const SUMOLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('SUMO-layout')
    : LAYOUT_OPTIONS.MODERN
);

const SUMOLayoutAtomWithPersistence = atom(
  (get) => get(SUMOLayoutAtom),
  (get, set, newStorage: any) => {
    set(SUMOLayoutAtom, newStorage);
    localStorage.setItem('SUMO-layout', newStorage);
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(SUMOLayoutAtomWithPersistence);
  return {
    layout: layout === null ? LAYOUT_OPTIONS.MODERN : layout,
    setLayout,
  };
}
