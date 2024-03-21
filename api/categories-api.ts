import type { Category, CategoryFormData } from '~/scheme/z_category'
import type { CustomFetchOptions } from '~/types/fetch'
export const categoriesAPI = {
  async list(pending?: Ref<boolean>) {
    return await useCustomFetch<Category[]>({ url: '/api/categories' }, pending)
  },

  async getOne(query: { id: string }, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/article',
      query,
    }
    return await useCustomFetch<Category>(options, pending)
  },

  async updateOne(body: CategoryFormData, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/category-update',
      method: 'POST',
      body,
    }
    return await useCustomFetch<Category>(options, pending)
  },

  async addOne(body: CategoryFormData, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/category-add',
      method: 'POST',
      body,
    }
    return await useCustomFetch<Category>(options, pending)
  },

  async deleteOne(body: { id: string }, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/category-delete',
      method: 'POST',
      body,
    }
    return await useCustomFetch<Category>(options, pending)
  },
}
