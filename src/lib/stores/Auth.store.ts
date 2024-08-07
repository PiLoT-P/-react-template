import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  isAuthorized: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        isAuthorized: false,
        login: () => set({ isAuthorized: true }),
        logout: () => set({ isAuthorized: false }),
      }),
      { name: 'authStore' },
    ),
  ),
)
