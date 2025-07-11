import { create } from 'zustand'
import * as api from '@/api/finances'

export const useFinanceStore = create((set) => ({
  list: [],
  loading: false,
  filters: { month: '', year: '', categoria: '' },

  fetchAll: async (uid, f = {}) => {
    set({ loading: true })
    const rows = await api.getAll({ uid_owner: uid, ...f })
    set({ list: rows, filters: f, loading: false })
  },

  add: async (payload) => {
    const { id } = await api.create(payload)
    set((s) => ({ list: [{ id, ...payload }, ...s.list] }))
  },

  update: async (id, data) => {
    await api.update(id, data)
    set((s) => ({
      list: s.list.map((m) => (m.id === id ? { ...m, ...data } : m))
    }))
  },

  remove: async (id) => {
    await api.remove(id)
    set((s) => ({ list: s.list.filter((m) => m.id !== id) }))
  }
}))
