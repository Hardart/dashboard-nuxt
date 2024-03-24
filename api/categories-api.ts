import type { Category, CategoryFormData } from '~/scheme/z_category'
import type { CustomFetchOptions } from '~/types/fetch'
export const categoriesAPI = {
  async list() {
    return await useCustomFetch<Category[]>('/api/categories')
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
