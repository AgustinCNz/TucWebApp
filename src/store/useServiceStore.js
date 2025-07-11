// src/store/useClientStore.js
import { create } from 'zustand'
import * as api from '@/api/Servicio'      // tus llamadas fetch

export const useClientStore = create((set) => ({
  list: [],
  loading: false,

  fetchAll: async (ownerUid) => {
    set({ loading: true })
    const data = await api.getAll(ownerUid)
    set({ list: data, loading: false })
  },

  add: async (payload) => {
    const nuevo = await api.create(payload)
    set((s) => ({ list: [...s.list, nuevo] }))
  },

  update: async (id, payload) => {
    await api.update(id, payload)
    set((s) => ({
      list: s.list.map((c) => (c.id === id ? { ...c, ...payload } : c)),
    }))
  },

  remove: async (id) => {
    await api.remove(id)
    set((s) => ({ list: s.list.filter((c) => c.id !== id) }))
  },
}))
