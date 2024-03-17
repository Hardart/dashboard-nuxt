import type { Category, CategoryFormData } from '~/scheme/z_category'

export const useCategoriesStore = defineStore('category', () => {
  const categoryState = reactive<CategoryFormData>({
    slug: '',
    title: '',
    isPublished: false,
  })
  const categories = ref<Category[]>([])
  const category = ref<Category>()
  const categoriesCount = computed(() => categories.value.length)
  const categoryFormData = ref<CategoryFormData>({ ...categoryState })
  const loading = ref(false)
  const q = ref(undefined)
  const selectedStatuses = ref([])
  const selectedCategories = ref([])
  const sort = ref({ column: 'createdAt', direction: 'desc' as const })

  const query = computed(() => ({
    q: q.value,
    isPublished: selectedStatuses.value,
    id: selectedCategories.value,
    sort: `${sort.value.column}_${sort.value.direction}`,
  }))

  function transformCategoryToFormData({ id, title, slug, isPublished }: Category) {
    categoryFormData.value = { title, slug, isPublished, id }
  }

  function findOne(id: string) {
    const a = categories.value.find(item => item.id === id)
    if (a) transformCategoryToFormData(a)
  }

  function fetchCategories() {
    useLazyAsyncData('categories', async () => {
      loading.value = true
      const response = await $fetch<Category[]>('/api/categories')
      categories.value = response
      loading.value = false
    })
  }

  async function addCategory(input: { data: CategoryFormData }) {
    try {
      const data = await $fetch<Category>('/admin/category-add', { method: 'POST', body: input.data })
      categories.value.unshift(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateCategory(input: { data: CategoryFormData }) {
    try {
      const data = await $fetch('/admin/category-update', { method: 'POST', body: input.data })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteCategory(id: string) {
    try {
      const data = await $fetch('/admin/category-delete', { method: 'POST', body: { id } })
      console.log(data)
      categories.value = categories.value.filter(item => item.id !== id)
    } catch (error) {
      console.log(error)
    }
  }

  function storeRefs() {
    return { categories, category, sort, selectedStatuses, selectedCategories, q, query, categoriesCount, categoryFormData, loading }
  }

  return { storeRefs, fetchCategories, addCategory, updateCategory, findOne, deleteCategory }
})
