import { create } from 'zustand'
import Lenis from 'lenis'

interface StoreState {
  lenis: Lenis | undefined
  setLenis: (lenis: Lenis | undefined) => void
}

export const useStore = create<StoreState>((set) => ({
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
}))
