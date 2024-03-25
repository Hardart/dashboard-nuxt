import type { Category, CategoryFormData } from '~/scheme/z_category'

export const categoriesAPI = {
  async list() {
    const nuxt = useNuxtApp()
    return await useAsyncData<Category[]>('categories', () => $fetch('/api/categories'), { getCachedData: key => nuxt.payload.data[key] })
  },

  async getOne(query: { id: string }) {
    return await useCustomFetch<Category>('/admin/category', { query })
  },

  async updateOne(body: CategoryFormData) {
    return await useCustomFetch<Category>('/admin/category-update', { body, method: 'POST' })
  },

  async addOne(body: CategoryFormData) {
    return await useCustomFetch<Category>('/admin/category-add', { body, method: 'POST' })
  },

  async deleteOne(body: { id: string }) {
    return await useCustomFetch<Category>('/admin/category-delete', { body, method: 'POST' })
  },
}
