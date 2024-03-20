import { createSharedComposable } from '@vueuse/core'

const _useFilesystem = () => {
  const files = ref<string[]>([])
  const basePath = '/images'
  const prevPath = ref(basePath)
  const isBasePath = ref(true)
  const isImage = (path: string) => path.match(/\.(jpe?g|png|webp|avif)$/)
  const src = ref<string>('/images')
  const imageUrl = ref({
    preview: '',
    original: '',
  })
  const selected = ref(NaN)

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

  const goBack = () => {
    src.value = prevPath.value
    selected.value = NaN
    imageUrl.value.original = ''
  }
  const onImage = (path: string, index: number) => {
    selected.value = index
    imageUrl.value.preview = path
    imageUrl.value.original = `http://localhost:3068${path.replace('_preview', '_orig')}`
  }
  const correctSrc = (src: string) => `http://localhost:3068${src}`

  watch(query, async curr => {
    await getFiles()
    prevPath.value = curr.src.match(/(\/+.+)\//)?.[1] || basePath
    isBasePath.value = query.value.src === basePath
  })

  return { files, goBack, isBasePath, imageUrl, selected, isImage, getFiles, setSource, onImage, correctSrc }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
