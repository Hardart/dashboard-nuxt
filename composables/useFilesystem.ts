import { createSharedComposable } from '@vueuse/core'
import type { ResponseApi } from '~/types/fetch'

const _useFilesystem = () => {
  const files = ref<string[]>()
  const basePath = '/images'
  const src = ref(basePath)
  const prevPath = ref(basePath)
  const isBasePath = ref(true)
  const selected = ref(NaN)

  const isImage = (path: string) => path.toLowerCase().match(/\.(jpe?g|png|webp|avif)$/)

  const imageUrl = ref({
    preview: '',
    original: ''
  })

  const folder = ref({
    // maybe just ref(string)
    path: '',
    index: NaN
  })

  const setSource = (path: string) => {
    folder.value.path = ''
    folder.value.index = NaN
    src.value = path
  }

  const getFiles = async (path?: MaybeRef<string>) => {
    const bodySrc = toValue(path) ? `${src.value}/${toValue(path)}` : src.value
    const { data } = await useCustomFetch<ResponseApi.FileList>('/files', { body: { src: bodySrc } })
    files.value = data.value?.files
  }

  const goBack = () => {
    src.value = prevPath.value
    selected.value = NaN
    imageUrl.value.original = ''
    folder.value.path = ''
  }

  const onImage = (path: string, index: number) => {
    selected.value = index
    imageUrl.value.preview = path
    imageUrl.value.original = path.replace('_preview', '_orig')
  }

  const onFolder = (path: string) => {
    if (isBasePath.value) return
    folder.value.path = path
  }

  watch(src, async (curr) => {
    await getFiles()
    prevPath.value = curr.match(/(\/+.+)\//)?.[1] || basePath
    isBasePath.value = src.value === basePath
  })

  return {
    files,
    isBasePath,
    imageUrl,
    selected,
    folder,
    goBack,
    isImage,
    getFiles,
    setSource,
    onImage,
    onFolder
  }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
