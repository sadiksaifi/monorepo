import { create } from 'zustand'

interface SearchStore {
  isSearchVisible: boolean
  setIsSearchVisible: (val: boolean) => void
  isSearchVal: string
  setIsSearchVal: (val: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  isSearchVisible: false,
  setIsSearchVisible: (val) => set({ isSearchVisible: val }),
  isSearchVal: '',
  setIsSearchVal: (val) => set({ isSearchVal: val }),
}))
