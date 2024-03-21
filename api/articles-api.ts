import { STATUSES, type Article, type ArticleFormData } from '~/scheme/z_article'
import type { CustomFetchOptions } from '~/types/fetch'
export const articlesAPI = {
  async list(pending?: Ref<boolean>) {
    const data = await useCustomFetch<Article[]>({ url: '/admin/news' }, pending)
    return data ? data.map(addStatus) : []
  },

  async getOne(query: { id: string }, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/article',
      query,
    }
    return await useCustomFetch<Article>(options, pending)
  },

  async updateOne(body: ArticleFormData, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/article-update',
      method: 'POST',
      body,
    }
    const data = await useCustomFetch<Article>(options, pending)
    return data ? addStatus(data) : undefined
  },

  async addOne(body: ArticleFormData, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/article-add',
      method: 'POST',
      body,
    }
    await useCustomFetch<Article>(options, pending)
  },

  async deleteOne(body: { id: string }, pending?: Ref<boolean>) {
    const options: CustomFetchOptions = {
      url: '/admin/article-delete',
      method: 'POST',
      body,
    }
    return await useCustomFetch<Article>(options, pending)
  },
}

function addStatus(item: Article) {
  if (!item.isPublished) item.status = STATUSES.Not_Publish
  else if (item.isPublished && new Date() > new Date(item.publishAt)) item.status = STATUSES.Publish
  else item.status = STATUSES.Pending
  return item
}
