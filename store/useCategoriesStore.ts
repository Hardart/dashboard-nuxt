import { categoriesAPI } from '~/api/categories-api'
import type { Category, CategoryFormData } from '~/scheme/z_category'

export const useCategoriesStore = defineStore('category', () => {
  const categoryState = reactive<CategoryFormData>({
    slug: '',
    title: '',
    isPublished: false,
  })
  const categories = ref<Category[]>([])
  const category = ref<Category>()

  const categoryFormData = ref<CategoryFormData>({ ...categoryState })

  const categoriesCount = computed(() => categories.value.length)
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

  async function fetchCategories() {
    const { data } = await categoriesAPI.list()
    categories.value = data.value || []
  }

  async function addCategory(input: { data: CategoryFormData }) {
    const { data } = await categoriesAPI.addOne(input.data)
    if (!data.value) return
    categories.value.unshift(data.value)
  }

  async function updateCategory(input: { data: CategoryFormData }) {
    const response = await categoriesAPI.updateOne(input.data)
    if (!response) return
  }

  async function deleteCategory(id: string) {
    const response = await categoriesAPI.deleteOne({ id })
    if (!response) return
    categories.value = categories.value.filter(item => item.id !== id)
  }

  function storeRefs() {
    return { categories, category, sort, selectedStatuses, selectedCategories, q, query, categoriesCount, categoryFormData, loading }
  }

  return { storeRefs, fetchCategories, addCategory, updateCategory, findOne, deleteCategory }
})
