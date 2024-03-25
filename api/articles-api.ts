import { STATUSES, type Article, type ArticleFormData } from '~/scheme/z_article'

export const articlesAPI = {
  async list() {
    const { data } = await useAsyncData('news', async () => {
      const [articles, tags] = await Promise.all<[Promise<Article[]>, Promise<string[]>]>([$fetch('/admin/news'), $fetch('/api/tags')])
      return { articles, tags }
    })
    const news = data.value ? data.value.articles.map(addStatus) : []
    const tags = data.value?.tags || []
    return { news, tags }
  },

  async getOne(query: { id: string }) {
    return await useCustomFetch<Article>('/admin/article', { query, method: 'GET' })
  },

  async updateOne(body: ArticleFormData) {
    const { data } = await useCustomFetch<Article>('/admin/article-update', { body })
    const article = data.value ? addStatus(data.value) : undefined
    return { article }
  },

  async addOne(body: ArticleFormData) {
    await useCustomFetch<Article>('/admin/article-add', { body })
  },

  async deleteOne(body: { id: string }) {
    return await useCustomFetch<Article>('/admin/article-delete', { body })
  },
}

function addStatus(item: Article) {
  if (!item.isPublished) item.status = STATUSES.Not_Publish
  else if (item.isPublished && new Date() > new Date(item.publishAt)) item.status = STATUSES.Publish
  else item.status = STATUSES.Pending
  return item
}
