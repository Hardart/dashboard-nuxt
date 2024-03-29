import type { Category, CategoryFormData } from '~/scheme/z_category'
import type { ResponseApi } from '~/types/fetch'

export const categoriesAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.CategoryList>('/category-list')
    return data.value ? data.value.categories : []
  },

  async getOne(body: { id: string }) {
    const { data } = await useCustomFetch<ResponseApi.CategorySingle>('/category', { body })
    return data.value ? data.value.category : undefined
  },

  async updateOne(body: CategoryFormData) {
    const { data } = await useCustomFetch<ResponseApi.CategorySingle>('/category-update', { body })
    return data.value ? data.value.category : undefined
  },

  async addOne(body: CategoryFormData) {
    const { data } = await useCustomFetch<ResponseApi.CategorySingle>('/category-add', { body })
    return data.value ? data.value.category : undefined
  },

  async deleteOne(body: { id: string }) {
    const { data } = await useCustomFetch<ResponseApi.CategorySingle>('/category-delete', { body })
    return data.value ? data.value.category : undefined
  },
}
