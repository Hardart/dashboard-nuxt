import { articlesAPI } from '~/api/articles-api'
import { STATUSES, type Article, type ArticleFormData } from '~/scheme/z_article'
import type { Category } from '~/scheme/z_category'

const sortValues = ['title', 'createdAt'] as const

interface SortBy {
  column: (typeof sortValues)[number]
  direction: 'asc' | 'desc'
}

export const useArticleStore = defineStore('article', () => {
  const articleState = reactive<ArticleFormData>({
    title: '',
    slug: '',
    tags: [],
    image: '',
    publishAt: new Date(),
    content: '',
    isPublished: false,
    categoryId: '',
  })

  const tags = ref<string[]>([])
  const articles = ref<Article[]>([])
  const article = ref<Article>()
  const articlesCount = computed(() => articles.value.length)
  const loading = ref(false)

  const query = ref('')
  const articleFormData = ref({ ...articleState })
  const selectedStatuses = ref<string[]>([])
  const selectedCategories = ref<string[]>([])
  const sort = ref<SortBy>({ column: 'createdAt', direction: 'desc' as const })
  const categoriesFilter = computed(() => articles.value.reduce(filterCategoriesBunlde, []))
  const statusesFilter = computed(() => articles.value.reduce(filterStatusesBunlde, []))

  const filterByTitle = computed(() =>
    articles.value.filter(article =>
      query.value.trim() ? article.title.toLowerCase().includes(query.value.toLowerCase().trim()) : article
    )
  )
  const filterByStatus = computed(() =>
    selectedStatuses.value.length
      ? filterByTitle.value.filter(article => selectedStatuses.value.includes(article.status.toLowerCase()))
      : filterByTitle.value
  )
  const filteredArticles = computed(() =>
    selectedCategories.value.length
      ? filterByStatus.value.filter(article => selectedCategories.value.includes(article.category.id))
      : filterByStatus.value
  )

  const sortedArticles = computed(() =>
    filteredArticles.value.sort((a, b) => {
      console.log('filter')
      const aValue = a[sort.value.column]
      const bValue = b[sort.value.column]

      if (aValue < bValue) return sort.value.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sort.value.direction === 'asc' ? 1 : -1
      return 0
    })
  )

  function transformArticleToFormData({ title, image, slug, content, isPublished, tags, category, publishAt, id }: Article) {
    articleFormData.value = { title, image, slug, content, isPublished, tags, publishAt: new Date(publishAt), categoryId: category.id, id }
  }

  function findOne(id: string) {
    const a = articles.value.find(item => item.id === id)
    if (a) transformArticleToFormData(a)
  }

  function resetArticle() {
    articleFormData.value = { ...articleState }
  }

  async function fetchArticles() {
    loading.value = true
    const articleList = await articlesAPI.list()
    articles.value = articleList
    loading.value = false
  }

  async function fetchArticle(id: string) {
    loading.value = true
    const articleData = await articlesAPI.getOne({ id })
    if (!articleData) return
    transformArticleToFormData(articleData)
    loading.value = false
  }

  async function updateArticle(input: ArticleFormData) {
    loading.value = true
    const articleData = await articlesAPI.updateOne(input)
    if (!articleData) return
    articles.value = articles.value.filter(item => item.id !== input.id)
    articles.value.push(articleData)
    loading.value = false
  }

  async function addArticle(input: ArticleFormData) {
    loading.value = true
    const articleData = await articlesAPI.addOne(input)
    if (!articleData) return
    articles.value.push(articleData)
    loading.value = false
  }

  async function deleteArticle(id: string) {
    loading.value = true
    const data = await articlesAPI.deleteOne({ id })
    if (!data) return
    articles.value = articles.value.filter(item => item.id !== id)
    loading.value = false
  }

  function storeRefs() {
    return {
      sortedArticles,
      articleFormData,
      article,
      sort,
      selectedStatuses,
      selectedCategories,
      tags,
      query,
      articlesCount,
      categoriesFilter,
      statusesFilter,
      loading,
    }
  }

  return {
    fetchArticle,
    fetchArticles,
    addArticle,
    resetArticle,
    storeRefs,
    findOne,
    updateArticle,
    deleteArticle,
  }
})

function filterCategoriesBunlde(acc: Category[], article: Article) {
  if (!acc.some(accItem => accItem.id === article.category.id)) acc.push(article.category)
  return acc
}

function filterStatusesBunlde(acc: STATUSES[], article: Article) {
  if (!acc.includes(article.status)) acc.push(article.status)
  return acc
}
