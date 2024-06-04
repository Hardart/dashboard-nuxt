import { STATUSES, type Article, type ArticleFormData } from '~/scheme/z_article'
import type { ResponseApi } from '~/types/fetch'

export const articlesAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.ArticleList>('/article-list')
    const articles = data.value?.articles.map(addStatus) || []
    const tags = data.value?.tags || []
    return { articles, tags }
  },

  async getOne(body: { id: string }) {
    const { data } = await useCustomFetch<ResponseApi.ArticleSingle>('/article', { body })
    return data.value ? data.value.article : undefined
  },

  async updateOne(body: ArticleFormData) {
    const { data } = await useCustomFetch<ResponseApi.ArticleSingle>('/article-update', { body })
    if (data.value) useCustomToast('Новость успешно обновлена', 'success', 3000)

    return data.value ? addStatus(data.value.article) : undefined
  },

  async addOne(body: ArticleFormData) {
    const { data } = await useCustomFetch<ResponseApi.ArticleSingle>('/article-add', { body })
    if (data.value) useCustomToast('Новость успешно добавлена', 'success', 3000)
    return data.value ? addStatus(data.value.article) : undefined
  },

  async deleteOne(body: { id: string }) {
    const { data } = await useCustomFetch<ResponseApi.ArticleSingle>('/article-delete', { body })
    if (data.value) useCustomToast('Новость успешно удалена', 'success', 3000)
    return data.value?.article
  }
}

function addStatus(item: Article) {
  if (!item.isPublished) item.status = STATUSES.Not_Publish
  else if (item.isPublished && new Date() > new Date(item.publishAt)) item.status = STATUSES.Publish
  else item.status = STATUSES.Pending
  return item
}
