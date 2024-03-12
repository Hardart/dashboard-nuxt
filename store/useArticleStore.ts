import type { Article, Category } from '~/types'
interface NewsPageResponse {
  news: Article[]
  tags: string[]
  categories: Category[]
}
type ArticleFormData = Omit<Article, 'category' | 'publishAt' | 'isPublished' | 'createdAt' | 'id'> & {
  categoryId: string
  preview?: string
  publishAt: Date
}
export const useArticleStore = defineStore('article', () => {
  const articleState = reactive<ArticleFormData>({
    title: '',
    slug: '',
    categoryId: '',
    tags: [],
    preview: undefined,
    publishAt: new Date(),
    content: '',
  })
  const tags = ref<string[]>([])
  const categories = ref<Category[]>([])
  const articles = ref<Article[]>([])
  const article = ref<Article>()

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
    return { ...item, categoryId: item.category.id, publishAt: new Date() }
  }

  function findOne(id: string) {
    const a = articles.value.find(item => item.id === id)
    if (a) article.value = a
  }

  function resetArticle() {
    articleFormData.value = { ...articleState }
  }

  function storeRefs() {
    return { articles, articleFormData, article, sort, selectedStatuses, selectedCategories, q, categories, tags }
  }

  async function fetchArticles() {
    const { data } = await useFetch<NewsPageResponse>('/admin/news', { query })
    articles.value = data.value?.news || []
    categories.value = data.value?.categories || []
    tags.value = data.value?.tags || []
  }

  return {
    fetchArticles,
    resetArticle,
    storeRefs,
    findOne,
    transformArticleToFormData,
    articles,
    article,
    sort,
    selectedStatuses,
    selectedCategories,
    q,
    categories,
    tags,
    articleFormData,
  }
})
