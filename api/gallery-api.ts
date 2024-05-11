import type { ResponseApi } from '~/types/fetch'

export const galleryAPI = {
  async list() {
    const { data } = await useCustomFetch<ResponseApi.SlideList>('/gallery')
    return data.value?.slides || []
  }
}
