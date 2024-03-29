import { createSharedComposable } from '@vueuse/core'
import type { ResponseApi } from '~/types/fetch'

const _useFilesystem = () => {
  const files = ref<string[]>()
  const basePath = '/images'
  const src = ref<string>(basePath)
  const prevPath = ref(basePath)
  const isBasePath = ref(true)

  const isImage = (path: string) => path.match(/\.(jpe?g|png|webp|avif)$/)

  const imageUrl = ref({
    preview: '',
    original: '',
  })
  const selected = ref(NaN)

  const folder = ref({
    // maybe just ref(string)
    path: '',
    index: NaN,
  })

  const setSource = (path: string) => {
    folder.value.path = ''
    folder.value.index = NaN
    src.value = path
  }

  const getFiles = async () => {
    const { data } = await useCustomFetch<ResponseApi.FileList>('/files', { body: { src: src.value } })
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
    imageUrl.value.original = correctSrc(path.replace('_preview', '_orig'))
  }

  // const isMainFolder = (path: string) => Number.isNaN(+path.replace(/.+\//, ''))

  const onFolder = (path: string) => {
    if (isBasePath.value) return
    folder.value.path = path
  }

  const correctSrc = (src: string) => `http://localhost:3068${src}`

  watch(src, async curr => {
    await getFiles()
    prevPath.value = curr.match(/(\/+.+)\//)?.[1] || basePath
    isBasePath.value = src.value === basePath
  })

  return { files, goBack, isBasePath, imageUrl, selected, folder, isImage, getFiles, setSource, onImage, onFolder, correctSrc }
}

export const useFilesystem = createSharedComposable(_useFilesystem)
