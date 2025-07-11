import { create } from 'zustand'
import * as api from '@/api/imports'

export const useImportStore = create(set => ({
  list: [],
  loading: false,

  fetchAll: async uid => {
    set({ loading: true })
    const rows = await api.getAll(uid)
    set({ list: rows, loading: false })
  },

  add: async payload => {
    const { id } = await api.create(payload)
    set(s => ({ list: [{ id, ...payload }, ...s.list] }))
  },

  update: async (id, data) => {
    await api.update(id, data)
    set(s => ({
      list: s.list.map(i => (i.id === id ? { ...i, ...data } : i))
    }))
  },

  remove: async id => {
    await api.remove(id)
    set(s => ({ list: s.list.filter(i => i.id !== id) }))
  }
}))
// This store manages the import data, allowing fetching, adding, updating, and removing imports.
// It uses Zustand for state management and communicates with the backend API to perform CRUD operations on imports.