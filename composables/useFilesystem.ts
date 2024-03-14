import { createSharedComposable } from '@vueuse/core'

const _useFilesystem = () => {
  const files = ref<string[]>([])
  const basePath = '/images'
  const prevPath = ref(basePath)
  const isBasePath = ref(true)
  const isImage = (path: string) => path.match(/\.(jpe?g|png|webp|avif)$/)
  const src = ref<string>('/images')

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

  watch(query, async curr => {
    await getFiles()
    prevPath.value = curr.src.match(/(\/+.+)\//)?.[1] || basePath
    isBasePath.value = query.value.src === basePath
  })
  return { files, prevPath, isBasePath, isImage, getFiles, setSource }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
