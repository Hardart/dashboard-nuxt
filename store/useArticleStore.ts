import type { Article, Category } from '~/types'
interface NewsPageResponse {
  news: Article[]
  tags: string[]
  categories: Category[]
}
type CategoryFormData = Omit<Category, 'isPublished' | 'createdAt'>
type ArticleFormData = Omit<Article, 'publishAt' | 'isPublished' | 'createdAt' | 'id' | 'category'> & {
  preview?: string
  publishAt: Date
  category: CategoryFormData
}
export const useArticleStore = defineStore('article', () => {
  const categoryState = reactive<CategoryFormData>({
    id: '',
    slug: '',
    title: '',
  })
  const articleState = reactive<ArticleFormData>({
    title: '',
    slug: '',
    category: { ...categoryState },
    tags: [],
    preview: undefined,
    publishAt: new Date(),
    content: '',
  })
  const tags = ref<string[]>([])
  const categories = ref<Category[]>([])
  const articles = ref<Article[]>([])
  const article = ref<Article>()
  const articlesCount = ref<number>(NaN)

  const q = ref(undefined)
  const articleFormData = ref({ ...articleState })
  const selectedStatuses = ref([])
  const selectedCategories = ref([])
  const sort = ref({ column: 'createdAt', direction: 'desc' as const })

  const query = computed(() => ({
    q: q.value,
    isPublished: selectedStatuses.value,
    categoryId: selectedCategories.value,
    sort: `${sort.value.column}_${sort.value.direction}`,
  }))

  function transformArticleToFormData(item: Article): ArticleFormData {
    return { ...item, publishAt: new Date() }
  }

  function findOne(id: string) {
    const a = articles.value.find(item => item.id === id)
    if (a) article.value = a
  }

  function resetArticle() {
    articleFormData.value = { ...articleState }
  }

  function storeRefs() {
    return { articles, articleFormData, article, sort, selectedStatuses, selectedCategories, q, categories, tags, query, articlesCount }
  }

  async function fetchArticles() {
    try {
      const data = await $fetch<NewsPageResponse>('/admin/news', {
        query: toValue(query),
        onResponse({ response }) {
          articlesCount.value = Number(response.headers.get('x-total'))
        },
      })
      articles.value = data.news
      categories.value = data.categories
      tags.value = data.tags
    } catch (error) {
      console.log(error)
    }
  }

  return {
    fetchArticles,
    resetArticle,
    storeRefs,
    findOne,
    transformArticleToFormData,
    ...storeRefs(),
  }
})
