import { create } from 'zustand'
import * as api from '@/api/services'

export const useServiceStore = create((set) => ({
  list: [],
  loading: false,

  fetchAll: async (uid) => {
    set({ loading: true })
    const rows = await api.getAll(uid)
    set({ list: rows, loading: false })
  },

  add: async (payload) => {
    const { id } = await api.create(payload)
    set((s) => ({ list: [...s.list, { id, ...payload }] }))
  },

  update: async (id, payload) => {
    await api.update(id, payload)
    set((s) => ({
      list: s.list.map((x) => (x.id === id ? { ...x, ...payload } : x))
    }))
  },

  remove: async (id) => {
    await api.remove(id)
    set((s) => ({ list: s.list.filter((x) => x.id !== id) }))
  }
}))
