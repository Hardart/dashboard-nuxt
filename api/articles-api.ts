import { STATUSES, type Article, type ArticleFormData } from '~/scheme/z_article'

export const articlesAPI = {
  async list() {
    const { data } = await useCustomFetch<Article[]>('/admin/news', {})
    const news = data.value ? data.value.map(addStatus) : []
    return { news }
  },

  async getOne(query: { id: string }) {
    return await useCustomFetch<Article>('/admin/article', { query })
  },

  async updateOne(body: ArticleFormData) {
    const { data } = await useCustomFetch<Article>('/admin/article-update', { body, method: 'POST' })
    const article = data.value ? addStatus(data.value) : undefined
    return { article }
  },

  async addOne(body: ArticleFormData) {
    await useCustomFetch<Article>('/admin/article-add', { body, method: 'POST' })
  },

  async deleteOne(body: { id: string }) {
    return await useCustomFetch<Article>('/admin/article-delete', { body, method: 'POST' })
  },
}

function addStatus(item: Article) {
  if (!item.isPublished) item.status = STATUSES.Not_Publish
  else if (item.isPublished && new Date() > new Date(item.publishAt)) item.status = STATUSES.Publish
  else item.status = STATUSES.Pending
  return item
}
