import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
// Este store de Zustand maneja el estado de autenticación del usuario.
// Permite establecer el usuario actual y limpiar el estado de usuario.