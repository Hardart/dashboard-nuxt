import { createSharedComposable } from '@vueuse/core'

const _useFilesystem = () => {
  const files = ref<string[]>([])
  const basePath = '/images'
  const isBasePath = ref(true)
  const isImage = (path: string) => path.match(/\.(jpg|png|webp)$/)
  const src = ref<string | null>(null)
  const query = computed(() => ({
    src: src.value,
  }))
  const setSource = (path: string) => (src.value = path)
  const getFiles = async () => {
    try {
      files.value = await $fetch<string[]>('/api/files', { query: query.value })
    } catch (error) {
      console.log(error)
    }
  }
  watch(query, async () => {
    await getFiles()
    isBasePath.value = query.value.src === basePath
  })
  return { files, basePath, isBasePath, isImage, getFiles, setSource }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
