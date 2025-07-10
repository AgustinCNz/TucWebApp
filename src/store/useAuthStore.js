// src/store/useAuthStore.js
// -----------------------------------------------------------------------------
// Store global de autenticación utilizando Zustand.
// Provee: user (obj o null), setUser(user) y clearUser().
// -----------------------------------------------------------------------------

import { create } from 'zustand'

// Creamos el store: set -> actualiza estado, get -> lee (no usado aquí)
export const useAuthStore = create(set => ({
  user: null,                       // Estado inicial: sin usuario
  setUser: user => set({ user }),   // Guarda objeto usuario (de Firebase/MySQL)
  clearUser: () => set({ user: null }) // Limpia sesión
}))

// ──────────────────────────────────────────────────────────────────────────────
// Sugerencias
// 1. Agregá persistencia con `zustand/middleware` + sessionStorage si querés
//    mantener la sesión al refrescar (sin exponer credenciales sensibles).
// 2. Creá selectores con createSelector para evitar renders innecesarios.
// -----------------------------------------------------------------------------
