import { createSharedComposable } from '@vueuse/core'

const _useFilesystem = () => {
  const files = ref<string[]>([])
  const basePath = '/images'
  const prevPath = ref(basePath)
  const isBasePath = ref(true)
  const isImage = (path: string) => path.match(/\.(jpe?g|png|webp|avif)$/)
  const src = ref<string>('/images')
  const imageUrl = ref('')

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

  const onImage = (path: string) => (imageUrl.value = `http://localhost:3068${path.replace('_preview', '')}`)

  watch(query, async curr => {
    await getFiles()
    prevPath.value = curr.src.match(/(\/+.+)\//)?.[1] || basePath
    isBasePath.value = query.value.src === basePath
  })

  return { files, prevPath, isBasePath, imageUrl, isImage, getFiles, setSource, onImage }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
