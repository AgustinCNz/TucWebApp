// src/store/useImportItemStore.js
import { create } from 'zustand'
import * as api from '../api/import_items.js'

export const useImportItemStore = create((set, get) => ({
  items: [],            // Lista de ítems cargados
  loading: false,       // Indicador de carga

  /**
   * Agrega un ítem + sus imágenes
   * @param {Object} data  { import_id, concepto, cantidad, precio_usd, tracking?, link_url? }
   * @param {File[]} files
   */
  addItem: async (data, files = []) => {
    set({ loading: true })
    try {
      // 1️⃣ Crear el ítem
      const { id } = await api.createImportItem(data)

      // 2️⃣ Si hay imágenes, súbelas
      let urls = []
      if (files.length) {
        const resp = await api.uploadImportItemImages(id, files)
        urls = resp.urls
      }

      // 3️⃣ Obtener el ítem completo (con imágenes)
      const item = await api.getImportItem(id)

      // 4️⃣ Actualizar el estado local
      set(state => ({ items: [...state.items, item] }))
      return item
    } finally {
      set({ loading: false })
    }
  },

  /**
   * Reemplaza la lista de ítems (si quieres cargar alguno ya existente).
   * @param {Array} items 
   */
  setItems: (items) => set({ items })
}))
